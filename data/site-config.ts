// data/site-config.ts

export const siteConfig = {
  metadata: {
    title: "Student Affairs Office | IIT Patna",
    description: "The official portal for student welfare, Gymkhana, and campus life at the Indian Institute of Technology Patna.",
  },

  institution: {
    name: "Indian Institute of Technology Patna",
    office: "Student Affairs Office",
  },

  contact: {
    email: "dosa@iitp.ac.in",
    studentEmail: "gymkhana@iitp.ac.in",
    phone: "+91-612-255-2001",
    emergency: "+91-612-255-2999",
    address: "Office of Student Affairs, Admin Block, IIT Patna, Bihta, Bihar 801106"
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Vision & Mission", href: "/vision-mission" },
    { label: "Administration Team", href: "/team" },
    { label: "Welfare & Support", href: "/welfare" },
    { label: "Campus Life", href: "/campus-life" },
    { label: "Technical Initiatives", href: "/initiatives" },
    { label: "Responsibilities", href: "/responsibilities" },
    { label: "Resources & Forms", href: "/resources" },
    { label: "Gallery", href: "/gallery" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
  ],
  home: {
    heroSubtitle: "Empowering the people behind the technology. We foster community, mental wellness, and global leadership.",
    stats: [
      { metric: "3,500+", label: "Active Students" },
      { metric: "40+", label: "Clubs & Societies" },
      { metric: "500 Acres", label: "Bihta Campus" },
      { metric: "24/7", label: "Medical & Welfare Support" }
    ]
  },

  // REAL IIT PATNA FESTIVALS
  festivals: [
    {
      id: "anwesha",
      title: "Anwesha",
      subtitle: "Annual Cultural Fest",
      desc: "IIT Patna's flagship cultural extravaganza. A 3-day multi-city festival featuring Pro-Nites, Syrics dance competitions, and global artist headliners.",
      link: "https://anwesha.live"
    },
    {
      id: "celesta",
      title: "Celesta",
      subtitle: "Annual Techno-Management Fest",
      desc: "The ultimate technical summit featuring national-level hackathons, robotics wars, and guest lectures from industry pioneers.",
      link: "https://celesta.org.in"
    },
    {
      id: "infinito",
      title: "Infinito",
      subtitle: "Annual Sports Fest",
      desc: "Bringing together the finest athletes from technical institutes across India for highly competitive athletics, basketball, and e-sports tournaments.",
      link: "https://infinito.iitp.ac.in"
    }
  ],

  // REAL IIT PATNA CLUBS (Student Gymkhana)
  clubs: [
    { name: "NJACK (Computer Science)", category: "Technical" },
    { name: "Sparkonics (Electronics)", category: "Technical" },
    { name: "Yavanika (Dramatics)", category: "Cultural" },
    { name: "Aria (Music Society)", category: "Cultural" },
    { name: "Pixels (Photography)", category: "Media" },
    { name: "House of Words (Literary)", category: "Literature" },
    { name: "VnF (Vincet and Festivity)", category: "Cultural" },
    { name: "SCME (Mechanical Council)", category: "Technical" }
  ],

  // AUTHENTIC TECHNICAL INITIATIVES
  initiatives: [
    {
      title: "IoT & Robotics MakerSpace",
      desc: "Equipped with 3D printers, CNC machines, and embedded systems. Open 24/7 for sanctioned Student Gymkhana projects."
    },
    {
      title: "Hackathon Collectives",
      desc: "Dedicated funding and mentoring for competitive coding teams and innovation pods, including distinguished groups like the Anantavyomah collective."
    },
    {
      title: "AI & Data Sandbox",
      desc: "Exclusive access to high-performance computing clusters and cloud credits tailored for complex machine learning models."
    }
  ],

  // AUTHENTIC EXTERNAL PORTAL LINKS
  externalLinks: [
    {
      title: "Academic Portal (MIS)",
      desc: "The central hub for IITP students to check grades, register for courses, and manage fee structures.",
      url: "https://mis.iitp.ac.in/"
    },
    {
      title: "IITP Webmail",
      desc: "Access your official @iitp.ac.in institutional email via the Zimbra web client.",
      url: "https://webmail.iitp.ac.in/"
    },
    {
      title: "Central Library (E-Resources)",
      desc: "Remote access to IEEE Xplore, ScienceDirect, and the IIT Patna digital repository.",
      url: "https://library.iitp.ac.in/"
    },
    {
      title: "Primary Health Centre (PHC)",
      desc: "Details on campus medical staff, visiting specialists, and ambulance dispatch.",
      url: "https://www.iitp.ac.in/index.php/en-us/facilities/medical-facilities"
    }
  ],

  // REALISTIC DOWNLOADABLE RESOURCES
  resources: [
    { title: "IIT Patna UG Rulebook (B.Tech)", size: "4.2 MB PDF", date: "Updated 2025" },
    { title: "Hostel Code of Conduct & Leave Form", size: "1.1 MB PDF", date: "Mandatory" },
    { title: "Gymkhana Constitution", size: "3.5 MB PDF", date: "v2.4" },
    { title: "MCM Scholarship Application", size: "0.8 MB DOCX", date: "Fillable" }
  ]
};