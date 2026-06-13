import { BookOpen, Shield, Users, HeartPulse, Laptop, Globe, GraduationCap, MapPin, Phone, Mail } from "lucide-react";

export const siteConfig = {
  metadata: {
    title: "Student Affairs Office | Patna Institute of Technology",
    description: "Supporting student success beyond the classroom through welfare, innovation, and campus engagement.",
  },
  header: {
    universityName: "Patna Institute of Technology",
    officeName: "Office of Student Affairs",
    logoText: "PIT Student Affairs",
  },
  hero: {
    headline: "Empowering Every Student Journey.",
    subheadline: "Fostering excellence, innovation, and well-being. We provide the resources and support you need to thrive both inside and outside the classroom.",
    primaryCta: { label: "Explore Resources", href: "#resources" },
    secondaryCta: { label: "Campus Life", href: "#campus-life" },
    stats: [
      { label: "Active Student Clubs", value: "45+" },
      { label: "Welfare Programs", value: "12" },
      { label: "Annual Events", value: "150+" },
    ],
  },
  about: {
    title: "Student-Centered Philosophy",
    content: "The Office of Student Affairs is dedicated to creating an inclusive, dynamic, and supportive environment. We believe in nurturing holistic development, ensuring every student has access to mentorship, wellness resources, and opportunities to lead.",
    milestones: [
      { year: "2023", title: "Launch of Mental Health & Wellness Portal" },
      { year: "2024", title: "Establishment of the IoT & Maker Labs" },
      { year: "2025", title: "Integration of 24/7 Digital Grievance System" },
    ]
  },
  visionMission: {
    vision: "To be the premier catalyst for student empowerment, creating leaders equipped for the challenges of tomorrow through a rich, supportive campus ecosystem.",
    mission: "To provide comprehensive welfare, foster diverse communities, and deliver robust support systems that ensure physical, mental, and professional growth for all students.",
  },
  responsibilities: [
    { title: "Student Welfare & Counseling", description: "Providing confidential psychological support and academic counseling.", icon: HeartPulse },
    { title: "Campus Engagement", description: "Overseeing student clubs, sports, and cultural festivals.", icon: Users },
    { title: "Career & Leadership", description: "Connecting students with internships, alumni networks, and leadership seminars.", icon: GraduationCap },
    { title: "Diversity & Inclusion", description: "Ensuring an equitable campus environment for all demographics.", icon: Globe },
  ],
  initiatives: [
    {
      year: "2025",
      title: "Anantavyomah Hackathon",
      description: "Our flagship annual technology and coding summit bringing together brilliant minds to solve real-world problems.",
      impact: "500+ Participants"
    },
    {
      year: "2026",
      title: "AlgoArena & Quant Finance Hub",
      description: "A specialized initiative providing resources and training for students competing in algorithmic trading and quantitative finance.",
      impact: "Partnered with top tier firms"
    },
    {
      year: "2026",
      title: "Smart Campus Automation Lab",
      description: "Empowering engineering students with ESP32, Arduino, and IoT hardware to build home automation and campus infrastructure projects.",
      impact: "30+ Live Projects"
    }
  ],
  team: [
    { name: "Dr. Alok Sharma", role: "Dean of Student Affairs", email: "alok.s@pit.edu", image: "/team/dean.jpg" },
    { name: "Priya Menon", role: "Director of Student Counseling", email: "p.menon@pit.edu", image: "/team/counselor.jpg" },
    { name: "Rahul Verma", role: "Head of Campus Life", email: "r.verma@pit.edu", image: "/team/campus.jpg" },
  ],
  contact: {
    address: "Block C, Main Administrative Building, Patna Institute of Technology, Bihar, India",
    phone: "+91 800 123 4567",
    email: "studentaffairs@pit.edu",
    hours: "Monday - Friday, 9:00 AM - 5:00 PM",
  },
  faqs: [
    { question: "How do I book a counseling session?", answer: "Students can book a confidential session through the Student Portal or walk into the welfare center during office hours." },
    { question: "How do I register a new student club?", answer: "Submit a proposal including your club's vision and a faculty sponsor to the Campus Life office." },
    { question: "Where can I find emergency assistance?", answer: "Call the 24/7 Campus Security hotline at +91 800 999 0000 or use the emergency SOS feature in the campus app." },
  ]
};