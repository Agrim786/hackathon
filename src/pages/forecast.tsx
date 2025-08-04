import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


type LocationData = {
    city: string;
    region: string;
    country: string;
    latitude: number;
    longitude: number;
    timezone: string;
};


export default function Forecast() {
    const [forecastPeriod, setForecastPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');

    // Get user location
    const { data: location = { city: '', region: '', country: '', latitude: 0, longitude: 0, timezone: '' } }
        = useQuery<LocationData>({
            queryKey: ['/api/location'],
            queryFn: () => fetch(`${import.meta.env.VITE_URL}/api/location`).then(res => res.json()),
            staleTime: 30 * 60 * 1000, // 30 minutes
        });


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Weather Forecast</h1>
                    <p className="text-lg text-gray-600">
                        Advanced ML-powered weather predictions for {location?.city || 'your location'}
                    </p>
                </div>

                <Tabs defaultValue="daily" onValueChange={(value) => setForecastPeriod(value as any)}>
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="daily">Daily</TabsTrigger>
                        <TabsTrigger value="weekly">Weekly</TabsTrigger>
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                        <TabsTrigger value="yearly">Yearly</TabsTrigger>
                    </TabsList>

                    <TabsContent value="daily" className="mt-6">
                        <ForecastContent period="daily" location={location} />
                    </TabsContent>

                    <TabsContent value="weekly" className="mt-6">
                        <ForecastContent period="weekly" location={location} />
                    </TabsContent>

                    <TabsContent value="monthly" className="mt-6">
                        <ForecastContent period="monthly" location={location} />
                    </TabsContent>

                    <TabsContent value="yearly" className="mt-6">
                        <ForecastContent period="yearly" location={location} />
                    </TabsContent>
                </Tabs>
            </div>

            <Footer />
        </div>
    );
}

function ForecastContent({ period, location }: { period: string, location: any }) {
    const { data: forecast, isLoading, error } = useQuery({
        queryKey: ["/api/forecast", location?.latitude, location?.longitude, period],
        enabled: !!(location?.latitude && location?.longitude),
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_URL}/api/forecast?lat=${location.latitude}&lon=${location.longitude}&period=${period}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch forecast data");
            }
            return response.json();
        },
    });

    const formatChartData = (data: any[]) => {
        if (!data) return [];
        return data.map((item, index) => ({
            name: period === 'daily'
                ? new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' })
                : period === 'weekly'
                    ? `Week ${index + 1}`
                    : period === 'monthly'
                        ? new Date(item.date).toLocaleDateString('en-US', { month: 'short' })
                        : new Date(item.date).getFullYear().toString(),
            tempMax: Math.round(item.tempMax),
            tempMin: Math.round(item.tempMin),
            original: item,
        }));
    };




    const getWeatherIcon = (temp: number) => {
        if (temp > 25) return <Sun className="h-6 w-6 text-yellow-500" />;
        if (temp > 15) return <Cloud className="h-6 w-6 text-gray-500" />;
        return <CloudRain className="h-6 w-6 text-blue-500" />;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    };

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading forecast data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Card>
                <CardContent className="text-center py-12">
                    <Cloud className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading forecast</h3>
                    <p className="text-gray-600 mb-4">There was an error loading the weather forecast data.</p>
                    <Button onClick={() => window.location.reload()}>
                        Try Again
                    </Button>
                </CardContent>
            </Card>
        );
    }

    if (!forecast || !forecast.data || forecast.data.length === 0) {
        return (
            <Card>
                <CardContent className="text-center py-12">
                    <Cloud className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No forecast data available</h3>
                    <p className="text-gray-600 mb-4">Unable to load weather forecast for your location.</p>
                    <Button onClick={() => window.location.reload()}>
                        Try Again
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            {/* Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Temperature Trend</CardTitle>
                    <CardDescription>
                        {period} temperature forecast with {forecast.confidence}% confidence
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={formatChartData(forecast?.data || [])}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => `${value}°C`} />
                            <Line type="monotone" dataKey="tempMax" stroke="#2563EB" name="Max Temp" />
                            <Line type="monotone" dataKey="tempMin" stroke="#60A5FA" name="Min Temp" />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Forecast Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {forecast.data.slice(0, 6).map((day: any, index: number) => (
                    <Card key={index}>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-600">
                                    {formatDate(day.date)}
                                </span>
                                {getWeatherIcon(Math.round((day.tempMax + day.tempMin) / 2))}
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-gray-900">
                                    {Math.round((day.tempMax + day.tempMin) / 2)}°C
                                </span>
                                <span className="text-sm text-gray-500">
                                    {Math.round(((day.tempMax + day.tempMin) / 2) * 9 / 5 + 32)}°F
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                High: {day.tempMax}°C • Low: {day.tempMin}°C
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Summary */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Thermometer className="h-5 w-5" />
                        Forecast Summary
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                            <p className="text-sm text-gray-600">Average Temperature</p>
                            <p className="text-2xl font-bold text-blue-600">
                                {Math.round(forecast.data.reduce((sum: number, day: any) => sum + day.temperature, 0) / forecast.data.length)}°C{Math.round(
                                    forecast.data.reduce((sum: number, day: any) => sum + (day.tempMax + day.tempMin) / 2, 0) / forecast.data.length
                                )}°C
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-600">Temperature Range</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {Math.min(...forecast.data.map((d: any) => d.tempMin))}° - {Math.max(...forecast.data.map((d: any) => d.tempMax))}°C
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-600">Prediction Confidence</p>
                            <p className="text-lg font-semibold text-green-600">{forecast.confidence || 85}%</p>
                        </div>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <span className="font-medium">Period:</span> {period.charAt(0).toUpperCase() + period.slice(1)} forecast powered by advanced ML models
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}