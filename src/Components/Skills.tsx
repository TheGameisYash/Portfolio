import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SkillInfo } from "../User";
import SkillCard from "./SkillCard";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const bgEffectRef = useRef<HTMLDivElement>(null);
    // Removed unused state: const [activeCards, setActiveCards] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        const title = titleRef.current;
        const cards = cardsRef.current;
        const bgEffect = bgEffectRef.current;

        if (!container || !title || !cards || !bgEffect) return;

        // Epic section entrance
        gsap.fromTo(bgEffect,
            { opacity: 0, scale: 0.8 },
            { 
                opacity: 0.3, 
                scale: 1, 
                duration: 1.5, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: container,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        gsap.fromTo(title,
            {
                opacity: 0,
                y: -80,
                scale: 0.8,
                rotation: -5
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                rotation: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Floating background animation
        gsap.to(bgEffect, {
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: "none"
        });

        // Interactive title with magnetic field
        const handleTitleHover = () => {
            gsap.to(title, {
                scale: 1.08,
                color: "#64FFDA",
                textShadow: "0 0 40px rgba(100, 255, 218, 1), 0 0 80px rgba(0, 212, 255, 0.5)",
                duration: 0.5,
                ease: "power3.out"
            });
        };

        const handleTitleLeave = () => {
            gsap.to(title, {
                scale: 1,
                color: "#ffffff",
                textShadow: "none",
                duration: 0.5,
                ease: "power3.out"
            });
        };

        title.addEventListener("mouseenter", handleTitleHover);
        title.addEventListener("mouseleave", handleTitleLeave);

        return () => {
            title.removeEventListener("mouseenter", handleTitleHover);
            title.removeEventListener("mouseleave", handleTitleLeave);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="px-16 md-mx:px-6 my-24 font-mono relative" id="Skills">
            {/* Advanced background effect */}
            <div 
                ref={bgEffectRef}
                className="absolute inset-0 pointer-events-none overflow-hidden"
            >
                <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-primaryColor/10 via-blue-500/5 to-purple-500/10 rounded-full filter blur-3xl" />
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-blue-500/10 via-primaryColor/5 to-pink-500/10 rounded-full filter blur-3xl" />
            </div>

            <h1 
                ref={titleRef}
                className="text-5xl sm-mx:text-4xl xs-mx:text-3xl mb-16 font-black text-center text-white cursor-pointer transition-all duration-500 relative z-10"
                style={{ fontFamily: 'Inter, sans-serif' }}
            >
                <span className="text-primaryColor animate-pulse">03.&nbsp;</span>
                <span className="relative">
                    Skills & Expertise
                    <div className="absolute -inset-4 bg-gradient-to-r from-primaryColor/20 via-blue-500/20 to-primaryColor/20 opacity-0 hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10" />
                </span>
            </h1>
            
            <div 
                ref={cardsRef}
                className="flex flex-wrap justify-center gap-10 md-mx:gap-6 relative z-10"
            >
                {SkillInfo.map((skill: any, index: number) => (
                    <SkillCard 
                        key={index}
                        index={index}
                        title={skill.title} 
                        skills={skill.skills}
                    />
                ))}
            </div>
        </div>
    );
};

export default Skills;
