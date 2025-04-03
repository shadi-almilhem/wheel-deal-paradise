
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getAvailableCars } from "@/services/carService";
import CarCard from "@/components/CarCard";
import { ArrowRight, ShieldCheck, Truck, Users } from "lucide-react";

const Home: React.FC = () => {
  const featuredCars = getAvailableCars().slice(0, 3);

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-carblue-500 to-carblue-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Find Your Dream Car Today
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              Browse our extensive collection of high-quality vehicles at competitive prices.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-white text-carblue-600 hover:bg-gray-100"
                asChild
              >
                <Link to="/cars">
                  Browse Cars
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative element */}
        <div className="absolute right-0 bottom-0 transform translate-y-1/4 -z-10 opacity-10">
          <svg
            width="400"
            height="400"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white fill-current"
          >
            <path
              d="M47.5,-51.2C59.2,-35.7,64.8,-17.8,64.1,-0.7C63.5,16.5,56.6,33,44.5,44.3C32.4,55.6,16.2,61.8,-1.6,63.4C-19.5,65,-38.9,62,-53.3,50.7C-67.7,39.4,-77,19.7,-76.1,0.9C-75.2,-17.9,-64,-35.8,-49.6,-51.3C-35.3,-66.8,-17.6,-79.9,0.3,-80.3C18.3,-80.6,36.7,-68.1,47.5,-52.7Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose WheelDeal?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center bg-carblue-100 text-carblue-500 rounded-full mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
              <p className="text-gray-600">All our vehicles undergo a rigorous inspection process to ensure quality and reliability.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center bg-carblue-100 text-carblue-500 rounded-full mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Advice</h3>
              <p className="text-gray-600">Our team of automotive experts is always ready to help you find the perfect car.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center bg-carblue-100 text-carblue-500 rounded-full mb-4">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and hassle-free delivery process to get you on the road as soon as possible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Vehicles</h2>
            <Link 
              to="/cars" 
              className="text-carblue-500 hover:text-carblue-600 font-medium flex items-center"
            >
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-carblue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Car?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Browse our inventory and discover great deals on quality vehicles.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-carblue-600 hover:bg-gray-100"
            asChild
          >
            <Link to="/cars">
              Start Browsing Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
