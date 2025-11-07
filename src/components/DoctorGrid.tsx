import { Calendar, MapPin, Star, Award } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useEffect, useRef } from "react";

interface DoctorGridProps {
  filters: {
    specialization: string;
    searchTerm: string;
  };
  onBookAppointment: (doctor: any) => void;
  onViewProfile: (doctor: any) => void;
  scrollToResults: boolean;
}

export default function DoctorGrid({ filters, onBookAppointment, onViewProfile, scrollToResults }: DoctorGridProps) {
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Cardiology",
      experience: "15 years",
      rating: 4.8,
      reviews: 245,
      location: "Main Building, 3rd Floor",
      availability: "Mon, Wed, Fri",
      time: "9:00 AM - 5:00 PM",
      qualification: "MD, FACC",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialization: "Orthopedics",
      experience: "12 years",
      rating: 4.9,
      reviews: 312,
      location: "Surgery Wing, 2nd Floor",
      availability: "Mon - Sat",
      time: "10:00 AM - 6:00 PM",
      qualification: "MBBS, MS (Ortho)",
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialization: "Pediatrics",
      experience: "10 years",
      rating: 4.7,
      reviews: 198,
      location: "Children's Ward, 1st Floor",
      availability: "Tue, Thu, Sat",
      time: "8:00 AM - 4:00 PM",
      qualification: "MD, FAAP",
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialization: "Neurology",
      experience: "18 years",
      rating: 4.9,
      reviews: 428,
      location: "Neuro Center, 4th Floor",
      availability: "Mon - Fri",
      time: "9:00 AM - 5:00 PM",
      qualification: "MD, DM (Neuro)",
    },
    {
      id: 5,
      name: "Dr. Maria Garcia",
      specialization: "Gynecology",
      experience: "14 years",
      rating: 4.8,
      reviews: 356,
      location: "Women's Health, 2nd Floor",
      availability: "Mon, Wed, Fri",
      time: "10:00 AM - 6:00 PM",
      qualification: "MD, FACOG",
    },
    {
      id: 6,
      name: "Dr. David Lee",
      specialization: "Dermatology",
      experience: "8 years",
      rating: 4.6,
      reviews: 167,
      location: "Skin Care Center, 1st Floor",
      availability: "Tue - Sat",
      time: "11:00 AM - 7:00 PM",
      qualification: "MD, DDV",
    },
    {
      id: 7,
      name: "Dr. Lisa Anderson",
      specialization: "Oncology",
      experience: "16 years",
      rating: 4.9,
      reviews: 289,
      location: "Cancer Care Unit, 5th Floor",
      availability: "Mon - Fri",
      time: "9:00 AM - 4:00 PM",
      qualification: "MD, DM (Oncology)",
    },
    {
      id: 8,
      name: "Dr. Robert Brown",
      specialization: "Psychiatry",
      experience: "11 years",
      rating: 4.7,
      reviews: 234,
      location: "Mental Health Center, 3rd Floor",
      availability: "Mon - Sat",
      time: "2:00 PM - 8:00 PM",
      qualification: "MD, MRCPsych",
    },
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpecialization =
      filters.specialization === "allspecializations" ||
      doctor.specialization.toLowerCase() === filters.specialization;
    const matchesSearch =
      filters.searchTerm === "" ||
      doctor.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(filters.searchTerm.toLowerCase());

    return matchesSpecialization && matchesSearch;
  });

  // Scroll to results when filters change
  useEffect(() => {
    if (scrollToResults && resultsRef.current) {
      const element = resultsRef.current;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 100; // 100px offset from top

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, [scrollToResults, filteredDoctors]);

  return (
    <div ref={resultsRef} id="doctors-results">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Available Doctors ({filteredDoctors.length})
        </h2>
        {(filters.searchTerm || filters.specialization !== "allspecializations") && (
          <p className="text-gray-600 mt-2">
            {filters.searchTerm && `Search: "${filters.searchTerm}"`}
            {filters.searchTerm && filters.specialization !== "allspecializations" && " • "}
            {filters.specialization !== "allspecializations" && 
              `Specialization: ${filters.specialization.charAt(0).toUpperCase() + filters.specialization.slice(1)}`
            }
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                    {doctor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{doctor.name}</h3>
                  <Badge variant="secondary" className="mt-1">
                    {doctor.specialization}
                  </Badge>
                  <p className="text-sm text-gray-500 mt-2">{doctor.qualification}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Award className="h-4 w-4 text-gray-500" />
                  <span>{doctor.experience} experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span>
                    {doctor.rating} ({doctor.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{doctor.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{doctor.availability}</span>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-500">Available: {doctor.time}</p>
                </div>
              </div>
              <Button
                className="w-full mt-4"
                onClick={() => onBookAppointment(doctor)}
              >
                Book Appointment
              </Button>
              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => onViewProfile(doctor)}
              >
                View Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No doctors found matching your criteria</p>
          <p className="text-gray-400 mt-2">Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  );
}