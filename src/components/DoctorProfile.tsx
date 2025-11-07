import { ArrowLeft, Calendar, MapPin, Star, Award, Clock, GraduationCap, Briefcase, Phone, Mail, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface DoctorProfileProps {
  doctor: any;
  onBack: () => void;
  onBookAppointment: (doctor: any) => void;
}

export default function DoctorProfile({ doctor, onBack, onBookAppointment }: DoctorProfileProps) {
  const reviews = [
    {
      id: 1,
      name: "John Smith",
      rating: 5,
      date: "2 weeks ago",
      comment: "Excellent doctor! Very thorough and patient. Highly recommend."
    },
    {
      id: 2,
      name: "Sarah Williams",
      rating: 5,
      date: "1 month ago",
      comment: "Dr. " + doctor.name.split(" ")[1] + " took the time to explain everything clearly. Great experience!"
    },
    {
      id: 3,
      name: "Michael Johnson",
      rating: 4,
      date: "2 months ago",
      comment: "Professional and knowledgeable. Wait time was a bit long but worth it."
    }
  ];

  const education = [
    { degree: doctor.qualification.split(",")[0] || "MBBS", institution: "Harvard Medical School", year: "2005" },
    { degree: doctor.qualification.split(",")[1] || "Specialization", institution: "Johns Hopkins University", year: "2008" }
  ];

  const specialties = [
    "Adult " + doctor.specialization,
    "Preventive Care",
    "Diagnosis & Treatment",
    "Patient Counseling"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Doctors
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Doctor Info Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <Avatar className="h-32 w-32">
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-3xl">
                      {doctor.name.split(" ").map((n: string) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-3xl mb-2">{doctor.name}</h1>
                        <Badge className="mb-3">{doctor.specialization}</Badge>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                            <span className="text-lg">{doctor.rating}</span>
                            <span className="text-gray-500 text-sm">({doctor.reviews} reviews)</span>
                          </div>
                          <Separator orientation="vertical" className="h-6" />
                          <div className="flex items-center gap-1 text-gray-600">
                            <Award className="h-5 w-5" />
                            <span>{doctor.experience} experience</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{doctor.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{doctor.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{doctor.availability}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>+1 (555) 123-4567</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Section */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-6">
                <Card>
                  <CardHeader>
                    <h3>About Dr. {doctor.name.split(" ")[1]}</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">
                      Dr. {doctor.name.split(" ")[1]} is a highly experienced {doctor.specialization} specialist with {doctor.experience} of practice. 
                      Known for providing compassionate care and utilizing the latest medical techniques to ensure the best outcomes for patients.
                    </p>
                    
                    <div>
                      <h4 className="mb-3">Specialties</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {specialties.map((specialty, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{specialty}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-3">Languages</h4>
                      <div className="flex gap-2">
                        <Badge variant="outline">English</Badge>
                        <Badge variant="outline">Spanish</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h3>Patient Reviews</h3>
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        <span className="text-xl">{doctor.rating}</span>
                        <span className="text-gray-500">({doctor.reviews} reviews)</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>
                                {review.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm">{review.name}</p>
                              <p className="text-xs text-gray-500">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="mt-6">
                <Card>
                  <CardHeader>
                    <h3>Education & Qualifications</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {education.map((edu, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="bg-blue-100 rounded-full p-3 h-12 w-12 flex items-center justify-center">
                          <GraduationCap className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-lg">{edu.degree}</h4>
                          <p className="text-sm text-gray-600">{edu.institution}</p>
                          <p className="text-xs text-gray-500">{edu.year}</p>
                        </div>
                      </div>
                    ))}

                    <Separator className="my-4" />

                    <div>
                      <h4 className="mb-3">Certifications</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Board Certified in {doctor.specialization}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Advanced Cardiac Life Support (ACLS)</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <h3>Book Appointment</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Consultation Fee</p>
                  <p className="text-2xl text-blue-600">$150</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm">Available Times</h4>
                  <p className="text-sm text-gray-600">{doctor.availability}</p>
                  <p className="text-sm text-gray-600">{doctor.time}</p>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => onBookAppointment(doctor)}
                >
                  Book Appointment
                </Button>

                <div className="pt-4 border-t space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>contact@hospital.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
