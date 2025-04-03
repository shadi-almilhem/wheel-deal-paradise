
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Car, Search, User, LogOut } from "lucide-react";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and site name */}
        <Link to="/" className="flex items-center space-x-2">
          <Car className="h-6 w-6 text-carblue-500" />
          <span className="text-xl font-bold text-carblue-500">WheelDeal</span>
        </Link>

        {/* Navigation links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-carblue-500 transition">
            Home
          </Link>
          <Link to="/cars" className="text-gray-700 hover:text-carblue-500 transition">
            Browse Cars
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-carblue-500 transition">
            About Us
          </Link>
        </div>

        {/* User actions */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/search")}>
            <Search className="h-5 w-5" />
          </Button>

          {user ? (
            <div className="flex items-center space-x-3">
              {user.isAdmin && (
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/admin")}
                  className="text-sm"
                >
                  Admin
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={() => navigate("/dashboard")}
                className="text-sm"
              >
                <User className="h-4 w-4 mr-1" />
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={logout}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={() => navigate("/login")}
                className="text-sm"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate("/register")}
                className="text-sm bg-carblue-500 hover:bg-carblue-600"
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
