import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface LocationInputProps {
  onLocationChange: (location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  }) => void;
}

export function LocationInput({ onLocationChange }: LocationInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [detectedLocation, setDetectedLocation] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Array<{city: string, country: string, lat: number, lon: number}>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const suggestionTimeoutRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();

  const { data: autoLocation, refetch: detectLocation, isLoading: isDetecting } = useQuery({
    queryKey: ["/api/location"],
    enabled: true, // Auto-detect on component mount
    queryFn: async () => {
      const response = await fetch("/api/location");
      if (!response.ok) {
        throw new Error('Failed to detect location');
      }
      return response.json();
    },
  });

  useEffect(() => {
    if (autoLocation) {
      setDetectedLocation(`${autoLocation.city}, ${autoLocation.country}`);
      setInputValue(`${autoLocation.city}, ${autoLocation.country}`);
      onLocationChange(autoLocation);
    }
  }, [autoLocation, onLocationChange]);

  // Debounced search for city suggestions
  useEffect(() => {
    if (suggestionTimeoutRef.current) {
      clearTimeout(suggestionTimeoutRef.current);
    }

    if (inputValue.trim().length >= 2 && !detectedLocation.includes(inputValue)) {
      suggestionTimeoutRef.current = setTimeout(() => {
        fetchCitySuggestions(inputValue.trim());
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    return () => {
      if (suggestionTimeoutRef.current) {
        clearTimeout(suggestionTimeoutRef.current);
      }
    };
  }, [inputValue, detectedLocation]);

  const fetchCitySuggestions = async (query: string) => {
    if (query.length < 2) return;
    
    setIsLoadingSuggestions(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1&type=city`
      );
      const data = await response.json();
      
      const cityResults = data
        .filter((item: any) => item.type === 'city' || item.type === 'town' || item.type === 'administrative')
        .map((item: any) => ({
          city: item.address?.city || item.address?.town || item.name || item.display_name.split(',')[0],
          country: item.address?.country || item.display_name.split(',').pop()?.trim() || '',
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
          display: `${item.address?.city || item.address?.town || item.name || item.display_name.split(',')[0]}, ${item.address?.country || item.display_name.split(',').pop()?.trim()}`
        }))
        .slice(0, 5);

      setSuggestions(cityResults);
      setShowSuggestions(cityResults.length > 0);
    } catch (error) {
      console.error('Failed to fetch city suggestions:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    const location = {
      city: suggestion.city,
      country: suggestion.country,
      latitude: suggestion.lat,
      longitude: suggestion.lon,
    };
    
    setInputValue(suggestion.display);
    setDetectedLocation(suggestion.display);
    setShowSuggestions(false);
    setSuggestions([]);
    onLocationChange(location);
    
    toast({
      title: "Location selected",
      description: `Location set to ${suggestion.display}`,
    });
  };

  const handleAutoDetect = async () => {
    try {
      await detectLocation();
      toast({
        title: "Location detected",
        description: "Your location has been automatically detected.",
      });
    } catch (error) {
      toast({
        title: "Location detection failed",
        description: "Unable to detect your location. Please enter it manually.",
        variant: "destructive",
      });
    }
  };

  const handleManualSearch = async () => {
    if (!inputValue.trim()) {
      toast({
        title: "Invalid input",
        description: "Please enter a city name.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Use OpenStreetMap Nominatim API for geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(inputValue)}&limit=1`
      );
      const data = await response.json();

      if (data.length === 0) {
        throw new Error("Location not found");
      }

      const result = data[0];
      const location = {
        city: result.display_name.split(",")[0],
        country: result.display_name.split(",").pop()?.trim() || "",
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
      };

      onLocationChange(location);
      setDetectedLocation(result.display_name);
      
      toast({
        title: "Location found",
        description: `Location set to ${result.display_name}`,
      });
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Could not find the specified location. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Your Location</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter city or location..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleManualSearch()}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="pr-10"
                data-testid="input-location"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                onClick={handleManualSearch}
                data-testid="button-search"
              >
                <Search className="h-4 w-4 text-gray-400" />
              </Button>
              
              {/* Suggestions dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {isLoadingSuggestions && (
                    <div className="px-3 py-2 text-sm text-gray-500">
                      Searching cities...
                    </div>
                  )}
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={`${suggestion.lat}-${suggestion.lon}-${index}`}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center space-x-2 border-b border-gray-100 last:border-b-0"
                      onClick={() => handleSuggestionClick(suggestion)}
                      data-testid={`suggestion-${index}`}
                    >
                      <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {suggestion.city}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {suggestion.country}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <Button
            onClick={handleAutoDetect}
            disabled={isDetecting}
            className="px-6 py-3 bg-primary text-white hover:bg-blue-700 transition-colors flex items-center space-x-2"
            data-testid="button-auto-detect"
          >
            <MapPin className="h-4 w-4" />
            <span>{isDetecting ? "Detecting..." : "Auto-Detect"}</span>
          </Button>
        </div>

        {detectedLocation && (
          <div className="mt-3 flex items-center text-sm text-gray-600" data-testid="text-detected-location">
            <MapPin className="h-4 w-4 text-green-600 mr-2" />
            <span>Detected: {detectedLocation}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
