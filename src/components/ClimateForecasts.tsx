import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface ClimateForecastsProps {
  latitude: number;
  longitude: number;
}

export function ClimateForecasts({ latitude, longitude }: ClimateForecastsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');

  const { data: forecast, isLoading, error } = useQuery({
    queryKey: ["/api/forecast", latitude, longitude, selectedPeriod],
    enabled: !!(latitude && longitude),
    queryFn: async () => {
      const response = await fetch(`/api/forecast?lat=${latitude}&lon=${longitude}&period=${selectedPeriod}`);
      if (!response.ok) {
        throw new Error('Failed to fetch forecast data');
      }
      return response.json();
    },
  });

  const periods = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: '5-Year' },
  ];

  const formatChartData = (data: any[]) => {
    if (!data) return [];
    
    return data.map((item, index) => ({
      name: selectedPeriod === 'daily' 
        ? new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' })
        : selectedPeriod === 'weekly'
        ? `Week ${index + 1}`
        : selectedPeriod === 'monthly'
        ? new Date(item.date).toLocaleDateString('en-US', { month: 'short' })
        : new Date(item.date).getFullYear().toString(),
      temperature: Math.round(item.temperature * 9/5 + 32), // Convert to Fahrenheit
      original: item
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Climate Forecasts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Period Selection Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {periods.map((period) => (
            <Button
              key={period.value}
              variant={selectedPeriod === period.value ? "default" : "ghost"}
              size="sm"
              className={`flex-1 text-sm font-medium ${
                selectedPeriod === period.value 
                  ? "bg-primary text-white" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setSelectedPeriod(period.value as any)}
              data-testid={`button-period-${period.value}`}
            >
              {period.label}
            </Button>
          ))}
        </div>

        {/* Chart Area */}
        <div className="h-64 border border-gray-200 rounded-lg p-4">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ) : error ? (
            <div className="h-full flex items-center justify-center text-gray-500">
              Failed to load forecast data
            </div>
          ) : forecast?.data ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formatChartData(forecast.data)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: '#e5e7eb' }}
                  label={{ value: 'Temperature (°F)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  formatter={(value: any, name: string) => [`${value}°F`, 'Temperature']}
                  labelFormatter={(label) => `${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#2563EB" 
                  strokeWidth={2}
                  dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#2563EB', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              No forecast data available
            </div>
          )}
        </div>

        {/* Prediction Summary */}
        {forecast && (
          <div className="bg-gray-50 rounded-lg p-4" data-testid="forecast-summary">
            <h4 className="font-medium text-gray-900 mb-2">
              {selectedPeriod === 'daily' ? 'Next 7 Days' :
               selectedPeriod === 'weekly' ? 'Next 4 Weeks' :
               selectedPeriod === 'monthly' ? 'Next 3 Months' :
               'Next 5 Years'}
            </h4>
            <p className="text-sm text-gray-600">
              {forecast.data && forecast.data.length > 0 ? (
                `Temperature range: ${Math.min(...forecast.data.map((d: any) => Math.round(d.temperature * 9/5 + 32)))}°F to ${Math.max(...forecast.data.map((d: any) => Math.round(d.temperature * 9/5 + 32)))}°F. 
                 ${selectedPeriod === 'daily' ? 'Plan outdoor activities during cooler periods.' :
                   selectedPeriod === 'weekly' ? 'Consider seasonal clothing adjustments.' :
                   selectedPeriod === 'monthly' ? 'Monitor long-term climate patterns.' :
                   'Long-term climate trends for planning.'}`
              ) : (
                "Forecast data is being processed."
              )}
            </p>
            {forecast.confidence && (
              <div className="mt-2 text-xs text-gray-500">
                Prediction confidence: {forecast.confidence}% • ML Model: Linear Regression
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
