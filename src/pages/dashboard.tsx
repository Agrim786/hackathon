import { useState } from "react";
import { LocationInput } from "@/components/LocationInput";
import { UserProfile } from "@/components/UserProfile";
import { ClimateRiskCards } from "@/components/ClimateRiskCards";
import { AISuggestions } from "@/components/AISuggestions";
import { ClimateForecasts } from "@/components/ClimateForecasts";
import { ClimateSimulator } from "@/components/ClimateSimulator";
import { ClimateInsights } from "@/components/ClimateInsights";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Dashboard() {
  const [location, setLocation] = useState<{
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  } | null>(null);

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem("climateai.online_profile");
    return saved ? JSON.parse(saved) : {
      age: "",
      gender: "",
      occupation: ""
    };
  });

  const saveProfile = (profile: any) => {
    setUserProfile(profile);
    localStorage.setItem("climateai.online_profile", JSON.stringify(profile));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Location Input */}
        <section className="mb-8">
          <LocationInput onLocationChange={setLocation} data-testid="location-section" />
        </section>

        {/* User Profile */}
        <section className="mb-8">
          <UserProfile 
            profile={userProfile} 
            onProfileChange={saveProfile}
            data-testid="profile-section"
          />
        </section>

        {/* Climate Risk Cards */}
        {location && (
          <section className="mb-8">
            <ClimateRiskCards 
              latitude={location.latitude} 
              longitude={location.longitude}
              data-testid="risk-cards-section"
            />
          </section>
        )}

        {/* AI Suggestions */}
        {location && userProfile.age && userProfile.gender && userProfile.occupation && (
          <section className="mb-8">
            <AISuggestions 
              profile={userProfile}
              latitude={location.latitude}
              longitude={location.longitude}
              data-testid="ai-suggestions-section"
            />
          </section>
        )}

        {/* Climate Insights with ML Analysis */}
        {location && (
          <section className="mb-8">
            <ClimateInsights 
              location={location}
              weather={null} // Will be fetched by the component
              userProfile={userProfile}
            />
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Climate Forecasts */}
          {location && (
            <section id="forecast">
              <ClimateForecasts 
                latitude={location.latitude}
                longitude={location.longitude}
                data-testid="forecasts-section"
              />
            </section>
          )}

          {/* Climate Simulator */}
          {location && userProfile.age && (
            <section id="simulator">
              <ClimateSimulator 
                profile={userProfile}
                latitude={location.latitude}
                longitude={location.longitude}
                data-testid="simulator-section"
              />
            </section>
          )}
        </div>

      </main>
      
      <Footer />
    </div>
  );
}
