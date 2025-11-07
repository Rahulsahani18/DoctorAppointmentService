import {Phone, Clock } from "lucide-react";
import { Button } from "./ui/button";
import Logo from "../../Image/logos.jpg"

export default function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            {/* <Hospital className="h-8 w-8 text-blue-600" /> */}
            <div className="flex gap-2">
              <div className="w-50 h-50  flex items-center justify-center"> <img className="" src={Logo} /></div>
           
              
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>+1 234 567 8900</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>24/7 Emergency</span>
            </div>
            <Button variant="outline" size="sm">My Appointments</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
