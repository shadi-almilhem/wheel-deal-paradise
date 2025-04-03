
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShieldCheck, Award, ThumbsUp, Truck, Clock, Users } from "lucide-react";

const About: React.FC = () => {
  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="bg-carblue-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About WheelDeal</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're on a mission to make car buying simple, fair, and enjoyable for everyone.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                WheelDeal was founded in 2020 with a simple idea: car buying shouldn't be complicated or stressful. We wanted to create a transparent platform where customers could find their perfect vehicle without the typical hassles of car shopping.
              </p>
              <p className="text-gray-700 mb-4">
                What started as a small team of automotive enthusiasts has grown into a trusted marketplace connecting buyers with quality vehicles across the country. Our commitment to transparency, quality, and customer satisfaction remains at the heart of everything we do.
              </p>
              <p className="text-gray-700">
                Today, we help thousands of customers find their dream cars with confidence and peace of mind.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80" 
                alt="Modern car on road" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-carblue-100 text-carblue-500 rounded-full mb-6">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trust & Transparency</h3>
              <p className="text-gray-600">
                We believe in complete transparency about our vehicles and pricing. No hidden fees, no surprises – just honest car buying.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-carblue-100 text-carblue-500 rounded-full mb-6">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Assurance</h3>
              <p className="text-gray-600">
                Every vehicle in our inventory undergoes a thorough inspection process to ensure it meets our high standards of quality and reliability.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-carblue-100 text-carblue-500 rounded-full mb-6">
                <ThumbsUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customer Satisfaction</h3>
              <p className="text-gray-600">
                Our customers' satisfaction is our top priority. We're committed to providing exceptional service at every step of your car buying journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose WheelDeal</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-carblue-100 text-carblue-500 p-3 rounded-full">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">
                  Get your new car delivered quickly with our efficient logistics network, ensuring a smooth and timely delivery process.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-carblue-100 text-carblue-500 p-3 rounded-full">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
                <p className="text-gray-600">
                  Our secure platform ensures that your personal information and payment details are protected throughout your car buying experience.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-carblue-100 text-carblue-500 p-3 rounded-full">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">
                  Our customer support team is available around the clock to assist you with any questions or concerns you may have.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-carblue-100 text-carblue-500 p-3 rounded-full">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Expert Advice</h3>
                <p className="text-gray-600">
                  Our team of automotive experts is always ready to provide guidance and advice to help you make an informed decision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-carblue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Car?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Browse our extensive collection of quality vehicles and start your car buying journey today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
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
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
