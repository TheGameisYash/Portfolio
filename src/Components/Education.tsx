import { Timeline, useMatches } from "@mantine/core";
import { IconBook, IconCertificate, IconAward } from "@tabler/icons-react";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { EducationInfo } from "../User";

gsap.registerPlugin(ScrollTrigger, CustomEase);

// Create custom easing curves for ultra-smooth animations
CustomEase.create("smooth", "M0,0 C0.25,0.1 0.25,1 1,1");
CustomEase.create("elastic", "M0,0 C0.126,0.382 0.28,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1");

const TimelineItem = (items: any) => {
    const size = useMatches({
        xs: 15,
        md: 20,
    });
    
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    
    useEffect(() => {
        const validRefs = itemRefs.current.filter(ref => ref !== null);
        if (validRefs.length > 0) {
            // Ultra-smooth staggered entrance
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
                // Set initial state with hardware acceleration
                gsap.set(item, {
                    opacity: 0,
                    y: 60,
                    scale: 0.8,
                    rotationX: -15,
                    transformPerspective: 1000,
                    willChange: "transform, opacity"
                });

                masterTL.to(item, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotationX: 0,
                    duration: 0.8,
                    ease: "smooth",
                    onComplete: () => {
                        gsap.set(item, { willChange: "auto" });
                    }
                }, index * 0.15);
            });
        }
    }, []);
    
    // Enhanced hover animations
    const handleMouseEnter = (index: number) => {
        setHoveredItem(index);
        const item = itemRefs.current[index];
        if (item) {
            gsap.to(item, {
                y: -8,
                scale: 1.02,
                rotationY: 2,
                boxShadow: "0 25px 50px rgba(100, 255, 218, 0.4)",
                duration: 0.4,
                ease: "power2.out"
            });
        }
    };

    const handleMouseLeave = (index: number) => {
        setHoveredItem(null);
        const item = itemRefs.current[index];
        if (item) {
            gsap.to(item, {
                y: 0,
                scale: 1,
                rotationY: 0,
                boxShadow: "0 0 10px rgba(100, 255, 218, 0.2)",
                duration: 0.4,
                ease: "elastic"
            });
        }
    };
    
    return items.map((item: any, index: number) => (
        <Timeline.Item 
            key={`education-${index}-${item.degree}`}
            data-aos="fade-up" 
            data-aos-duration="800"
            className="!pt-12 !mb-2 sm-mx:!p-1" 
            bullet={
                <div className="relative">
                    <IconBook className="!text-bgColor transition-all duration-500 hover:scale-125 hover:rotate-12" size={size} />
                    <div className="absolute -inset-1 bg-primaryColor rounded-full opacity-20 animate-pulse" />
                </div>
            }
        >
            <div 
                ref={el => itemRefs.current[index] = el}
                className="border shadow-[0_0_10px_0_#64FFDA50] transition-all duration-700 ease-out flex flex-col gap-4 border-primaryColor p-6 rounded-2xl sm-mx:p-4 cursor-pointer group relative overflow-hidden"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                tabIndex={0}
                role="button"
                aria-label={`Education details for ${item.degree}`}
                style={{ willChange: 'auto' }}
            >
                {/* Ultra-smooth background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-primaryColor/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1200" />
                
                <div className="flex gap-4 items-start relative z-10">
                    <div className="relative">
                        <img 
                            className={`rounded-xl w-20 md-mx:w-16 transition-all duration-500 ${
                                hoveredItem === index ? 'scale-110 rotate-3 shadow-lg' : ''
                            }`} 
                            src={`${item.institution}.png`} 
                            alt={`${item.institution} logo`} 
                        />
                        <div className="absolute -inset-1 bg-gradient-to-br from-primaryColor/30 to-blue-500/30 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 -z-10" />
                    </div>
                    
                    <div className="flex flex-col flex-1">
                        <div className={`text-white text-2xl font-bold sm-mx:text-xl xs-mx:text-lg xsm-mx:text-base transition-all duration-500 ${
                            hoveredItem === index ? 'text-primaryColor scale-105' : ''
                        }`}>
                            <IconCertificate className="inline mr-2 text-primaryColor transition-transform duration-300 hover:rotate-12" size={20} />
                            {item.degree}
                        </div>
                        <div className="text-lg font-semibold text-textColor md-mx:text-base sm-mx:text-sm xs-mx:text-xs flex items-center gap-2">
                            <span>{item.institution}</span>
                            <span className="text-primaryColor">•</span>
                            <span className="text-primaryColor font-bold">{item.date}</span>
                        </div>
                        
                        {item.gpa && (
                            <div className="text-sm text-primaryColor font-medium mt-1 flex items-center gap-1">
                                <IconAward size={16} />
                                GPA: {item.gpa}
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="text-textColor leading-7 text-justify md-mx:text-sm xs-mx:text-xs relative z-10 transition-colors duration-500 group-hover:text-gray-200">
                    {item.desc}
                </div>
                
                {/* Enhanced coursework section with staggered animations */}
                <div className="text-lg font-medium text-textColor md-mx:text-base sm-mx:text-sm xs-mx:text-xs flex flex-col gap-2 relative z-10">
                    <div className="font-bold text-white flex items-center gap-2">
                        <span className="text-primaryColor">📚</span>
                        Key Coursework:
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {item.skills.map((skill: any, skillIndex: number) => (
                            <div 
                                key={`skill-${skillIndex}-${skill}`}
                                className={`px-3 py-1 rounded-full border border-primaryColor/30 bg-primaryColor/10 text-primaryColor text-sm transition-all duration-500 hover:bg-primaryColor/20 hover:scale-110 cursor-pointer ${
                                    hoveredItem === index ? 'animate-pulse' : ''
                                }`}
                                onMouseEnter={(e) => {
                                    gsap.to(e.currentTarget, {
                                        scale: 1.15,
                                        y: -2,
                                        boxShadow: "0 5px 15px rgba(100, 255, 218, 0.4)",
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
                                        ease: "elastic"
                                    });
                                }}
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Smooth progress indicator */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primaryColor to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </div>
        </Timeline.Item>
    ));
};

const Education = () => {
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
            // Ultra-smooth title entrance
            if (titleRef.current) {
                gsap.fromTo(titleRef.current, {
                    opacity: 0,
                    y: -80,
                    scale: 0.7,
                    rotationX: -20
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotationX: 0,
                    duration: 1.2,
                    ease: "elastic",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            }
            
            // Timeline reveal animation
            if (timelineRef.current) {
                const timelineElement = timelineRef.current.querySelector('.mantine-Timeline-root');
                if (timelineElement) {
                    gsap.fromTo(timelineElement, {
                        opacity: 0,
                        scaleY: 0,
                        transformOrigin: "top"
                    }, {
                        opacity: 1,
                        scaleY: 1,
                        duration: 1.5,
                        ease: "smooth",
                        scrollTrigger: {
                            trigger: timelineRef.current,
                            start: "top 75%",
                            toggleActions: "play none none reverse"
                        }
                    });
                }
            }
        }, containerRef);
        
        return () => ctx.revert();
    }, []);
    
    return (
        <div 
            ref={containerRef} 
            className="px-16 mx-20 md-mx:px-6 sm-mx:px-2 lg-mx:mx-0 my-10 font-mono" 
            id="Education"
            style={{ marginBottom: '200px' }}
        >
            <h1 
                ref={titleRef}
                className="text-5xl sm-mx:text-4xl xs-mx:text-3xl mb-16 font-black text-center text-white cursor-pointer relative"
                onMouseEnter={() => {
                    gsap.to(titleRef.current, {
                        scale: 1.05,
                        color: "#64FFDA",
                        textShadow: "0 0 40px #64FFDA",
                        duration: 0.4,
                        ease: "power2.out"
                    });
                }}
                onMouseLeave={() => {
                    gsap.to(titleRef.current, {
                        scale: 1,
                        color: "#ffffff",
                        textShadow: "none",
                        duration: 0.4,
                        ease: "power2.out"
                    });
                }}
            >
                <span className="text-primaryColor animate-pulse">04.&nbsp;</span>
                <span className="relative">
                    Education
                    <div className="absolute -inset-2 bg-gradient-to-r from-primaryColor/20 via-blue-500/20 to-primaryColor/20 opacity-0 hover:opacity-100 blur-xl transition-opacity duration-700 -z-10" />
                </span>
            </h1>
            
            <div ref={timelineRef}>
                <Timeline 
                    color="#64FFDA" 
                    active={5} 
                    bulletSize={dot} 
                    lineWidth={3}
                    className="relative"
                >
                    {TimelineItem(EducationInfo)}
                    <Timeline.Item 
                        key="education-timeline-end"
                        bullet={
                            <div className="relative">
                                <IconBook className="!text-bgColor animate-bounce" size={size} />
                                <div className="absolute -inset-2 bg-primaryColor rounded-full opacity-30 animate-ping" />
                            </div>
                        } 
                    />
                </Timeline>
            </div>
        </div>
    );
};

export default Education;
