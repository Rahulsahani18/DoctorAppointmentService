import React, { useState } from 'react';

import '../Components/AppointmentBooking.css';

const AppointmentBooking = () => {
  // State for current step
  const [currentStep, setCurrentStep] = useState(1);
  
  // State for selected options
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedAppointmentType, setSelectedAppointmentType] = useState('');
  const [selectedClinic, setSelectedClinic] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState('');
  
  // State for form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    patient: '',
    symptoms: '',
    reason: '',
    attachment: null
  });

  // Mock data
  const specialties = [
    { id: 1, name: 'Cardiology' },
    { id: 2, name: 'Psychology' },
    { id: 3, name: 'Dermatology' }
  ];

  const services = [
    { id: 1, name: 'Echocardiograms', price: 200, duration: '30 mins' },
    { id: 2, name: 'Stress tests', price: 310, duration: '45 mins' },
    { id: 3, name: 'Heart Catheterization', price: 150, duration: '60 mins' }
  ];

  const appointmentTypes = [
    { id: 1, name: 'Clinic' },
    { id: 2, name: 'Video Call' },
    { id: 3, name: 'Audio Call' },
    { id: 4, name: 'Chat' },
    { id: 5, name: 'Home Visit' }
  ];

  const clinics = [
    { id: 1, name: 'AllCare Family Medicine', address: '3343 Private Lane, Valdosta', distance: '500 Meters' },
    { id: 2, name: 'Vitalplus Clinic', address: '4223 Pleasant Hill Road, Miami FL 33169', distance: '12 KM' },
    { id: 3, name: 'Wellness Path Chiropractic', address: '418 Patton Lane, Garner NC 27529', distance: '16 KM' }
  ];

  const timeSlots = [
    { id: 1, date: '15 Oct', time: '10:00 - 11:00 AM' },
    { id: 2, date: '16 Oct', time: '11:00 - 12:00 PM' },
    { id: 3, date: '17 Oct', time: '2:00 - 3:00 PM' }
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle file attachment
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      attachment: e.target.files[0]
    });
  };

  // Navigation functions
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Render step indicators
  const renderStepIndicators = () => {
    const steps = ['Specialty', 'Appointment Type', 'Date & Time', 'Basic Information', 'Payment', 'Confirmation'];
    
    return (
      <div className="step-indicators d-flex justify-content-between mb-4">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`step ${index + 1 === currentStep ? 'active' : ''} ${index + 1 < currentStep ? 'completed' : ''}`}
          >
            <div className="step-circle">{index + 1}</div>
            <div className="step-label">{step}</div>
          </div>
        ))}
      </div>
    );
  };

  // Step 1: Select Specialty
  const renderStep1 = () => {
    return (
      <div className="step-content">
        <h3 className="mb-4">Select Specialty</h3>
        <div className="row">
          {specialties.map(specialty => (
            <div key={specialty.id} className="col-md-4 mb-3">
              <div 
                className={`specialty-card card ${selectedSpecialty === specialty.name ? 'selected' : ''}`}
                onClick={() => setSelectedSpecialty(specialty.name)}
              >
                <div className="card-body text-center">
                  <h5 className="card-title">{specialty.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {selectedSpecialty && (
          <div className="services-section mt-4">
            <h4 className="mb-3">Services</h4>
            <div className="row">
              {services.map(service => (
                <div key={service.id} className="col-md-6 mb-3">
                  <div 
                    className={`service-card card ${selectedService === service.name ? 'selected' : ''}`}
                    onClick={() => setSelectedService(service.name)}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{service.name}</h5>
                        <span className="price">${service.price}</span>
                      </div>
                      <p className="card-text">{service.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="navigation-buttons mt-4">
          <button 
            className="btn btn-outline-secondary me-2" 
            disabled
          >
            Back
          </button>
          <button 
            className="btn btn-primary" 
            onClick={nextStep}
            disabled={!selectedService}
          >
            Select Appointment Type 
          </button>
        </div>
      </div>
    );
  };

  // Step 2: Select Appointment Type
  const renderStep2 = () => {
    return (
      <div className="step-content">
        <h3 className="mb-4">Select Appointment Type</h3>
        <div className="row">
          {appointmentTypes.map(type => (
            <div key={type.id} className="col-md-4 mb-3">
              <div 
                className={`appointment-type-card card ${selectedAppointmentType === type.name ? 'selected' : ''}`}
                onClick={() => setSelectedAppointmentType(type.name)}
              >
                <div className="card-body text-center">
                  <h5 className="card-title">{type.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {selectedAppointmentType === 'Clinic' && (
          <div className="clinics-section mt-4">
            <h4 className="mb-3">Select Clinics</h4>
            <div className="row">
              {clinics.map(clinic => (
                <div key={clinic.id} className="col-12 mb-3">
                  <div 
                    className={`clinic-card card ${selectedClinic === clinic.name ? 'selected' : ''}`}
                    onClick={() => setSelectedClinic(clinic.name)}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{clinic.name}</h5>
                      <p className="card-text mb-1">{clinic.address}</p>
                      <small className="text-muted">{clinic.distance}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="navigation-buttons mt-4">
          <button 
            className="btn btn-outline-secondary me-2" 
            onClick={prevStep}
          >
            Back
          </button>
          <button 
            className="btn btn-primary" 
            onClick={nextStep}
            disabled={!selectedAppointmentType || (selectedAppointmentType === 'Clinic' && !selectedClinic)}
          >
            Select Date & Time 
          </button>
        </div>
      </div>
    );
  };

  // Step 3: Select Date & Time
  const renderStep3 = () => {
    return (
      <div className="step-content">
        <h3 className="mb-4">Select Date & Time</h3>
        <div className="row">
          {timeSlots.map(slot => (
            <div key={slot.id} className="col-md-6 mb-3">
              <div 
                className={`time-slot-card card ${selectedDateTime === `${slot.date} ${slot.time}` ? 'selected' : ''}`}
                onClick={() => setSelectedDateTime(`${slot.date} ${slot.time}`)}
              >
                <div className="card-body text-center">
                  <h5 className="card-title">{slot.date}</h5>
                  <p className="card-text">{slot.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="navigation-buttons mt-4">
          <button 
            className="btn btn-outline-secondary me-2" 
            onClick={prevStep}
          >
            Back
          </button>
          <button 
            className="btn btn-primary" 
            onClick={nextStep}
            disabled={!selectedDateTime}
          >
            Continue to Basic Information 
          </button>
        </div>
      </div>
    );
  };

  // Step 4: Basic Information
  const renderStep4 = () => {
    return (
      <div className="step-content">
        <div className="doctor-info mb-4">
          <h2>Dr. Michael Brown</h2>
          <p className="specialty">Psychologist</p>
          <p className="address">© 5th Street - 1011 W 5th St, Suite 120, Austin, TX 78703</p>
        </div>
        
        <div className="booking-info mb-4">
          <h4>Booking Info</h4>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Service</th>
                  <th>Date & Time</th>
                  <th>Appointment type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cardiology (30 Mins)</td>
                  <td>{selectedService}</td>
                  <td>{selectedDateTime}</td>
                  <td>{selectedAppointmentType} ({selectedClinic})</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <hr className="my-4" />
        
        <div className="basic-info-form">
          <h4 className="mb-3">Basic Information</h4>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">First Name</label>
              <input 
                type="text" 
                className="form-control" 
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Last Name</label>
              <input 
                type="text" 
                className="form-control" 
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Phone Number</label>
              <input 
                type="tel" 
                className="form-control" 
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-control" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="mb-3">
            <label className="form-label">Select Patient</label>
            <select 
              className="form-select" 
              name="patient"
              value={formData.patient}
              onChange={handleInputChange}
            >
              <option value="">Select Patient</option>
              <option value="self">Self</option>
              <option value="family-member">Family Member</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="mb-3">
            <label className="form-label">Symptoms</label>
            <input 
              type="text" 
              className="form-control" 
              name="symptoms"
              value={formData.symptoms}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Attachment</label>
            <div className="input-group">
              <input 
                type="file" 
                className="form-control" 
                onChange={handleFileChange}
              />
            </div>
            <small className="text-muted">No file chosen</small>
          </div>
          
          <div className="mb-4">
            <label className="form-label">Reason for Visit</label>
            <textarea 
              className="form-control" 
              rows="3"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
        
        <div className="navigation-buttons mt-4">
          <button 
            className="btn btn-outline-secondary me-2" 
            onClick={prevStep}
          >
            Back
          </button>
          <button 
            className="btn btn-primary" 
            onClick={nextStep}
            disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phoneNumber}
          >
            Select Payment 
          </button>
        </div>
      </div>
    );
  };

  // Step 5: Payment
  const renderStep5 = () => {
    return (
      <div className="step-content">
        <h3 className="mb-4">Payment</h3>
        <p>Payment step would go here with payment form and options.</p>
        
        <div className="navigation-buttons mt-4">
          <button 
            className="btn btn-outline-secondary me-2" 
            onClick={prevStep}
          >
            Back
          </button>
          <button 
            className="btn btn-primary" 
            onClick={nextStep}
          >
            Confirm Booking 
          </button>
        </div>
      </div>
    );
  };

  // Step 6: Confirmation
  const renderStep6 = () => {
    return (
      <div className="step-content text-center">
        <div className="confirmation-icon mb-4">
          <i className="fas fa-check-circle"></i>
        </div>
        <h3 className="mb-3">Appointment Confirmed!</h3>
        <p className="mb-4">Your appointment has been successfully booked.</p>
        
        <div className="appointment-details mb-4">
          <h5>Appointment Details</h5>
          <p><strong>Doctor:</strong> Dr. Michael Brown</p>
          <p><strong>Service:</strong> {selectedService}</p>
          <p><strong>Date & Time:</strong> {selectedDateTime}</p>
          <p><strong>Appointment Type:</strong> {selectedAppointmentType}</p>
          {selectedClinic && <p><strong>Clinic:</strong> {selectedClinic}</p>}
        </div>
        
        <button 
          className="btn btn-primary" 
          onClick={() => {
            setCurrentStep(1);
            // Reset all selections
            setSelectedSpecialty('');
            setSelectedService('');
            setSelectedAppointmentType('');
            setSelectedClinic('');
            setSelectedDateTime('');
            setFormData({
              firstName: '',
              lastName: '',
              phoneNumber: '',
              email: '',
              patient: '',
              symptoms: '',
              reason: '',
              attachment: null
            });
          }}
        >
          Book Another Appointment
        </button>
      </div>
    );
  };

  return (
    <div className="appointment-booking-container container my-5">
      <div className="booking-card card shadow">
        <div className="card-body p-4">
          <div className="doctor-header mb-4">
            <h1 className="doctor-name">Dr. Michael Brown</h1>
            <p className="doctor-specialty">Psychologist</p>
            <p className="doctor-address">© 5th Street - 1011 W 5th St, Suite 120, Austin, TX 78703</p>
          </div>
          
          {renderStepIndicators()}
          
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
          {currentStep === 6 && renderStep6()}
        </div>
      </div>
      
      <footer className="text-center mt-4 text-muted">
        <p>Copyright © 2025. All Rights Reserved, Doccure</p>
      </footer>
    </div>
  );
};

export default AppointmentBooking;