
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car as CarType } from "@/services/carService";
import { formatCurrency } from "@/lib/utils";

interface CarCardProps {
  car: CarType;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <Card className="car-card overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={car.imageUrl} 
          alt={`${car.make} ${car.model}`} 
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
        {car.sold && (
          <div className="absolute top-0 right-0 bg-carred-500 text-white px-3 py-1 rounded-bl-md font-medium">
            SOLD
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{car.make} {car.model}</h3>
          <span className="text-sm text-gray-500">{car.year}</span>
        </div>
        <div className="text-xl font-bold text-carblue-500 mb-2">
          {formatCurrency(car.price)}
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {car.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {car.features.slice(0, 3).map((feature, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
          {car.features.length > 3 && (
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
              +{car.features.length - 3} more
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex">
        <Link to={`/cars/${car.id}`} className="w-full">
          <Button 
            variant={car.sold ? "outline" : "default"} 
            className={`w-full ${!car.sold ? "bg-carblue-500 hover:bg-carblue-600" : ""}`}
          >
            {car.sold ? "View Details" : "View Deal"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
