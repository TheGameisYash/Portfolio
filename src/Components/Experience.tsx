import { Timeline, useMatches } from "@mantine/core";
import { IconBriefcaseFilled, IconTrophy, IconCalendar } from "@tabler/icons-react";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { ExperienceInfo } from "../User";

gsap.registerPlugin(ScrollTrigger, CustomEase);

// Ultra-smooth custom easing
CustomEase.create("ultraSmooth", "M0,0 C0.25,0.05 0.25,1 1,1");
CustomEase.create("bounceSmooth", "M0,0 C0.175,0.885 0.32,1.275 1,1");

const TimelineItem = (items: any) => {
    const size = useMatches({
        xs: 15,
        md: 20,
    });
    
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeItem, setActiveItem] = useState<number | null>(null);
    
    useEffect(() => {
        const validRefs = itemRefs.current.filter(ref => ref !== null);
        if (validRefs.length > 0) {
            // Ultra-smooth staggered entrance with 3D effects
            const masterTL = gsap.timeline({
                scrollTrigger: {
                    trigger: validRefs[0],
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse",
                    anticipatePin: 1,
                    invalidateOnRefresh: true
                }
            });

            validRefs.forEach((item, index) => {
                gsap.set(item, {
                    opacity: 0,
                    x: 80,
                    y: 40,
                    scale: 0.7,
                    rotationY: 25,
                    transformPerspective: 1000,
                    willChange: "transform, opacity"
                });

                masterTL.to(item, {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotationY: 0,
                    duration: 1,
                    ease: "ultraSmooth",
                    onComplete: () => {
                        gsap.set(item, { willChange: "auto" });
                    }
                }, index * 0.2);
            });
        }
    }, []);
    
    // Enhanced interaction animations
    const handleMouseEnter = (index: number) => {
        setActiveItem(index);
        const item = itemRefs.current[index];
        if (item) {
            gsap.to(item, {
                y: -12,
                scale: 1.03,
                rotationX: 5,
                rotationY: 2,
                boxShadow: "0 30px 60px rgba(100, 255, 218, 0.5)",
                duration: 0.5,
                ease: "power2.out"
            });

            // Animate skills with stagger
            const skills = item.querySelectorAll('[data-skill]');
            gsap.to(skills, {
                y: -3,
                scale: 1.05,
                duration: 0.3,
                stagger: 0.05,
                ease: "power2.out"
            });
        }
    };

    const handleMouseLeave = (index: number) => {
        setActiveItem(null);
        const item = itemRefs.current[index];
        if (item) {
            gsap.to(item, {
                y: 0,
                scale: 1,
                rotationX: 0,
                rotationY: 0,
                boxShadow: "0 0 20px rgba(100, 255, 218, 0.2)",
                duration: 0.5,
                ease: "bounceSmooth"
            });

            // Reset skills animation
            const skills = item.querySelectorAll('[data-skill]');
            gsap.to(skills, {
                y: 0,
                scale: 1,
                duration: 0.3,
                stagger: 0.03,
                ease: "bounceSmooth"
            });
        }
    };
    
    return items.map((item: any, index: number) => (
        <Timeline.Item 
            key={`experience-${index}-${item.role}-${item.company}`}
            data-aos="fade-up" 
            data-aos-duration="800"
            className="!pt-12 !mb-2 sm-mx:!p-1" 
            bullet={
                <div className="relative group">
                    <IconBriefcaseFilled className="!text-bgColor transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" size={size} />
                    <div className="absolute -inset-2 bg-primaryColor rounded-full opacity-0 group-hover:opacity-40 animate-pulse transition-opacity duration-500" />
                </div>
            }
        >
            <div 
                ref={el => itemRefs.current[index] = el}
                className="border shadow-[0_0_10px_0_#64FFDA50] transition-all duration-700 ease-out flex flex-col gap-5 border-primaryColor p-6 rounded-3xl sm-mx:p-4 cursor-pointer group relative overflow-hidden backdrop-blur-sm"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                onClick={() => setActiveItem(activeItem === index ? null : index)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        setActiveItem(activeItem === index ? null : index);
                    }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={activeItem === index}
                aria-label={`Experience details for ${item.role} at ${item.company}`}
                style={{ willChange: 'auto' }}
            >
                {/* Ultra-smooth background layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-primaryColor/8 via-transparent to-blue-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primaryColor/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-900" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
                
                <div className="flex gap-5 items-start relative z-10">
                    <div className="relative group/logo">
                        <img 
                            className={`rounded-2xl w-24 md-mx:w-20 transition-all duration-700 shadow-lg ${
                                activeItem === index ? 'scale-125 rotate-6 shadow-primaryColor/50' : 'group-hover:scale-110 group-hover:-rotate-2'
                            }`} 
                            src={`${item.company}.png`} 
                            alt={`${item.company} logo`}
                            loading="lazy"
                        />
                        <div className="absolute -inset-2 bg-gradient-to-br from-primaryColor/40 to-blue-500/40 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-700 -z-10" />
                        
                        {item.featured && (
                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1">
                                <IconTrophy size={16} className="text-white" />
                            </div>
                        )}
                    </div>
                    
                    <div className="flex flex-col flex-1 gap-2">
                        <div className={`text-white text-3xl font-bold sm-mx:text-2xl xs-mx:text-xl xsm-mx:text-lg transition-all duration-700 ${
                            activeItem === index ? 'text-primaryColor scale-110 drop-shadow-[0_0_15px_#64FFDA]' : 'group-hover:text-primaryColor'
                        }`}>
                            {item.role}
                        </div>
                        
                        <div className="text-xl font-bold text-textColor md-mx:text-lg sm-mx:text-base xs-mx:text-sm flex items-center gap-3 flex-wrap">
                            <span className="text-primaryColor">{item.company}</span>
                            <div className="flex items-center gap-2 text-primaryColor/80">
                                <IconCalendar size={16} />
                                <span className="font-semibold">{item.date}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className={`text-textColor leading-8 text-justify md-mx:text-sm xs-mx:text-xs relative z-10 transition-all duration-700 ${
                    activeItem === index ? 'text-gray-200 text-base' : 'group-hover:text-gray-300'
                }`}>
                    {item.desc}
                </div>
                
                {/* Ultra-smooth skills section */}
                <div className="text-lg font-medium text-textColor md-mx:text-base sm-mx:text-sm xs-mx:text-xs flex flex-col gap-3 relative z-10">
                    <div className="font-bold text-white flex items-center gap-2">
                        <span className="text-primaryColor">⚡</span>
                        Technologies & Skills:
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        {item.skills.map((skill: any, skillIndex: number) => (
                            <div 
                                key={`skill-${skillIndex}-${skill}`}
                                data-skill
                                className={`px-4 py-2 rounded-xl border border-primaryColor/40 bg-primaryColor/15 text-primaryColor text-sm font-semibold transition-all duration-500 hover:bg-primaryColor/25 hover:scale-110 cursor-pointer ${
                                    activeItem === index ? 'animate-pulse bg-primaryColor/20' : ''
                                }`}
                                onMouseEnter={(e) => {
                                    gsap.to(e.currentTarget, {
                                        scale: 1.2,
                                        y: -3,
                                        boxShadow: "0 8px 20px rgba(100, 255, 218, 0.4)",
                                        duration: 0.3,
                                        ease: "power2.out"
                                    });
                                }}
                                onMouseLeave={(e) => {
                                    gsap.to(e.currentTarget, {
                                        scale: 1,
                                        y: 0,
                                        boxShadow: "none",
                                        duration: 0.3,
                                        ease: "bounceSmooth"
                                    });
                                }}
                                title={`Proficient in ${skill}`}
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Ultra-smooth progress indicator */}
                <div className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-primaryColor via-blue-500 to-primaryColor transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left rounded-b-3xl" />
            </div>
        </Timeline.Item>
    ));
};

const Experience = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    
    const size = useMatches({
        xs: 15,
        md: 20,
    });
    const dot = useMatches({
        xs: 30,
        md: 35,
    });
    
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Ultra-smooth title with magnetic effect
            if (titleRef.current) {
                gsap.fromTo(titleRef.current, {
                    opacity: 0,
                    y: -100,
                    scale: 0.6,
                    rotation: -10
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    duration: 1.5,
                    ease: "bounceSmooth",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            }
            
            // Timeline smooth reveal
            if (timelineRef.current) {
                gsap.fromTo(timelineRef.current, {
                    opacity: 0,
                    y: 80,
                    scale: 0.9
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "ultraSmooth",
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        }, containerRef);
        
        return () => ctx.revert();
    }, []);
    
    return (
        <div 
            ref={containerRef} 
            className="px-16 mx-20 md-mx:px-6 sm-mx:px-2 lg-mx:mx-0 my-10 mb-28 font-mono" 
            id="Experience"
            style={{ marginTop: '120px' }}
        >
            <h1 
                ref={titleRef}
                className="text-5xl sm-mx:text-4xl xs-mx:text-3xl mb-16 font-black text-center text-white cursor-pointer relative"
                onMouseEnter={() => {
                    gsap.to(titleRef.current, {
                        scale: 1.08,
                        color: "#64FFDA",
                        textShadow: "0 0 50px #64FFDA, 0 0 100px #00D4FF",
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }}
                onMouseLeave={() => {
                    gsap.to(titleRef.current, {
                        scale: 1,
                        color: "#ffffff",
                        textShadow: "none",
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }}
            >
                <span className="text-primaryColor animate-pulse">05.&nbsp;</span>
                <span className="relative">
                    Professional Experience
                    <div className="absolute -inset-3 bg-gradient-to-r from-primaryColor/20 via-blue-500/20 to-primaryColor/20 opacity-0 hover:opacity-100 blur-2xl transition-opacity duration-700 -z-10" />
                </span>
            </h1>
            
            <div ref={timelineRef}>
                <Timeline 
                    color="#64FFDA" 
                    active={5} 
                    bulletSize={dot} 
                    lineWidth={4}
                    className="relative"
                >
                    {TimelineItem(ExperienceInfo)}
                    <Timeline.Item 
                        key="experience-timeline-end"
                        bullet={
                            <div className="relative group">
                                <IconBriefcaseFilled className="!text-bgColor animate-pulse group-hover:animate-bounce" size={size} />
                                <div className="absolute -inset-3 bg-primaryColor rounded-full opacity-20 animate-ping" />
                            </div>
                        } 
                    />
                </Timeline>
            </div>
        </div>
    );
};

export default Experience;
