
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getAllCars, addCar, updateCar, deleteCar, Car } from "@/services/carService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
import { Plus, Pencil, Trash2, Car as CarIcon, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

const Admin: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cars, setCars] = useState(getAllCars());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [expandedCarId, setExpandedCarId] = useState<string | null>(null);
  
  const [newCar, setNewCar] = useState<Omit<Car, 'id'>>({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
    description: "",
    imageUrl: "",
    features: [],
    sold: false,
    sellerId: null,
  });
  
  const [newFeature, setNewFeature] = useState("");
  
  if (!user || !user.isAdmin) {
    return <Navigate to="/" />;
  }
  
  const refreshCars = () => {
    setCars(getAllCars());
  };
  
  const handleAddCar = () => {
    try {
      addCar(newCar);
      setIsAddDialogOpen(false);
      setNewCar({
        make: "",
        model: "",
        year: new Date().getFullYear(),
        price: 0,
        description: "",
        imageUrl: "",
        features: [],
        sold: false,
        sellerId: null,
      });
      refreshCars();
    } catch (error) {
      toast.error("Failed to add car");
    }
  };
  
  const handleUpdateCar = () => {
    if (selectedCar) {
      try {
        updateCar(selectedCar);
        setIsEditDialogOpen(false);
        setSelectedCar(null);
        refreshCars();
      } catch (error) {
        toast.error("Failed to update car");
      }
    }
  };
  
  const handleDeleteCar = () => {
    if (selectedCar) {
      try {
        deleteCar(selectedCar.id);
        setIsDeleteDialogOpen(false);
        setSelectedCar(null);
        refreshCars();
      } catch (error) {
        toast.error("Failed to delete car");
      }
    }
  };
  
  const addFeature = () => {
    if (newFeature.trim()) {
      if (isEditDialogOpen && selectedCar) {
        setSelectedCar({
          ...selectedCar,
          features: [...selectedCar.features, newFeature.trim()]
        });
      } else {
        setNewCar({
          ...newCar,
          features: [...newCar.features, newFeature.trim()]
        });
      }
      setNewFeature("");
    }
  };
  
  const removeFeature = (index: number) => {
    if (isEditDialogOpen && selectedCar) {
      const updatedFeatures = [...selectedCar.features];
      updatedFeatures.splice(index, 1);
      setSelectedCar({
        ...selectedCar,
        features: updatedFeatures
      });
    } else {
      const updatedFeatures = [...newCar.features];
      updatedFeatures.splice(index, 1);
      setNewCar({
        ...newCar,
        features: updatedFeatures
      });
    }
  };
  
  const toggleCarExpansion = (carId: string) => {
    setExpandedCarId(expandedCarId === carId ? null : carId);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 page-transition">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={() => navigate("/dashboard")}>Go to User Dashboard</Button>
      </div>
      
      <Tabs defaultValue="cars" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="cars">Manage Cars</TabsTrigger>
          <TabsTrigger value="users">Manage Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cars">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Car Inventory</h2>
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-carblue-500 hover:bg-carblue-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Car
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Car
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Year
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cars.map(car => (
                    <React.Fragment key={car.id}>
                      <tr 
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => toggleCarExpansion(car.id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img className="h-10 w-10 rounded-full object-cover" src={car.imageUrl} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{car.make} {car.model}</div>
                              <div className="text-sm text-gray-500">ID: {car.id.substring(0, 8)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatCurrency(car.price)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{car.year}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            car.sold 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {car.sold ? 'Sold' : 'Available'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCar(car);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Pencil className="h-4 w-4 text-blue-500" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCar(car);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                            {expandedCarId === car.id ? (
                              <ChevronUp className="h-4 w-4 text-gray-400" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                        </td>
                      </tr>
                      {expandedCarId === car.id && (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium mb-2">Description</h4>
                                <p className="text-sm text-gray-600">{car.description}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Features</h4>
                                <div className="flex flex-wrap gap-2">
                                  {car.features.map((feature, idx) => (
                                    <span 
                                      key={idx} 
                                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                                    >
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <CarIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">User Management</h3>
            <p className="text-gray-500 mb-4">
              This feature will be available in a future update.
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Add Car Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Car</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="make">Make</Label>
                <Input
                  id="make"
                  value={newCar.make}
                  onChange={(e) => setNewCar({...newCar, make: e.target.value})}
                  placeholder="e.g. Toyota"
                />
              </div>
              <div>
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={newCar.model}
                  onChange={(e) => setNewCar({...newCar, model: e.target.value})}
                  placeholder="e.g. Camry"
                />
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={newCar.year}
                  onChange={(e) => setNewCar({...newCar, year: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={newCar.price}
                  onChange={(e) => setNewCar({...newCar, price: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={newCar.imageUrl}
                  onChange={(e) => setNewCar({...newCar, imageUrl: e.target.value})}
                  placeholder="https://example.com/car-image.jpg"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newCar.description}
                  onChange={(e) => setNewCar({...newCar, description: e.target.value})}
                  placeholder="Enter car description..."
                  className="h-32"
                />
              </div>
              <div>
                <Label>Features</Label>
                <div className="flex space-x-2 mb-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="e.g. Bluetooth"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addFeature();
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    onClick={addFeature} 
                    variant="outline"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {newCar.features.map((feature, idx) => (
                    <div 
                      key={idx} 
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center"
                    >
                      {feature}
                      <button 
                        type="button"
                        onClick={() => removeFeature(idx)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCar}>
              Add Car
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Car Dialog */}
      <Dialog open={isEditDialogOpen && !!selectedCar} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Car</DialogTitle>
          </DialogHeader>
          {selectedCar && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-make">Make</Label>
                  <Input
                    id="edit-make"
                    value={selectedCar.make}
                    onChange={(e) => setSelectedCar({...selectedCar, make: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-model">Model</Label>
                  <Input
                    id="edit-model"
                    value={selectedCar.model}
                    onChange={(e) => setSelectedCar({...selectedCar, model: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-year">Year</Label>
                  <Input
                    id="edit-year"
                    type="number"
                    value={selectedCar.year}
                    onChange={(e) => setSelectedCar({...selectedCar, year: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-price">Price</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={selectedCar.price}
                    onChange={(e) => setSelectedCar({...selectedCar, price: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-imageUrl">Image URL</Label>
                  <Input
                    id="edit-imageUrl"
                    value={selectedCar.imageUrl}
                    onChange={(e) => setSelectedCar({...selectedCar, imageUrl: e.target.value})}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="edit-sold">Sold Status</Label>
                  <input
                    id="edit-sold"
                    type="checkbox"
                    checked={selectedCar.sold}
                    onChange={(e) => setSelectedCar({...selectedCar, sold: e.target.checked})}
                    className="h-4 w-4 rounded border-gray-300 text-carblue-500 focus:ring-carblue-500"
                  />
                  <span className="text-sm text-gray-500">
                    {selectedCar.sold ? 'Sold' : 'Available'}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={selectedCar.description}
                    onChange={(e) => setSelectedCar({...selectedCar, description: e.target.value})}
                    className="h-32"
                  />
                </div>
                <div>
                  <Label>Features</Label>
                  <div className="flex space-x-2 mb-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="e.g. Bluetooth"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addFeature();
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      onClick={addFeature} 
                      variant="outline"
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCar.features.map((feature, idx) => (
                      <div 
                        key={idx} 
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center"
                      >
                        {feature}
                        <button 
                          type="button"
                          onClick={() => removeFeature(idx)}
                          className="ml-1 text-gray-500 hover:text-gray-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateCar}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Car Dialog */}
      <Dialog open={isDeleteDialogOpen && !!selectedCar} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Car</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete the following car?</p>
            {selectedCar && (
              <div className="bg-gray-50 p-4 rounded-md mt-4">
                <p className="font-semibold">{selectedCar.make} {selectedCar.model} ({selectedCar.year})</p>
                <p className="text-gray-500 text-sm">Price: {formatCurrency(selectedCar.price)}</p>
              </div>
            )}
            <p className="text-red-500 mt-4">This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCar}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
