import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield, Eye, Lock, Database, AlertCircle } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <section className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 rounded-full p-4">
              <Shield className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            Last updated: August 2, 2025
          </p>
        </section>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="h-6 w-6 mr-2 text-blue-600" />
                Our Commitment to Privacy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                At ClimateAI, we are committed to protecting your privacy and ensuring transparency 
                about how we collect, use, and protect your information. This Privacy Policy explains 
                our practices regarding your personal data when you use our climate intelligence platform.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Database className="h-6 w-6 mr-2 text-green-600" />
                Information We Collect
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Information You Provide</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li><strong>Profile Information:</strong> Age, gender, and occupation for personalized recommendations</li>
                    <li><strong>Location Data:</strong> City and country information for weather services</li>
                    <li><strong>Contact Information:</strong> Email address when you contact us</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li><strong>IP Address:</strong> Used for automatic location detection</li>
                    <li><strong>Usage Data:</strong> How you interact with our platform</li>
                    <li><strong>Device Information:</strong> Browser type, operating system, and device characteristics</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Third-Party Data</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li><strong>Weather Data:</strong> From Open-Meteo API (no personal data shared)</li>
                    <li><strong>Location Services:</strong> From IP geolocation providers</li>
                    <li><strong>City Information:</strong> From OpenStreetMap Nominatim</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Lock className="h-6 w-6 mr-2 text-purple-600" />
                How We Use Your Information
              </h2>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-4">
                <p className="text-gray-600 leading-relaxed">
                  We use your information solely to provide and improve our climate intelligence services. 
                  We do not sell, rent, or share your personal information with third parties for marketing purposes.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Service Provision</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Deliver personalized weather forecasts and climate insights</li>
                    <li>Generate AI-powered environmental recommendations</li>
                    <li>Assess climate risks for your specific location</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Platform Improvement</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Analyze usage patterns to enhance user experience</li>
                    <li>Improve our AI models and prediction accuracy</li>
                    <li>Develop new features based on user needs</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Communication</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Respond to your inquiries and support requests</li>
                    <li>Send important updates about our services</li>
                    <li>Provide technical notifications when necessary</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Storage and Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="h-6 w-6 mr-2 text-red-600" />
                Data Storage and Security
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Local Storage</h3>
                  <p className="text-gray-600">
                    Your profile information is stored locally in your browser's localStorage. 
                    This means your personal data remains on your device and is not transmitted to our servers.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Security Measures</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>HTTPS encryption for all data transmission</li>
                    <li>Content Security Policy (CSP) headers</li>
                    <li>Input validation and sanitization</li>
                    <li>Regular security updates and monitoring</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Data Retention</h3>
                  <p className="text-gray-600">
                    Since we use localStorage, your data is retained until you clear your browser data 
                    or uninstall our application. We do not maintain copies of your personal information 
                    on our servers.
                  </p>
                </div>
              </div>
            </section>

            {/* Third-Party Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
              
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Weather Data Providers</h3>
                  <p className="text-gray-600">
                    We use Open-Meteo API for weather data. No personal information is shared with 
                    this service - only geographic coordinates for weather queries.
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Location Services</h3>
                  <p className="text-gray-600">
                    IP-based location detection is provided by ip-api.com and similar services. 
                    These services receive your IP address but no additional personal information.
                  </p>
                </div>

                <div className="bg-purple-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Services</h3>
                  <p className="text-gray-600">
                    We use Groq AI for generating climate recommendations. Only anonymized climate 
                    data and general profile categories are shared - no personally identifiable information.
                  </p>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="h-6 w-6 mr-2 text-orange-600" />
                Your Rights and Choices
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Data Control</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Update or delete your profile information at any time</li>
                    <li>Clear your browser data to remove all stored information</li>
                    <li>Choose not to provide optional profile information</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Access Rights</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Request information about data we process</li>
                    <li>Ask questions about our privacy practices</li>
                    <li>Contact us regarding any privacy concerns</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-600 mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, 
                  please contact us:
                </p>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Email:</strong> privacy@climateai.online</p>
                  <p><strong>Contact Form:</strong> <a href="/contact" className="text-blue-600 hover:underline">climateai.online/contact</a></p>
                </div>
              </div>
            </section>

            {/* Updates */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Updates</h2>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. When we do, we will post the 
                updated policy on this page and update the "Last updated" date. We encourage you 
                to review this policy periodically to stay informed about how we protect your privacy.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}