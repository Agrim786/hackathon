import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Play, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface ClimateSimulatorProps {
  profile: {
    age: string;
    gender: string;
    occupation: string;
  };
  latitude: number;
  longitude: number;
}

export function ClimateSimulator({ profile, latitude, longitude }: ClimateSimulatorProps) {
  const [temperatureChange, setTemperatureChange] = useState([5]);
  const [rainfallChange, setRainfallChange] = useState([-30]);
  const [simulationResult, setSimulationResult] = useState<any>(null);
  const [isSimulating, setIsSimulating] = useState(false);
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

  const runSimulation = async () => {
    if (!weatherData?.weather) {
      toast({
        title: "No weather data",
        description: "Please wait for weather data to load before running simulation.",
        variant: "destructive",
      });
      return;
    }

    setIsSimulating(true);
    try {
      const response = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: {
            temperatureChange: temperatureChange[0],
            rainfallChange: rainfallChange[0],
          },
          profile,
          weather: weatherData.weather,
        }),
      });

      if (!response.ok) {
        throw new Error("Simulation failed");
      }

      const result = await response.json();
      setSimulationResult(result);
      
      toast({
        title: "Simulation complete",
        description: "Climate impact analysis has been generated.",
      });
    } catch (error) {
      toast({
        title: "Simulation failed",
        description: "Unable to run climate simulation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Climate Impact Simulator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Temperature Slider */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Temperature Adjustment: 
            <span className="text-primary font-semibold ml-1" data-testid="text-temperature-value">
              {temperatureChange[0] > 0 ? '+' : ''}{temperatureChange[0]}°F
            </span>
          </Label>
          <Slider
            value={temperatureChange}
            onValueChange={setTemperatureChange}
            min={-20}
            max={20}
            step={1}
            className="w-full"
            data-testid="slider-temperature"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>-20°F</span>
            <span>Current</span>
            <span>+20°F</span>
          </div>
        </div>

        {/* Rainfall Slider */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Rainfall Change: 
            <span className="text-primary font-semibold ml-1" data-testid="text-rainfall-value">
              {rainfallChange[0] > 0 ? '+' : ''}{rainfallChange[0]}%
            </span>
          </Label>
          <Slider
            value={rainfallChange}
            onValueChange={setRainfallChange}
            min={-50}
            max={50}
            step={5}
            className="w-full"
            data-testid="slider-rainfall"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>-50%</span>
            <span>Current</span>
            <span>+50%</span>
          </div>
        </div>

        {/* Simulate Button */}
        <Button
          onClick={runSimulation}
          disabled={isSimulating}
          className="w-full py-3 bg-secondary text-white hover:bg-green-700 transition-colors font-medium"
          data-testid="button-run-simulation"
        >
          <Play className="mr-2 h-4 w-4" />
          {isSimulating ? "Running Simulation..." : "Run Simulation"}
        </Button>

        {/* Simulation Results */}
        {simulationResult && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4" data-testid="simulation-results">
            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
              <AlertTriangle className="text-yellow-600 mr-2 h-5 w-5" />
              Simulation Results
            </h4>
            <div className="space-y-2 text-sm text-gray-700">
              <div>
                <strong>Impact:</strong> {simulationResult.impact}
              </div>
              
              {simulationResult.recommendations && simulationResult.recommendations.length > 0 && (
                <div>
                  <strong>Recommendations:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    {simulationResult.recommendations.map((rec: string, index: number) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {simulationResult.healthRisks && simulationResult.healthRisks.length > 0 && (
                <div>
                  <strong>Health Risks:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    {simulationResult.healthRisks.map((risk: string, index: number) => (
                      <li key={index}>{risk}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {isSimulating && (
          <div className="flex items-center justify-center py-4" data-testid="simulation-loading">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-secondary"></div>
            <span className="ml-2 text-gray-600">Analyzing climate scenario...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
