import { IconBrandGithub, IconBrandInstagram, IconBrandLeetcode, IconBrandLinkedin, IconBrandYoutube } from "@tabler/icons-react";


const Info = {
    name: "Yash Vardhan Sharma",
    stack: ["Software Engineer", "Full Stack Developer", "Competitive Programmer", "Freelancer", "Open Source Contributor"],
    bio: "I'm a passionate software engineer specialized in crafting efficient and scalable solutions with modern technologies. With expertise spanning frontend frameworks, backend architectures, and database optimization, I deliver top-notch web applications that prioritize performance and user experience. As a dedicated freelancer and open source contributor, I provide innovative services that exceed client expectations while fostering collaborative development communities. Let's connect and create something amazing together!"
}


const ProjectInfo = [
    {
        title: "PC Optimizer",
        desc: "Enterprise-grade license management system with HWID protection, Firebase integration, and admin dashboard. Features secure authentication, real-time validation, license generation, HWID reset handling, and comprehensive activity logging. Built for scalability with ultra-optimized database operations achieving 99.9% read reduction through intelligent caching and batched writes.",
        image: "pc-optimizer.png",
        live: true,
        technologies: ["Node.js", "Express", "Firebase", "JavaScript", "HTML/CSS"],
        link: "https://pcoptimizer-vue.onrender.com/",
        github: "https://github.com/TheGameisYash/PCoptimizer-vue"
    },
    {
        title: "Ultra-Optimized License System",
        desc: "High-performance license management platform with HWID-based protection and intelligent caching mechanisms. Implements O(1) HWID lookups, batched activity logging, and validation skip logic to reduce database reads by 99.9%. Features comprehensive admin dashboard, RESTful API endpoints, and enterprise-grade security with Helmet.js, rate limiting, and session management for production-ready deployment.",
        image: "license-system.png",
        live: true,
        technologies: ["Node.js", "Express", "Firebase", "JavaScript", "Security"],
        link: "https://license-system-pi.vercel.app/",
        github: "https://github.com/TheGameisYash/License-System"
    },
    {
        title: "Steam Library Showcase",
        desc: "Visually stunning game library showcase built with Vue 3 and Three.js featuring glassmorphism UI and animated particle backgrounds. Integrates Steam Web API for real-time library synchronization, advanced analytics with Chart.js, AI-powered game search with recommendations, gamification system with achievements and levels, and Progressive Web App capabilities with offline support and installable interface.",
        image: "steam-lib.png",
        live: true,
        technologies: ["Vue.js", "Vite", "Tailwind CSS", "Three.js", "Chart.js", "Steam API"],
        link: "https://steamshowcase.onrender.com/",
        github: "https://github.com/TheGameisYash/SteamShowcaseImproved"
    },
    {
        title: "Student ID Card Generator",
        desc: "Vue 3-based web application for generating professional student ID cards with dynamic form inputs and real-time preview. Features customizable templates, instant PDF export, responsive design, and TypeScript integration for type safety. Built with Vite for optimal build performance and hot module replacement during development.",
        image: "id-card-gen.png",
        live: true,
        technologies: ["Vue.js", "Vite", "TypeScript", "JavaScript"],
        link: "https://id-card-gen-dqc6.onrender.com/",
        github: "https://github.com/TheGameisYash/ID-card-Gen"
    },
    {
        title: "Random Gifs Browser",
        desc: "React-based GIF discovery platform featuring real-time search via GIPHY and Tenor APIs with responsive infinite scroll. Built with Vite for optimal performance and styled with Tailwind CSS for mobile-first responsive design. Backend powered by Node.js and Express for efficient API proxying, rate limiting, and seamless content delivery with caching mechanisms.",
        image: "randomgif.png",
        live: true,
        technologies: ["React", "Tailwind CSS", "Node.js", "Express", "JavaScript"],
        link: "http://best-gif.onrender.com/",
        github: "https://github.com/TheGameisYash/Best-Gif"
    },
    {
        title: "Spotify Clone",
        desc: "Full-stack music streaming application recreating Spotify's core features with React and Spring Boot. Implements user authentication via Firebase, intelligent music search functionality, comprehensive playlist management, and real-time updates. Features responsive UI with Tailwind CSS, Tabler Icons for consistent design, and MongoDB for scalable music metadata storage with social sharing capabilities.",
        image: "Spotify.png",
        live: false,
        technologies: ["React", "Spring Boot", "Tailwind CSS", "Tabler Icons", "MongoDB", "Firebase"],
        link: "https://github.com/",
        github: "https://github.com/"
    },
    {
        title: "Travel Tracker",
        desc: "Interactive travel documentation platform built with React and PostgreSQL for logging global adventures. Features responsive Bootstrap UI, Node.js backend with Express, user authentication for personalized trip management, and interactive mapping with geographic APIs. Includes photo gallery integration, expense tracking, trip timeline visualization, and social sharing with privacy controls for memory preservation.",
        image: "Travel.png",
        live: false,
        technologies: ["React", "Node.js", "PostgreSQL", "Express", "Bootstrap"],
        link: "https://github.com/",
        github: "https://github.com/"
    },
    {
        title: "Instagram Clone",
        desc: "Feature-rich social media platform replicating Instagram's core functionality with React and Spring Boot. Implements Firebase authentication, cloud storage for high-resolution images, real-time database synchronization, and social interactions including likes, comments, and direct messaging. Features Tailwind CSS styling, Heroicons integration, automatic image optimization, and responsive delivery optimized for various devices.",
        image: "instagram_clone_cover.png",
        live: false,
        technologies: ["React", "Spring Boot", "Tailwind CSS", "Heroicons", "Firebase", "MongoDB"],
        link: "https://github.com/",
        github: "https://github.com/"
    },
    {
        title: "CodeX Code Editor",
        desc: "Browser-based integrated development environment built with React and Ace Editor for professional coding. Supports extensive programming languages including HTML5, CSS3, JavaScript ES6+, Python, and Java with syntax highlighting and intelligent code completion. Features customizable themes with dark/light modes, comprehensive keyboard shortcuts, robust file management with cloud storage integration, and multiple export formats for local development workflows.",
        image: "CodeX.png",
        live: false,
        technologies: ["React", "Tailwind CSS", "Ace Editor"],
        link: "https://github.com/",
        github: "https://github.com/"
    }
]


const SkillInfo = [
    {
        title: "Frontend",
        skills: ["HTML", "CSS", "SASS", "JavaScript", "React JS", "Vue JS", "Tailwind CSS", "GSAP", "Three JS", "Material UI", "Bootstrap"]
    },
    {
        title: "Backend",
        skills: ["Node JS", "Express JS", "MySQL", "MongoDB", "Firebase", "PostgresSQL", "RESTful APIs"]
    },
    {
        title: "Languages",
        skills: ["C", "C++", "C Sharp", "Python", "JavaScript", "TypeScript"]
    },
    {
        title: "Tools & DevOps",
        skills: ["Git", "Github", "VS Code", "Vite", "Postman", "MongoDB Compass", "Vercel", "Render"]
    }
]


const socialLinks = [
    { link: "https://github.com/TheGameisYash", icon: IconBrandGithub },
    { link: "https://www.linkedin.com/in/thegameisyash/", icon: IconBrandLinkedin },
    { link: "https://www.instagram.com/thegameisyash", icon: IconBrandInstagram }
];


const ExperienceInfo = [
    {
        role: "Open Source Contributor",
        company: "GirlScript Summer of Code (GSSoC)",
        date: "Apr 2024 - Jul 2024",
        desc: "Contributed to multiple high-impact open-source projects through strategic code implementation, systematic bug resolution, and comprehensive documentation enhancement. Collaborated with industry professionals and fellow developers to improve project functionality, performance optimization, and user experience. Developed advanced technical expertise in React, Angular, and Node.js while maintaining strict adherence to coding standards and community guidelines.",
        skills: ["React JS", "Angular", "Node.js", "MySQL", "MongoDB"]
    }
]


const EducationInfo = [
    {
        degree: "Bachelor of Technology in Automobile Engineering",
        institution: "Madhav Institute Of Technology And Science",
        date: "2018 - 2023",
        desc: "Completed comprehensive automobile engineering education with specialized focus on modern vehicle systems and automotive design. Actively participated in technical workshops on computer-aided design and automotive programming, which sparked passion for software development. Developed robust foundation in engineering principles while acquiring advanced programming skills through C++, Python, and embedded systems courses. Applied interdisciplinary knowledge through capstone projects involving vehicle diagnostic systems and IoT-based applications.",
        skills: ["Vehicle Systems", "Automotive Design", "C++ Programming", "Python", "CAD Software", "Embedded Systems"]
    }
];


const Slugs = [
    "typescript",
    "spring",
    "javascript",
    "dart",
    "java",
    "react",
    "angular",
    "flutter",
    "android",
    "html5",
    "css3",
    "springboot",
    "mongodb",
    "selenium",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "mysql",
    "amazonaws",
    "postgresql",
    "firebase",
    "nginx",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "visualstudiocode",
    "androidstudio",
    "sonarqube",
    "figma",
];


export { Info, ProjectInfo, socialLinks, SkillInfo, ExperienceInfo, EducationInfo, Slugs };
