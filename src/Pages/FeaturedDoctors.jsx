import "./Home.css";
import { Heart, MapPin, Clock } from "lucide-react";
import React, { useRef } from 'react';
import AbhishekBansal from '../assets/Dr. Abhishek Bansal.png'
import SanjayRai from '../assets/Dr. Sanjay Rai.jpg'

import {
  FaStar,
  FaCalendarCheck,

  FaHeartbeat,
} from "react-icons/fa";
import {
  FaHeart,
  FaBrain,
  FaBaby,
  FaUserMd,
  FaClinicMedical,
  FaCommentMedical,
  FaPills,
  FaFlask,
  FaHome,
  FaHospital,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
const DoctorCard = ({ doctor }) => {
  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="doctor-card">
        <div className="doctor-image-wrapper">
          <img src={doctor.image} alt={doctor.name} className="doctor-image" />
          <div className="rating-badge">
            <span className="star">★</span> {doctor.rating}
          </div>
          <button className="favorite-btn">
            <Heart size={18} />
          </button>
        </div>

        <div className="doctor-info">
          <div className="specialty-status">
            <span className="specialty">{doctor.specialty}</span>
            <span className="status-available">● Available</span>
          </div>

          <h5 className="doctor-name">{doctor.name}</h5>

          <div className="doctor-details">
            <MapPin size={14} className="icon" />
            <span>{doctor.location}</span>
          </div>

          <div className="doctor-footer">
            <div>
              <p className="consultation-label">Consultation Fees</p>
              <p className="consultation-fee">${doctor.fee}</p>
            </div>
            <button className="btn-book ">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedDoctors = () => {

  const trackRef2 = useRef(null);

  const services = [
    { icon: <FaCalendarCheck />, title: "Book Appointment",  color: "#822bd4" },
    { icon: <FaCommentMedical />, title: "Talk to Doctors", url:"all-doctors", color: "#0e82fd" },
    { icon: <FaHospital />, title: "Hospitals & Clinics", color: "#dd2590" },
    { icon: <FaHeartbeat />, title: "Healthcare", color: "#06aed4" },
    { icon: <FaPills />, title: "Medicine & Supplies", color: "#6938ef" },
    { icon: <FaFlask />, title: "Lab Testing", color: "#e04f16" },
    { icon: <FaHome />, title: "Home Care", color: "#0e9384" },
  ];
  const servicesRow2 = [
    { id: 1, name: "Health Care Services", icon: <FaHospital size={24} /> },
    { id: 2, name: "Talk to Doctors", icon: <FaUserMd size={24} /> },
    { id: 3, name: "Home Care Services", icon: <FaHome size={24} /> },
    {
      id: 4,
      name: "Multi Speciality Treatments & Doctors",
      icon: <FaClinicMedical size={24} />,
    },
    { id: 5, name: "Lab Testing Services", icon: <FaFlask size={24} /> },
    { id: 6, name: "Medicines & Supplies", icon: <FaPills size={24} /> },
    { id: 7, name: "Hospitals & Clinics", icon: <FaHospital size={24} /> },
    { id: 8, name: "Health Care", icon: <FaHeart size={24} /> },
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Sanjay Rai",
      specialty: "Hematology Oncology",
      rating: 5.0,
      location: "Minneapolis, MN",
      duration: "30 Min",
      fee: 650,
      image: SanjayRai,
    },
    {
      id: 2,
      name: " Dr. Abhishek Bansal",
      specialty: "Hematology Oncology",
      rating: 4.8,
      location: "Ogden, IA",
      duration: "60 Min",
      fee: 400,
      image: AbhishekBansal,
    },
    {
      id: 3,
      name: "Dr. Harold Bryant",
      specialty: "Neurologist",
      rating: 4.8,
      location: "Winona, MS",
      duration: "30 Min",
      fee: 500,
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    },
    {
      id: 4,
      name: "Dr. Sandra Jones",
      specialty: "Cardiologist",
      rating: 4.8,
      location: "Beckley, WV",
      duration: "30 Min",
      fee: 550,
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    },
  ];

  const handleViewAll = () => {
    console.log("Redirecting to all doctors page...");
  };

  return (
    <div className="featured-doctors-section">


      <div className="container">
        <div className="section-header">
          <div className="featured-badge">✦ Featured Doctors ✦</div>
          <h2 className="section-title">Our Highlighted Doctors</h2>
        </div>

        <div className="row">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        <div className="view-all-container">
          <Link to="all-doctors">
          <button className="btn-view-all" onClick={handleViewAll}>
            View All Doctors →
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedDoctors;
