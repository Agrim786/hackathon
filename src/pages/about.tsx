import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Users, Target, Lightbulb, Globe, Award, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">ClimateAI</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to democratize climate intelligence and empower communities worldwide 
            with AI-driven environmental insights for a more sustainable future.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Climate change affects us all, but access to actionable climate intelligence remains limited. 
                  ClimateAI bridges this gap by providing real-time environmental data, personalized risk 
                  assessments, and AI-powered recommendations to help individuals and communities make 
                  informed decisions.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We believe that when people have access to the right information at the right time, 
                  they can adapt, prepare, and thrive in our changing climate.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8">
                <Globe className="h-16 w-16 text-blue-600 mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Global Impact</h3>
                <p className="text-gray-600">
                  Making climate intelligence accessible to communities worldwide, regardless of 
                  geographic location or economic status.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-6">
                <Lightbulb className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                Leveraging cutting-edge AI and machine learning to provide the most accurate 
                and actionable climate insights.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-6">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Accessibility</h3>
              <p className="text-gray-600">
                Ensuring our platform is accessible to everyone, with intuitive design 
                and free access to essential climate information.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-6">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community</h3>
              <p className="text-gray-600">
                Building a global community of climate-aware individuals working together 
                for environmental resilience.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl text-white p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center mb-12">What Makes Us Different</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <Target className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-xl font-semibold mb-3">Personalized Insights</h3>
                <p className="opacity-90">
                  AI-powered recommendations tailored to your location, profile, and specific needs.
                </p>
              </div>
              
              <div className="text-center">
                <Award className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-xl font-semibold mb-3">Real-time Data</h3>
                <p className="opacity-90">
                  Live weather monitoring and climate risk assessment using the latest meteorological data.
                </p>
              </div>
              
              <div className="text-center md:col-span-2 lg:col-span-1">
                <Globe className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-xl font-semibold mb-3">Global Coverage</h3>
                <p className="opacity-90">
                  Comprehensive climate intelligence for any location worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Team</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <p className="text-lg text-gray-600 text-center leading-relaxed">
              ClimateAI is built by a passionate team of climate scientists, AI engineers, and environmental advocates 
              who believe in the power of technology to address climate challenges. Our diverse backgrounds in 
              meteorology, machine learning, and sustainable development drive our commitment to creating 
              meaningful environmental solutions.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gray-100 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Mission</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Help us build a more climate-resilient world. Start using ClimateAI today and become 
              part of a global community working towards environmental sustainability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/" 
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-200"
              >
                Get Started Now
              </a>
              <a 
                href="/contact" 
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}