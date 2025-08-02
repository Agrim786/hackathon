import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Info, 
  Thermometer,
  CloudRain,
  Calendar,
  Target,
  Clock,
  Lightbulb
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface ClimateInsight {
  id: string;
  title: string;
  content: string;
  severity: 'info' | 'warning' | 'critical';
  category: 'temperature' | 'precipitation' | 'seasonal' | 'anomaly' | 'longterm';
  confidence: number;
  timeframe: string;
}

interface ClimateInsightsProps {
  location: {
    latitude: number;
    longitude: number;
  } | null;
  weather: any;
  userProfile: any;
}

export function ClimateInsights({ location, weather, userProfile }: ClimateInsightsProps) {
  const [showAllInsights, setShowAllInsights] = useState(false);

  // Fetch weather data first if not provided
  const { data: weatherData } = useQuery({
    queryKey: ['/api/weather', location?.latitude, location?.longitude],
    enabled: !!(location && !weather),
    queryFn: async () => {
      const response = await fetch(`/api/weather?lat=${location?.latitude}&lon=${location?.longitude}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      return data.weather;
    },
  });

  const currentWeather = weather || weatherData;

  const { data: insightsData, isLoading, error } = useQuery({
    queryKey: ['/api/climate/insights', location?.latitude, location?.longitude, currentWeather, userProfile],
    enabled: !!(location && currentWeather),
    queryFn: async () => {
      const response = await fetch('/api/climate/insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: location?.latitude,
          lon: location?.longitude,
          weather: currentWeather,
          profile: userProfile
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch climate insights');
      }
      
      return response.json();
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  });

  const getSeverityIcon = (severity: ClimateInsight['severity']) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getCategoryIcon = (category: ClimateInsight['category']) => {
    switch (category) {
      case 'temperature':
        return <Thermometer className="h-4 w-4" />;
      case 'precipitation':
        return <CloudRain className="h-4 w-4" />;
      case 'seasonal':
        return <Calendar className="h-4 w-4" />;
      case 'longterm':
        return <Target className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: ClimateInsight['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  if (!location || !weather) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            <span>Climate Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Set your location and weather data to view comprehensive climate insights.</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            <span>Climate Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-full"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !insightsData?.insights) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            <span>Climate Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Unable to load climate insights at this time. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  const insights = insightsData.insights as ClimateInsight[];
  const displayedInsights = showAllInsights ? insights : insights.slice(0, 4);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            <span>Climate Insights</span>
          </div>
          <Badge variant="outline" className="text-xs">
            AI-Powered Analysis
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayedInsights.length === 0 ? (
          <p className="text-gray-500">No significant climate insights detected for current conditions.</p>
        ) : (
          <>
            <div className="space-y-4">
              {displayedInsights.map((insight, index) => (
                <div key={insight.id}>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getSeverityIcon(insight.severity)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-semibold text-gray-900 flex items-center space-x-2">
                            {getCategoryIcon(insight.category)}
                            <span>{insight.title}</span>
                          </h4>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getSeverityColor(insight.severity)}`}
                            >
                              {insight.severity}
                            </Badge>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Clock className="h-3 w-3" />
                              <span>{insight.timeframe}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {insight.content}
                        </p>
                        <div className="mt-2">
                          <div className="flex items-center space-x-2">
                            <div className="text-xs text-gray-400">
                              Confidence: {insight.confidence}%
                            </div>
                            <div className="flex-1 bg-gray-200 rounded-full h-1">
                              <div 
                                className="bg-blue-500 h-1 rounded-full"
                                style={{ width: `${insight.confidence}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < displayedInsights.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>

            {insights.length > 4 && (
              <div className="flex justify-center pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAllInsights(!showAllInsights)}
                  data-testid="button-toggle-insights"
                >
                  {showAllInsights 
                    ? `Show Less (${insights.length - 4} hidden)` 
                    : `Show All Insights (${insights.length - 4} more)`
                  }
                </Button>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Critical</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Warning</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Info</span>
                  </div>
                </div>
                <div>
                  Last updated: {new Date(insightsData.generated).toLocaleTimeString()}
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}