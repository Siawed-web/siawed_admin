export const PAGES = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Programs",
    href: "/programs",
  },
  {
    title: "WENBA",
    href: "/wenba",
  },
  {
    title: "Membership",
    href: "/membership",
  },
  {
    title: "Corporate",
    href: "/corporate",
  },

  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    image: "/images/testimonials/1.webp",
    name: "Prof Dr. Malathy Selvakkumar",
    location: "PRINCIPAL of S.A. College of Arts & Science",
    text: "The Program has been crafted with so much care and concern. It's a great step towards entrepreneurship. I wish and hope SIAWED scales greater heights in the future. My college and I will stand with you on every step you're taking in the direction of entrepreneurship.",
  },
  {
    id: 2,
    name: "Dr K Deepa Mala",
    image: "/images/testimonials/2.webp",
    location:
      "Founder & Chairperson Research and Action Centre for Local Democracy",
    text: "There are several ways to empower women. Creating safe workplaces, educating women, raising voices against inequality, and training on job skills are some of them. I'm glad SIAWED contributes significantly towards women's economic empowerment through skill development and business opportunities.",
  },
  {
    id: 3,
    name: "Prof. Dr Rama Vaidyanathan",
    image: "/images/testimonials/3.webp",
    location:
      "Director R & D Dr A P J Abdul Kalam Centre for Innovation and Entrepreneurship",
    text: "SIAWED is a great platform for college students and aspiring women entrepreneurs to connect with industry professionals for business guidance and skill development. I'm glad to have associated with SIAWED over the years and look forward to extending my continued support.",
  },
  {
    id: 4,
    name: "Mrs. Manju",
    image: "/images/testimonials/4.webp",
    location: "Founder of Arigni Herbal Products",
    text: "SIAWED is an amazing association for aspiring women entrepreneurs. The opportunities to connect, network, and grow together have been priceless. President Ms. Vanathi Devi is friendly, honest, and supportive. I'm grateful to be a member and excited about the future growth of this community.",
  },
  {
    id: 5,
    name: "Ms. Deepika V",
    image: "/images/testimonials/5.webp",
    location:
      "Digital Marketer Rajapalayam SIAWED Member & Awardee - Budding Entrepreneur",
    text: "Joining SIAWED helped me showcase my skills as a Digital Marketer to a wider audience. Through this platform, I received speaking opportunities, business leads, and recognition as the 'Budding Entrepreneur of the Year 2017'. I'm grateful for the support and connections gained through this organization.",
  },
  {
    id: 6,
    name: "Ms Kalyani",
    image: "/images/testimonials/6.webp",
    location: "Chennai SIAWED Member and Awardee - Budding Entrepreneur",
    text: "As a culinary expert and entrepreneur, I joined SIAWED in search of a dynamic women's business community. The guidance from Ms. T Vanadhi Devi and the recognition through the 'Budding Entrepreneur Award' motivated me greatly. SIAWED has helped me gain referrals, visibility, and valuable business support.",
  },
];

export const NAV_ITEMS = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
    id: "about",
    dropdown: [
      {
        label: "Organisation",
        links: [
          { title: "Who We Are", href: "/about#who-we-are" },
          { title: "Vision & Mission", href: "/about#vision" },
          { title: "Our Team", href: "/about#team" },
        ],
      },
      {
        label: "Recognition",
        links: [{ title: "Awards", href: "/about#awards" }],
      },
    ],
  },
  {
    title: "Programs",
    href: "/programs",
    id: "programs",
    dropdown: [
      {
        label: "Skill & Enterprise",
        links: [
          { title: "Entrepreneurship", href: "/programs#entrepreneurship" },
          { title: "Training", href: "/programs#training" },
          { title: "SHG", href: "/programs#shg" },
        ],
      },
    ],
  },
  {
    title: "WENBA",
    href: "/wenba",
    id: "wenba",
    isMega: true,
    dropdown: [
      {
        label: "For Vendors",
        links: [
          { title: "Registration", href: "/wenba#register" },
          { title: "Catalogue", href: "/wenba#catalogue" },
          { title: "Dashboard", href: "/wenba#dashboard" },
        ],
      },
      {
        label: "For Corporates",
        links: [
          { title: "Procurement", href: "/wenba#procurement" },
          { title: "Raise Request", href: "/wenba#raise-request" },
          { title: "CSR", href: "/wenba#csr" },
        ],
      },
    ],
  },
  {
    title: "Membership",
    href: "/membership",
    id: "membership",
    dropdown: [
      {
        links: [
          { title: "Become Member", href: "/membership#become-member" },
          { title: "Benefits", href: "/membership#benefits" },
        ],
      },
    ],
  },
  {
    title: "Events",
    href: "/events",
    id: "events",
    dropdown: [
      {
        links: [
          { title: "Ucoming Events", href: "/events#upcoming" },
          { title: "Previous Events", href: "/events#previous" },
        ],
      },
    ],
  },

  {
    title: "Contact",
    href: "/contact",
  },
];
