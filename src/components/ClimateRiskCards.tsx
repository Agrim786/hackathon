import { Card, CardContent } from "@/components/ui/card";
import { Thermometer, CloudRain, Sun, Wind } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface ClimateRiskCardsProps {
  latitude: number;
  longitude: number;
}

export function ClimateRiskCards({ latitude, longitude }: ClimateRiskCardsProps) {
  const { data, isLoading, error } = useQuery({
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

  if (isLoading) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Current Climate Risks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-8 w-8 mb-3" />
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-16 mb-1" />
                <Skeleton className="h-3 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Current Climate Risks</h2>
        <div className="text-center py-8 text-gray-500">
          Failed to load weather data. Please try again.
        </div>
      </div>
    );
  }

  const { risks } = data;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'border-green-500 text-green-600 bg-green-50';
      case 'moderate': return 'border-amber-500 text-amber-600 bg-amber-50';
      case 'high': return 'border-orange-500 text-orange-600 bg-orange-50';
      case 'extreme': return 'border-red-500 text-red-600 bg-red-50';
      default: return 'border-gray-500 text-gray-600 bg-gray-50';
    }
  };

  const getIconColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'moderate': return 'text-amber-600';
      case 'high': return 'text-orange-600';
      case 'extreme': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const cards = [
    {
      title: "Temperature",
      value: `${risks.temperature.value}°F`,
      subtitle: `Feels like ${data.weather.feelsLike > 0 ? Math.round(data.weather.feelsLike * 9/5 + 32) : risks.temperature.value}°F`,
      risk: risks.temperature.risk,
      description: risks.temperature.description,
      icon: Thermometer,
      testId: "card-temperature"
    },
    {
      title: "Rain Forecast",
      value: `${risks.rain.probability}%`,
      subtitle: "Next 3 hours",
      risk: risks.rain.risk,
      description: risks.rain.description,
      icon: CloudRain,
      testId: "card-rain"
    },
    {
      title: "UV Index",
      value: risks.uv.index.toString(),
      subtitle: risks.uv.index > 8 ? "Very High" : risks.uv.index > 6 ? "High" : risks.uv.index > 3 ? "Moderate" : "Low",
      risk: risks.uv.risk,
      description: risks.uv.description,
      icon: Sun,
      testId: "card-uv"
    },
    {
      title: "Air Quality",
      value: risks.aqi.value.toString(),
      subtitle: "AQI Good",
      risk: risks.aqi.risk,
      description: risks.aqi.description,
      icon: Wind,
      testId: "card-aqi"
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Current Climate Risks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className={`border-l-4 ${getRiskColor(card.risk).replace('text-', 'border-').replace('bg-', '')}`} data-testid={card.testId}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`text-2xl ${getIconColor(card.risk)}`} />
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${getRiskColor(card.risk)}`}>
                    {card.risk.charAt(0).toUpperCase() + card.risk.slice(1)}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900">{card.title}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-2" data-testid={`text-${card.title.toLowerCase().replace(' ', '-')}-value`}>
                  {card.value}
                </p>
                <p className="text-sm text-gray-600 mt-1">{card.subtitle}</p>
                <div className="mt-3 text-xs text-gray-500">{card.description}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
