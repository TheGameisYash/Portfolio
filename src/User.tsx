import { IconBrandGithub, IconBrandInstagram, IconBrandLeetcode, IconBrandLinkedin, IconBrandYoutube } from "@tabler/icons-react";
const Info = {
    name: "Yash Vardhan Sharma",
    stack: ["Software Engineer", "Full Stack Developer", "Competitive Programmer", "Freelancer", "Open Source Contributor"],
    bio: "I'm a passionate software engineer specialized in crafting efficient and scalable solutions, deliver top-notch web applications, and provide freelance services that exceed client expectations. Let's connect and create something amazing together!"
}



const ProjectInfo = [
    {
        title: "Random Gifs",
        desc: "The Random Gifs website uses a modern tech stack for an engaging user experience. React drives the dynamic UI, Vite speeds up development with fast builds and hot module replacement, and Tailwind CSS ensures a flexible, responsive design. Node.js and Express.js handle backend operations, while GIFs are sourced from APIs like GIPHY or Tenor. Deployment is managed by Vercel or Netlify for reliable hosting. The stack includes GitHub for version control, TypeScript for type safety, and ESLint and Prettier for code quality. This combination delivers a fast, reliable, and visually appealing GIF browsing experience. Note: Please be patient if the website takes time to load while the virtual machine starts.",
        image: "randomgif.png",
        live: true,
        technologies: ["React", "Tailwind", "Node.js", "JavaScript", "Express"],
        link: "http://best-gif.onrender.com/",
        github: "https://github.com/TheGameisYash/Best-Gif"
    },
    {
        title: "Steam Library Showcase",
        desc: "The Steam Library Showcase website offers a dynamic and engaging way to display your Steam game collection, updating in real-time whenever your library changes or you spend time playing games. This innovative feature ensures that your showcased library always reflects your most recent gaming activities, including up-to-date playtime statistics. As you enjoy your favorite games, the site automatically adjusts to provide an accurate and current view of your gaming history. Future enhancements will introduce even more customization options, allowing for a richer and more personalized display of your gaming journey.(Note: If the website takes time to load, please wait for the virtual machine to start.) ",
        image: "steam-lib.png",
        live: true,
        technologies: ["React", "Node.js", "Express.js", "ES Modules", "Steam API"],
        link: "https://steam-lib.onrender.com/",
        github: "https://github.com/TheGameisYash/steam-lib"
    },
    {
        title: "Spotify Clone",
        desc: "Spotify Clone is a full-stack web application that replicates the core features of Spotify, including user authentication, music playback, and playlist creation. The front end is built with React, TailwindCSS, Heroicons, and Firebase, while the back end uses Firebase for user authentication and data storage. Users can create an account, log in, search for songs, and create playlists. The app features real-time updates, so users can see new songs as they are added. Spotify Clone provides a seamless user experience with a clean.",
        image: "Spotify.png",
        live: false,
        technologies: ["React", "Springboot", "Tailwind", "Tabler-Icons", "MongoDB", "Firebase"],
        link: "https://github.com/",
        github: "https://github.com/"
    },
    {
        title: "Travel Tracker",
        desc: "Travel Tracker is a full-stack web application that allows users to track their travel experiences and share them with others. The front end is built with React, Bootstrap, while the back end uses Node.js, Express, and PostgresSQL. Users can create an account, log in, add new trips, and view their past trips on a map. The app features a clean, modern design with interactive maps and a user-friendly interface. Travel Tracker combines functionality with style, making it easy and enjoyable to record and share travel memories.",
        image: "Travel.png",
        live: false,
        technologies: ["React", "Node.js", "PostgresSQL", "Express", "Bootstrap"],
        link: "https://github.com/",
        github: "https://github.com/"
    },
    {
        title: "Instagram Clone",
        desc: "Instagram Clone is a full-stack web application that replicates the core features of Instagram, including user authentication, image uploading, and commenting. The front end is built with React, TailwindCSS, and Heroicons, while the back end uses Firebase for user authentication and image storage. Users can create an account, log in, upload images, and comment on posts. The app features real-time updates, so users can see new comments as they are posted. Instagram Clone provides a seamless user experience with a clean, modern design and intuitive functionality.",
        image: "instagram_clone_cover.png",
        live: false,
        technologies: ["React", "Springboot", "Tailwind", "Heroicons", "Firebase", "MongoDB"],
        link: "https://github.com/",
        github: "https://github.com/"
    },
    {
        title: "CodeX Code Editor",
        desc: "CodeX is a modern, fully responsive code editor built using React, TailwindCSS, and Ace Editor, offering a seamless coding experience across all devices. It features syntax highlighting for popular programming languages, including HTML, CSS, JavaScript, Python, and Java. Users can create, edit, and save code files, with the option to download them as text files. CodeX combines robust functionality with a sleek, intuitive design, making coding effortless and enjoyable.",
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
        skills: ["HTML", "CSS", "SASS", "JavaScript", "React JS", "Tailwind CSS", "GSAP", "Material UI", "Bootstrap"
        ]
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
    
    // { link: "https://www.leetcode.com/u/", icon: IconBrandLeetcode }
];


const ExperienceInfo = [
    {
        role: "Contributor",
        company: "GSSOC",
        date: "Apr 2024 - Jul 2024",
        desc: "As a contributor in the GirlScript Summer of Code (GSSoC), I play a pivotal role in the open-source community by actively participating in various projects. My responsibilities include enhancing my coding and development skills through hands-on experience and collaboration with experienced mentors and fellow contributors. I engage in tasks such as writing code, fixing bugs, improving documentation, and adding new features to open-source projects. This requires understanding the project's codebase, adhering to coding standards, and following the guidelines provided by the project maintainers. My contributions not only help improve the projects but also foster a collaborative learning environment, allowing me to grow both technically and professionally.",
        skills: ["React JS", "Angular", "Node JS", "MySQL", "MongoDB",]
    },
    // {
    //     role: "System Engineer",
    //     company: "GSSOC",
    //     date: "Nov 2022 - Sep 2023",
    //     desc: " I leveraged my skills in Java, Selenium, automation testing, and MySQL to design and implement automated testing frameworks, ensuring robust software validation. I optimized database performance and reliability, and collaborated with cross-functional teams to enhance system operations and ensure seamless integration.",
    //     skills: ["Java", "MySQL", "Hibernate", "Selenium", "Jenkins", "JIRA", "Automation Testing"]
    // }
]
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
export { Info, ProjectInfo,socialLinks, SkillInfo, ExperienceInfo, Slugs };
