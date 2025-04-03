
import React, { useState, useEffect } from "react";
import { getAvailableCars, Car } from "@/services/carService";
import CarCard from "@/components/CarCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { debounce } from "@/lib/utils";

const Cars: React.FC = () => {
  const allCars = getAvailableCars();
  const [cars, setCars] = useState<Car[]>(allCars);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [yearRange, setYearRange] = useState([2010, 2023]);
  const [make, setMake] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  const maxPrice = Math.max(...allCars.map(car => car.price));
  const minPrice = Math.min(...allCars.map(car => car.price));
  const maxYear = Math.max(...allCars.map(car => car.year));
  const minYear = Math.min(...allCars.map(car => car.year));
  
  // Get unique makes for filter dropdown
  const makes = [...new Set(allCars.map(car => car.make))];
  
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
    setYearRange([minYear, maxYear]);
  }, [allCars, minPrice, maxPrice, minYear, maxYear]);
  
  // Apply filters
  useEffect(() => {
    let filtered = allCars;
    
    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(car => 
        car.make.toLowerCase().includes(search) || 
        car.model.toLowerCase().includes(search) ||
        car.description.toLowerCase().includes(search)
      );
    }
    
    // Apply price filter
    filtered = filtered.filter(car => 
      car.price >= priceRange[0] && car.price <= priceRange[1]
    );
    
    // Apply year filter
    filtered = filtered.filter(car => 
      car.year >= yearRange[0] && car.year <= yearRange[1]
    );
    
    // Apply make filter
    if (make) {
      filtered = filtered.filter(car => car.make === make);
    }
    
    setCars(filtered);
  }, [searchTerm, priceRange, yearRange, make, allCars]);
  
  const resetFilters = () => {
    setSearchTerm("");
    setPriceRange([minPrice, maxPrice]);
    setYearRange([minYear, maxYear]);
    setMake("");
  };
  
  const handleSearch = debounce((value: string) => {
    setSearchTerm(value);
  }, 300);
  
  return (
    <div className="container mx-auto px-4 py-8 page-transition">
      <h1 className="text-3xl font-bold mb-2">Available Cars</h1>
      <p className="text-gray-600 mb-6">Find your perfect match from our collection</p>
      
      {/* Search bar & filter toggle */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by make, model, or keywords..."
            className="pl-10"
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchTerm}
          />
        </div>
        <Button 
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="flex items-center"
        >
          <Filter className="mr-2 h-4 w-4" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>
      
      {/* Filters */}
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
              className="text-sm flex items-center text-gray-500 hover:text-gray-700"
            >
              <X className="mr-1 h-4 w-4" />
              Reset
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Make filter */}
            <div>
              <Label htmlFor="make" className="mb-2 block">Make</Label>
              <Select value={make} onValueChange={setMake}>
                <SelectTrigger id="make">
                  <SelectValue placeholder="All Makes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Makes</SelectItem>
                  {makes.map(m => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Price range filter */}
            <div>
              <Label className="mb-2 block">Price Range</Label>
              <div className="pl-1 pr-1">
                <Slider
                  value={priceRange}
                  min={minPrice}
                  max={maxPrice}
                  step={1000}
                  onValueChange={setPriceRange}
                  className="my-4"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>${priceRange[0].toLocaleString()}</span>
                <span>${priceRange[1].toLocaleString()}</span>
              </div>
            </div>
            
            {/* Year range filter */}
            <div>
              <Label className="mb-2 block">Year Range</Label>
              <div className="pl-1 pr-1">
                <Slider
                  value={yearRange}
                  min={minYear}
                  max={maxYear}
                  step={1}
                  onValueChange={setYearRange}
                  className="my-4"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{yearRange[0]}</span>
                <span>{yearRange[1]}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Results count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {cars.length} {cars.length === 1 ? 'car' : 'cars'}
        </p>
      </div>
      
      {/* Car listings */}
      {cars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No cars found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
          <Button onClick={resetFilters} variant="outline">Reset Filters</Button>
        </div>
      )}
    </div>
  );
};

export default Cars;
