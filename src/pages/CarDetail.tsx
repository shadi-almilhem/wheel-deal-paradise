
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCarById, purchaseCar } from "@/services/carService";
import { useAuth } from "@/contexts/AuthContext";
import { formatCurrency } from "@/lib/utils";
import { Calendar, Check, Info, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const CarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const car = id ? getCarById(id) : undefined;
  
  if (!car) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Car Not Found</h1>
        <p className="mb-6">The car you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/cars")}>Browse Other Cars</Button>
      </div>
    );
  }
  
  const handlePurchase = () => {
    if (!user) {
      toast.error("Please log in to purchase a car");
      navigate("/login");
      return;
    }
    
    if (car.sold) {
      toast.error("This car has already been sold");
      return;
    }
    
    if (purchaseCar(car.id, user.id)) {
      navigate("/dashboard");
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 page-transition">
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to listings
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Car images */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src={car.imageUrl} 
              alt={`${car.make} ${car.model}`} 
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Car description */}
          <div className="mt-8 bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{car.description}</p>
            
            <h3 className="text-xl font-bold mt-8 mb-4">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {car.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Car details and purchase section */}
        <div className="space-y-6">
          {/* Car info card */}
          <Card className="shadow-md">
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold mb-1">
                {car.make} {car.model}
              </h1>
              <div className="flex items-center text-gray-500 mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{car.year}</span>
              </div>
              
              <div className="text-3xl font-bold text-carblue-500 mb-6">
                {formatCurrency(car.price)}
              </div>
              
              {car.sold ? (
                <div className="bg-red-50 text-red-700 px-4 py-3 rounded-md mb-4 flex items-start">
                  <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <p>This car has already been sold. Please check our other listings.</p>
                </div>
              ) : (
                <Button 
                  className="w-full bg-carblue-500 hover:bg-carblue-600 mb-4" 
                  size="lg"
                  onClick={handlePurchase}
                >
                  Purchase Now
                </Button>
              )}
              
              {!user && !car.sold && (
                <p className="text-sm text-gray-500 text-center">
                  You need to be logged in to purchase this car.
                </p>
              )}
            </CardContent>
          </Card>
          
          {/* Car details card */}
          <Card className="shadow-md">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Vehicle Details</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Make</span>
                  <span className="font-medium">{car.make}</span>
                </div>
                <Separator />
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Model</span>
                  <span className="font-medium">{car.model}</span>
                </div>
                <Separator />
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Year</span>
                  <span className="font-medium">{car.year}</span>
                </div>
                <Separator />
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-medium ${car.sold ? 'text-red-500' : 'text-green-500'}`}>
                    {car.sold ? 'Sold' : 'Available'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Contact card */}
          <Card className="shadow-md">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Have Questions?</h2>
              <p className="text-gray-600 mb-4">
                Contact our sales team for more information about this vehicle.
              </p>
              <Button className="w-full" variant="outline">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
