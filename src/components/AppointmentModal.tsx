import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { toast } from "sonner";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Star,
  BadgeCheck,
  ArrowLeft
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format } from "date-fns";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  location: string;
  experience: string;
  rating: number;
  reviews: number;
  fee: string;
  department?: string;
}

interface AppointmentModalProps {
  doctor: Doctor;
  onClose: () => void;
}

export default function AppointmentModal({ doctor, onClose }: AppointmentModalProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    phone: "",
    timeSlot: "",
    reason: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.patientName || !formData.email || !formData.phone || !formData.timeSlot || !date) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success("Appointment booked successfully! You will receive a confirmation email shortly.");
    onClose();
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Sidebar - Doctor Info */}
          <div className="lg:col-span-4 bg-blue-50 p-6 border-r">
            <Button 
              variant="ghost" 
              onClick={onClose}
              className="p-0 h-auto font-normal text-blue-600 hover:text-blue-800 hover:bg-transparent mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to doctors
            </Button>

            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                {doctor.name.split(' ').map(n => n[0]).join('')}
              </div>
              
              <h2 className="text-xl font-bold text-gray-900">{doctor.name}</h2>
              <p className="text-blue-600 font-medium">{doctor.specialization}</p>
              
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-sm">{doctor.rating}</span>
                </div>
                <span className="text-gray-500 text-sm">({doctor.reviews} reviews)</span>
                <BadgeCheck className="h-4 w-4 text-blue-500" />
              </div>
            </div>

            <Card className="bg-white shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">Location</p>
                      <p className="text-sm text-gray-600">{doctor.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <BadgeCheck className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">Experience</p>
                      <p className="text-sm text-gray-600">{doctor.experience}</p>
                    </div>
                  </div>

                  {doctor.department && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <svg className="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">Department</p>
                        <p className="text-sm text-gray-600">{doctor.department}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 p-4 bg-white rounded-lg border shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Consultation Fee</span>
                <span className="text-lg font-bold text-blue-600">{doctor.fee}</span>
              </div>
              <p className="text-xs text-gray-500">Payment due at time of appointment</p>
            </div>
          </div>

          {/* Right Side - Booking Form */}
          <div className="lg:col-span-8 p-6">
            <DialogHeader className="text-left pb-6">
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Book Appointment
              </DialogTitle>
              <p className="text-gray-600 mt-2">
                Schedule your consultation with {doctor.name}
              </p>
            </DialogHeader>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientName" className="text-sm font-medium text-gray-700">
                        <User className="h-4 w-4 inline mr-2" />
                        Full Name *
                      </Label>
                      <Input
                        id="patientName"
                        placeholder="Enter your full name"
                        value={formData.patientName}
                        onChange={(e) => handleInputChange('patientName', e.target.value)}
                        className="h-12"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        <Mail className="h-4 w-4 inline mr-2" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="h-12"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        <Phone className="h-4 w-4 inline mr-2" />
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 234 567 8900"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="h-12"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Date and Time Selection */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Date Selection */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                      <CalendarIcon className="h-4 w-4 inline mr-2" />
                      Select Date *
                    </Label>
                    <div className="border rounded-lg p-4 bg-white">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date() || date.getDay() === 0}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                      <Clock className="h-4 w-4 inline mr-2" />
                      Select Time Slot *
                    </Label>
                    <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto p-1">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot}
                          type="button"
                          variant={formData.timeSlot === slot ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleInputChange('timeSlot', slot)}
                          className="h-12 justify-center font-normal"
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reason for Visit */}
                <div>
                  <Label htmlFor="reason" className="text-sm font-medium text-gray-700 mb-3 block">
                    Reason for Visit
                  </Label>
                  <Textarea
                    id="reason"
                    placeholder="Brief description of your health concern, symptoms, or reason for consultation..."
                    rows={4}
                    value={formData.reason}
                    onChange={(e) => handleInputChange('reason', e.target.value)}
                    className="resize-none"
                  />
                </div>

                {/* Appointment Summary */}
                <Card className="bg-gray-50 border">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Appointment Summary</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Doctor:</span>
                        <p className="font-medium">{doctor.name}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Specialization:</span>
                        <p>{doctor.specialization}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Date:</span>
                        <p>{date ? format(date, 'MMMM dd, yyyy') : 'Not selected'}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Time:</span>
                        <p>{formData.timeSlot || 'Not selected'}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-600">Location:</span>
                        <p>{doctor.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <DialogFooter className="mt-8 gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !date || !formData.timeSlot}
                  className="flex-1 h-12 text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Booking Appointment...
                    </>
                  ) : (
                    `Confirm Appointment - ${doctor.fee}`
                  )}
                </Button>
              </DialogFooter>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}