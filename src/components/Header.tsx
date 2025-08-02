import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Cloud, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { href: "/", label: "Dashboard" },
    { href: "/forecast", label: "Forecast" },
    { href: "/simulator", label: "Climate Simulator" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  const NavigationMenu = ({ mobile = false }) => (
    <nav className={`${mobile ? "flex flex-col space-y-4" : "hidden lg:flex space-x-8"}`}>
      {navigationItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`font-medium transition-colors hover:text-blue-600 ${
            location === item.href 
              ? "text-blue-600 border-b-2 border-blue-600 pb-1" 
              : "text-gray-700"
          } ${mobile ? "text-lg py-2" : ""}`}
          onClick={() => mobile && setIsOpen(false)}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl shadow-md group-hover:shadow-lg transition-shadow">
              <Cloud className="h-8 w-8 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                ClimateAI
              </h1>
              <p className="text-xs text-gray-500 -mt-1">AI Climate Intelligence</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <NavigationMenu />
          
          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="py-8">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl">
                    <Cloud className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">ClimateAI</h2>
                    <p className="text-sm text-gray-500">AI Climate Intelligence</p>
                  </div>
                </div>
                <NavigationMenu mobile />
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                    Get Started
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}