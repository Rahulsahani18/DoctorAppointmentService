import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import DoctorGrid from "./components/DoctorGrid";
import DoctorProfile from "./components/DoctorProfile";
import AppointmentModal from "./components/AppointmentModal";

export default function App() {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [viewingProfile, setViewingProfile] = useState<any>(null);
  const [searchFilters, setSearchFilters] = useState({
    specialization: "allspecializations",
    searchTerm: "",
  });
  const [scrollToResults, setScrollToResults] = useState(false);

  const handleFilterChange = () => {
    setScrollToResults(true);
    // Reset after scrolling
    setTimeout(() => setScrollToResults(false), 1000);
  };

  // If viewing a doctor profile, show the profile page
  if (viewingProfile) {
    return (
      <>
        <DoctorProfile
          doctor={viewingProfile}
          onBack={() => setViewingProfile(null)}
          onBookAppointment={(doctor) => {
            setSelectedDoctor(doctor);
          }}
        />
        
        {selectedDoctor && (
          <AppointmentModal
            doctor={selectedDoctor}
            onClose={() => setSelectedDoctor(null)}
          />
        )}
      </>
    );
  }

  // Otherwise show the main page with doctor grid
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero 
        filters={searchFilters} 
        setFilters={setSearchFilters} 
        onFilterChange={handleFilterChange}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <DoctorGrid 
          filters={searchFilters}
          onBookAppointment={setSelectedDoctor}
          onViewProfile={setViewingProfile}
          scrollToResults={scrollToResults}
        />
      </div>
      
      {selectedDoctor && (
        <AppointmentModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  );
}