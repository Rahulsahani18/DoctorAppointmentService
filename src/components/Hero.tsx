import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroProps {
  filters: {
    specialization: string;
    searchTerm: string;
  };
  setFilters: (filters: any) => void;
  onFilterChange: () => void;
}

export default function Hero({ filters, setFilters, onFilterChange }: HeroProps) {
  const specializations = [
    "All Specializations",
    "Cardiology",
    "Dermatology",
    "Gynecology",
    "Neurology",
    "Oncology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, searchTerm: e.target.value });
    // Scroll to results after a short delay to allow filtering
    setTimeout(() => {
      onFilterChange();
    }, 100);
  };

  const handleSpecializationChange = (value: string) => {
    setFilters({ ...filters, specialization: value });
    // Scroll to results after a short delay to allow filtering
    setTimeout(() => {
      onFilterChange();
    }, 100);
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl mb-4">Find & Book Appointments with Doctors</h1>
            <p className="text-xl text-blue-100 mb-8">
              Choose from our experienced doctors and book your appointment online
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-lg p-4 shadow-lg mb-8">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search doctors by name..."
                    className="pl-10 border-gray-300"
                    value={filters.searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <Select
                  value={filters.specialization}
                  onValueChange={handleSpecializationChange}
                >
                  <SelectTrigger className="w-full md:w-[250px] border-gray-300">
                    <SelectValue placeholder="Select Specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations.map((spec) => (
                      <SelectItem key={spec} value={spec.toLowerCase().replace(/\s+/g, '')}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-start gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-3xl">156+</p>
                <p className="text-sm text-blue-100">Doctors</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-3xl">24/7</p>
                <p className="text-sm text-blue-100">Emergency</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-3xl">50+</p>
                <p className="text-sm text-blue-100">Specializations</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden lg:flex justify-end items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-3xl"></div>
              <ImageWithFallback
                src="https://vindhya.omsoftsolution.net.in/wp-content/uploads/2025/10/image-2.jpg"
                alt="Female Doctor"
                className="relative rounded-2xl shadow-2xl object-cover w-[500px] h-[600px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}