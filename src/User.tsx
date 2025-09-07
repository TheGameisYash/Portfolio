import { IconBrandGithub, IconBrandInstagram, IconBrandLeetcode, IconBrandLinkedin, IconBrandYoutube } from "@tabler/icons-react";

const Info = {
    name: "Yash Vardhan Sharma",
    stack: ["Software Engineer", "Full Stack Developer", "Competitive Programmer", "Freelancer", "Open Source Contributor"],
    bio: "I'm a passionate software engineer specialized in crafting efficient and scalable solutions with modern technologies. With expertise spanning frontend frameworks, backend architectures, and database optimization, I deliver top-notch web applications that prioritize performance and user experience. As a dedicated freelancer and open source contributor, I provide innovative services that exceed client expectations while fostering collaborative development communities. Let's connect and create something amazing together!"
}

const ProjectInfo = [
    {
        title: "Random Gifs",
        desc: "The Random Gifs platform represents a sophisticated blend of modern web technologies designed to deliver an exceptional user experience. Built with React's component-based architecture, the application leverages Vite's lightning-fast development server for optimal build performance and seamless hot module replacement capabilities. Tailwind CSS provides a utility-first approach to styling, ensuring responsive design across all device formats. The robust backend infrastructure utilizes Node.js with Express.js for efficient API handling and server-side operations. Dynamic GIF content is seamlessly integrated through industry-standard APIs including GIPHY and Tenor, providing users with endless entertainment options. Deployment strategy incorporates Vercel's edge network for global accessibility and reliability. The development workflow includes GitHub for comprehensive version control, TypeScript for enhanced type safety and code maintainability, plus ESLint and Prettier for consistent code quality standards. This technological symphony creates a fast, reliable, and visually stunning GIF browsing experience. Please note: Initial loading may require patience as the virtual machine initializes.",
        image: "randomgif.png",
        live: true,
        technologies: ["React", "Tailwind", "Node.js", "JavaScript", "Express"],
        link: "http://best-gif.onrender.com/",
        github: "https://github.com/TheGameisYash/Best-Gif"
    },
    {
        title: "Steam Library Showcase",
        desc: "The Steam Library Showcase revolutionizes how gamers display their digital collections through intelligent real-time synchronization technology. This cutting-edge platform automatically updates your showcased library whenever you acquire new games, modify your collection, or accumulate additional playtime hours. The innovative real-time tracking system ensures your public profile always reflects your most current gaming activities, including precise playtime statistics, achievement progress, and recent gaming sessions. Advanced integration with Steam's comprehensive API provides seamless data synchronization, creating an authentic representation of your gaming journey. The platform's intelligent caching system optimizes performance while maintaining data accuracy across all user interactions. Future development roadmap includes enhanced customization features, social integration capabilities, and advanced analytics dashboard for deeper gaming insights. The responsive design ensures optimal viewing experience across desktop, tablet, and mobile devices, making your gaming achievements accessible anywhere. Please note: Initial loading times may vary as the virtual machine infrastructure initializes to ensure optimal performance.",
        image: "steam-lib.png",
        live: true,
        technologies: ["React", "Node.js", "Express.js", "ES Modules", "Steam API"],
        link: "https://steamshowcase.onrender.com/",
        github: "https://github.com/TheGameisYash/steam-lib"
    },
    {
        title: "Spotify Clone",
        desc: "Spotify Clone represents a comprehensive full-stack music streaming application that meticulously recreates the beloved features of the original Spotify platform. The sophisticated frontend architecture utilizes React's powerful component system, enhanced by TailwindCSS for pixel-perfect responsive styling and Heroicons for consistent iconography throughout the user interface. Firebase integration provides robust user authentication, secure data storage, and real-time synchronization capabilities across multiple devices. Users enjoy seamless account creation, secure login processes, intelligent music search functionality, and comprehensive playlist management systems. The application features advanced real-time updates, ensuring users instantly see newly added tracks, playlist modifications, and social interactions from friends. Backend infrastructure leverages Firebase's cloud functions for scalable server operations, while the database architecture supports complex music metadata, user preferences, and social features. The intuitive user interface prioritizes accessibility and user experience, featuring smooth animations, keyboard navigation support, and responsive design principles. Advanced search algorithms provide intelligent music discovery, while playlist sharing capabilities foster community engagement and music exploration.",
        image: "Spotify.png",
        live: false,
        technologies: ["React", "Springboot", "Tailwind", "Tabler-Icons", "MongoDB", "Firebase"],
        link: "https://github.com/",
        github: "https://github.com/"
    },
    {
        title: "Travel Tracker",
        desc: "Travel Tracker transforms how adventurers document and share their global experiences through an intuitive full-stack web application. The sophisticated frontend leverages React's component architecture paired with Bootstrap's responsive grid system to create an engaging, mobile-first user interface. The robust backend infrastructure combines Node.js runtime with Express.js framework for efficient API development, while PostgreSQL provides enterprise-grade data persistence and complex query capabilities. User authentication ensures secure account management, enabling personalized trip logging with detailed location data, travel dates, and memorable experiences. The interactive mapping system integrates advanced geographic APIs to visualize travel routes, destination markers, and statistical travel analytics on dynamic, zoomable world maps. Advanced features include photo gallery integration, expense tracking, trip timeline visualization, and social sharing capabilities with privacy controls. The responsive design ensures optimal functionality across smartphones, tablets, and desktop computers, making travel documentation accessible from anywhere in the world. Clean, modern aesthetics combined with intuitive navigation patterns create an enjoyable user experience that encourages consistent travel logging and memory preservation.",
        image: "Travel.png",
        live: false,
        technologies: ["React", "Node.js", "PostgresSQL", "Express", "Bootstrap"],
        link: "https://github.com/",
        github: "https://github.com/"
    },
    {
        title: "Instagram Clone",
        desc: "Instagram Clone delivers a feature-rich social media experience that faithfully recreates the core functionality of the world's most popular photo-sharing platform. The sophisticated frontend architecture utilizes React's modern hooks system, enhanced by TailwindCSS's utility-first styling approach and Heroicons' comprehensive icon library for consistent visual design. Firebase integration provides enterprise-level user authentication, secure cloud storage for high-resolution images, and real-time database synchronization across all connected devices. Users enjoy seamless account registration, secure login processes, intuitive photo upload workflows with image optimization, and comprehensive social interaction features including likes, comments, and direct messaging. The application's real-time update system ensures instant notification delivery, live comment feeds, and synchronized social interactions across all user sessions. Advanced image processing capabilities include automatic compression, multiple format support, and responsive image delivery optimized for various device screen sizes. The clean, modern interface prioritizes user experience through smooth animations, infinite scroll functionality, and accessibility features. Robust backend infrastructure supports scalable user growth, efficient content delivery, and comprehensive data analytics for user engagement insights.",
        image: "instagram_clone_cover.png",
        live: false,
        technologies: ["React", "Springboot", "Tailwind", "Heroicons", "Firebase", "MongoDB"],
        link: "https://github.com/",
        github: "https://github.com/"
    },
    {
        title: "CodeX Code Editor",
        desc: "CodeX represents the next generation of browser-based integrated development environments, combining powerful functionality with elegant simplicity. Built on React's component-driven architecture, the platform utilizes TailwindCSS for responsive, utility-first styling and integrates the industry-standard Ace Editor for professional-grade code editing capabilities. The sophisticated syntax highlighting engine supports extensive programming languages including HTML5, CSS3, JavaScript ES6+, Python 3.x, Java 11+, and numerous other popular development languages. Advanced features include intelligent code completion, real-time error detection, customizable themes with dark/light mode support, and comprehensive keyboard shortcuts for enhanced productivity. The robust file management system enables seamless code organization with project folders, file creation, editing workflows, and secure cloud-based storage integration. Users benefit from advanced export capabilities, including multiple file format support and direct download functionality for local development workflows. The responsive design ensures optimal coding experience across desktop workstations, tablets, and mobile devices, making development accessible from any location. Performance optimization techniques ensure smooth operation even with large codebases, while collaborative features enable real-time code sharing and team development workflows.",
        image: "CodeX.png",
        live: false,
        technologies: ["React", "Tailwind", "Ace Editor"],
        link: "https://github.com/",
        github: "https://github.com/"
    }
]

const SkillInfo = [
    {
        title: "Frontend",
        skills: ["HTML", "CSS", "SASS", "JavaScript", "React JS", "Tailwind CSS", "GSAP", "Material UI", "Bootstrap"]
    },
    {
        title: "Backend",
        skills: ["Node JS", "Express JS", "MySQL", "MongoDB", "Firebase", "PostgresSQL"]
    },
    {
        title: "Languages",
        skills: ["C", "C++", "Python", "JavaScript", "TypeScript"]
    },
    {
        title: "Tools",
        skills: ["Git", "Github", "VS Code", "Postman", "MongoDB Compass"]
    }
]

const socialLinks = [
    { link: "https://github.com/TheGameisYash", icon: IconBrandGithub },
    { link: "https://www.linkedin.com/in/thegameisyash/", icon: IconBrandLinkedin },
    { link: "https://www.instagram.com/thegameisyash", icon: IconBrandInstagram }, 
    { link: "https://www.instagram.com/_", icon: IconBrandInstagram, hide: true }, 
    { link: "https://www.youtube.com/channel/", icon: IconBrandYoutube, hide: true },
    { link: "https://www.leetcode.com/u/", icon: IconBrandLeetcode, hide: true }
];

const ExperienceInfo = [
    {
        role: "Open Source Contributor",
        company: "GSSOC",
        date: "Apr 2024 - Jul 2024",
        desc: "As a dedicated contributor in the prestigious GirlScript Summer of Code (GSSoC) program, I played a transformative role within the vibrant open-source development community. My comprehensive responsibilities encompassed advanced software development, collaborative problem-solving, and mentorship engagement with industry professionals and fellow developers. I successfully contributed to multiple high-impact projects through strategic code implementation, systematic bug resolution, comprehensive documentation enhancement, and innovative feature development initiatives. This experience required deep technical understanding of complex codebases, strict adherence to industry-standard coding practices, and meticulous compliance with project maintainer guidelines and community standards. My contributions significantly improved project functionality, performance optimization, and user experience while fostering collaborative learning environments that benefited the entire development community. Through this intensive program, I developed advanced technical expertise, professional communication skills, and leadership capabilities that continue to drive my career growth and commitment to open-source innovation.",
        skills: ["React JS", "Angular", "Node JS", "MySQL", "MongoDB"]
    }
]

const EducationInfo = [
    {
        degree: "Bachelor of Technology in Automobile Engineering",
        institution: "Madhav Institute Of Technology And Science", // Replace with your actual college name (should match image filename)
        date: "2018 - 2023", // Replace with your actual dates
        desc: "Pursued comprehensive automobile engineering education with specialized focus on modern vehicle systems, automotive design principles, and cutting-edge manufacturing technologies. Successfully completed intensive coursework in internal combustion engines, hybrid propulsion systems, vehicle dynamics, and automotive electronics integration. Actively participated in technical workshops on computer-aided design, simulation software, and automotive programming languages that sparked passion for software development. Developed robust foundation in mechanical engineering principles while simultaneously acquiring advanced programming skills through elective courses in C++, Python, and embedded systems programming. Engaged in interdisciplinary projects combining automotive knowledge with software solutions, including vehicle diagnostic systems, IoT-based fleet management applications, and automotive data analytics platforms. Maintained exceptional academic performance while self-learning web development technologies, contributing to student technical organizations focused on automotive innovation and digital transformation. Applied theoretical engineering knowledge through capstone projects involving real-world automotive problem solving, industry collaboration with software integration, and research-oriented development initiatives bridging mechanical and information technology domains.",
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
