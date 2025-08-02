import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, RefreshCw, Lightbulb, Shield, Clock, Heart, Zap } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

interface AISuggestionsProps {
  profile: {
    age: string;
    gender: string;
    occupation: string;
  };
  latitude: number;
  longitude: number;
}

export function AISuggestions({ profile, latitude, longitude }: AISuggestionsProps) {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: weatherData } = useQuery({
    queryKey: ["/api/weather", latitude, longitude],
    enabled: !!(latitude && longitude),
    queryFn: async () => {
      const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      return response.json();
    },
  });

  const { data: suggestions, isLoading, error } = useQuery({
    queryKey: ["/api/ai/suggestions", profile, weatherData?.weather],
    enabled: !!(weatherData?.weather && profile.age && profile.gender && profile.occupation),
    queryFn: async () => {
      const response = await fetch("/api/ai/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile,
          weather: weatherData.weather,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI suggestions");
      }

      return response.json();
    },
  });

  const handleRefresh = async () => {
    if (!weatherData?.weather) return;
    
    setRefreshing(true);
    try {
      await queryClient.refetchQueries({
        queryKey: ["/api/ai/suggestions"],
      });
      toast({
        title: "Suggestions updated",
        description: "Your personalized recommendations have been refreshed.",
      });
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Unable to update suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'energy': return Zap;
      case 'health': return Heart;
      case 'safety': return Shield;
      case 'timing': return Clock;
      default: return Lightbulb;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'energy': return 'bg-blue-50 border-blue-200';
      case 'health': return 'bg-red-50 border-red-200';
      case 'safety': return 'bg-amber-50 border-amber-200';
      case 'timing': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  if (!profile.age || !profile.gender || !profile.occupation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="text-primary text-xl" />
            <span className="text-lg font-semibold text-gray-900">AI Climate Suggestions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            Please complete your profile to get personalized climate recommendations.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Brain className="text-primary text-xl" />
            <span className="text-lg font-semibold text-gray-900">AI Climate Suggestions</span>
          </CardTitle>
          <Button
            onClick={handleRefresh}
            disabled={refreshing || isLoading}
            variant="outline"
            size="sm"
            className="text-sm"
            data-testid="button-refresh-suggestions"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <div className="flex items-start space-x-3">
                  <Skeleton className="h-6 w-6 mt-0.5" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-full mb-1" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            Failed to load AI suggestions. Please try refreshing.
          </div>
        ) : suggestions && suggestions.length > 0 ? (
          <div className="space-y-4" data-testid="suggestions-list">
            {suggestions.map((suggestion: any) => {
              const IconComponent = getTypeIcon(suggestion.type);
              return (
                <div
                  key={suggestion.id}
                  className={`p-4 border rounded-lg ${getTypeColor(suggestion.type)}`}
                  data-testid={`suggestion-${suggestion.id}`}
                >
                  <div className="flex items-start space-x-3">
                    <IconComponent className={`text-lg mt-0.5 ${
                      suggestion.type === 'energy' ? 'text-blue-600' :
                      suggestion.type === 'health' ? 'text-red-600' :
                      suggestion.type === 'safety' ? 'text-amber-600' :
                      suggestion.type === 'timing' ? 'text-green-600' :
                      'text-gray-600'
                    }`} />
                    <div>
                      <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                      <p className="text-gray-700 text-sm mt-1">{suggestion.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No suggestions available at the moment.
          </div>
        )}

        {refreshing && (
          <div className="flex items-center justify-center py-8" data-testid="loading-suggestions">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2 text-gray-600">Getting personalized suggestions...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
