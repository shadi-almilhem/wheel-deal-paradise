
import { toast } from "sonner";

export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  description: string;
  imageUrl: string;
  features: string[];
  sold: boolean;
  sellerId: string | null;
};

// Mock car data (to be replaced with Supabase)
const INITIAL_CARS: Car[] = [
  {
    id: "1",
    make: "Toyota",
    model: "Camry",
    year: 2021,
    price: 25000,
    description: "Reliable sedan with excellent fuel economy and smooth ride. Includes advanced safety features and infotainment system.",
    imageUrl: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Bluetooth", "Backup Camera", "Lane Assist", "Cruise Control"],
    sold: false,
    sellerId: null,
  },
  {
    id: "2",
    make: "Honda",
    model: "Civic",
    year: 2022,
    price: 22000,
    description: "Compact car with sporty handling and modern styling. Features include Honda Sensing safety suite and Apple CarPlay/Android Auto.",
    imageUrl: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Apple CarPlay", "Android Auto", "Sunroof", "Heated Seats"],
    sold: false,
    sellerId: null,
  },
  {
    id: "3",
    make: "Ford",
    model: "Mustang",
    year: 2020,
    price: 35000,
    description: "Iconic American muscle car with powerful engine options. Features SYNC infotainment and performance driving modes.",
    imageUrl: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["V8 Engine", "Leather Seats", "Premium Audio", "Rear-Wheel Drive"],
    sold: false,
    sellerId: null,
  },
  {
    id: "4",
    make: "Jeep",
    model: "Wrangler",
    year: 2021,
    price: 40000,
    description: "Off-road capable SUV with removable top and doors. Includes 4x4 capability and modern tech features.",
    imageUrl: "https://images.unsplash.com/photo-1561893836-adae6b766f82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["4x4", "Removable Top", "Off-Road Package", "Tow Package"],
    sold: false,
    sellerId: null,
  },
  {
    id: "5",
    make: "Tesla",
    model: "Model 3",
    year: 2022,
    price: 45000,
    description: "All-electric sedan with impressive range and acceleration. Features include Autopilot and large touchscreen interface.",
    imageUrl: "https://images.unsplash.com/photo-1561580125-028ee3bd62eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Electric", "Autopilot", "Minimalist Interior", "Fast Charging"],
    sold: false,
    sellerId: null,
  },
  {
    id: "6",
    make: "BMW",
    model: "3 Series",
    year: 2021,
    price: 42000,
    description: "Luxury sedan with dynamic handling and premium features. Includes iDrive infotainment and driver assistance features.",
    imageUrl: "https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Leather Interior", "Navigation", "Sport Mode", "Premium Sound"],
    sold: false,
    sellerId: null,
  },
];

// Get cars from localStorage or use initial data
const getStoredCars = (): Car[] => {
  const storedCars = localStorage.getItem('cars');
  return storedCars ? JSON.parse(storedCars) : INITIAL_CARS;
};

// Save cars to localStorage
const saveCars = (cars: Car[]) => {
  localStorage.setItem('cars', JSON.stringify(cars));
};

// Initialize cars in localStorage if not present
let cars = getStoredCars();
if (!localStorage.getItem('cars')) {
  saveCars(cars);
}

export const getAllCars = (): Car[] => {
  return getStoredCars();
};

export const getAvailableCars = (): Car[] => {
  return getStoredCars().filter(car => !car.sold);
};

export const getCarById = (id: string): Car | undefined => {
  return getStoredCars().find(car => car.id === id);
};

export const getUserPurchases = (userId: string): Car[] => {
  return getStoredCars().filter(car => car.sold && car.sellerId === userId);
};

export const purchaseCar = (carId: string, userId: string): boolean => {
  const cars = getStoredCars();
  const carIndex = cars.findIndex(car => car.id === carId);
  
  if (carIndex === -1 || cars[carIndex].sold) {
    toast.error("Car is not available for purchase!");
    return false;
  }
  
  cars[carIndex] = { ...cars[carIndex], sold: true, sellerId: userId };
  saveCars(cars);
  toast.success("Car purchased successfully!");
  return true;
};

export const addCar = (car: Omit<Car, 'id'>): Car => {
  const cars = getStoredCars();
  const newCar: Car = {
    ...car,
    id: Math.random().toString(36).substring(2, 9),
  };
  
  cars.push(newCar);
  saveCars(cars);
  toast.success("Car added successfully!");
  return newCar;
};

export const updateCar = (car: Car): boolean => {
  const cars = getStoredCars();
  const carIndex = cars.findIndex(c => c.id === car.id);
  
  if (carIndex === -1) {
    toast.error("Car not found!");
    return false;
  }
  
  cars[carIndex] = car;
  saveCars(cars);
  toast.success("Car updated successfully!");
  return true;
};

export const deleteCar = (id: string): boolean => {
  const cars = getStoredCars();
  const initialLength = cars.length;
  const filteredCars = cars.filter(car => car.id !== id);
  
  if (filteredCars.length === initialLength) {
    toast.error("Car not found!");
    return false;
  }
  
  saveCars(filteredCars);
  toast.success("Car deleted successfully!");
  return true;
};
