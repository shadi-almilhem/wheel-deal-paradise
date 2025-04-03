
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getUserPurchases } from "@/services/carService";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
import { User, Car as CarIcon, Package, LogOut } from "lucide-react";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  const purchases = getUserPurchases(user.id);
  
  return (
    <div className="container mx-auto px-4 py-8 page-transition">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-carblue-100 flex items-center justify-center mb-3">
                  <User className="h-8 w-8 text-carblue-500" />
                </div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
              
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  asChild
                >
                  <div>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  asChild
                >
                  <div>
                    <Package className="h-4 w-4 mr-2" />
                    My Purchases
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" 
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
          
          <Tabs defaultValue="purchases">
            <TabsList className="mb-6">
              <TabsTrigger value="purchases">My Purchases</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="purchases">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Your Purchased Vehicles</h2>
                
                {purchases.length === 0 ? (
                  <div className="text-center py-8">
                    <CarIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Purchases Yet</h3>
                    <p className="text-gray-500 mb-4">
                      You haven't purchased any vehicles yet.
                    </p>
                    <Button asChild>
                      <a href="/cars">Browse Cars</a>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {purchases.map(car => (
                      <div 
                        key={car.id} 
                        className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row gap-4"
                      >
                        {/* Car image */}
                        <div className="md:w-1/4">
                          <img 
                            src={car.imageUrl} 
                            alt={`${car.make} ${car.model}`} 
                            className="w-full h-auto rounded-md object-cover"
                          />
                        </div>
                        
                        {/* Car details */}
                        <div className="flex-1">
                          <h3 className="text-lg font-bold">
                            {car.make} {car.model} ({car.year})
                          </h3>
                          <p className="text-carblue-500 font-semibold mb-2">
                            {formatCurrency(car.price)}
                          </p>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {car.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {car.features.slice(0, 3).map((feature, index) => (
                              <span 
                                key={index} 
                                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            asChild
                          >
                            <a href={`/cars/${car.id}`}>View Details</a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="profile">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Your Profile</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Full Name</h3>
                    <p className="text-lg">{user.name}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Email Address</h3>
                    <p className="text-lg">{user.email}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Account Type</h3>
                    <p className="text-lg">{user.isAdmin ? 'Administrator' : 'Customer'}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Member Since</h3>
                    <p className="text-lg">April 2023</p>
                  </div>
                  
                  <Button>Edit Profile</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
