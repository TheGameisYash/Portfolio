import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

const SkillCard = (props: any) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const badgesContainerRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const particleSystemRef = useRef<HTMLDivElement>(null);
    const orbRef = useRef<HTMLDivElement>(null);
    const lightRayRef = useRef<HTMLDivElement>(null);
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
    const [skillMastery, setSkillMastery] = useState<{ [key: string]: number }>({});
    const [cardEnergy, setCardEnergy] = useState(0);

    // Custom easing curves for premium feel
    CustomEase.create("premium", "M0,0 C0.25,0 0.25,1 1,1");
    CustomEase.create("elastic", "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1");

    // Ultra-sophisticated entrance animation
    useEffect(() => {
        const card = cardRef.current;
        const title = titleRef.current;
        const badgesContainer = badgesContainerRef.current;
        const glow = glowRef.current;
        const orb = orbRef.current;
        const lightRay = lightRayRef.current;

        if (!card || !title || !badgesContainer || !glow || !orb || !lightRay) return;

        // Set dramatic initial states
        gsap.set(card, { 
            opacity: 0, 
            y: 150, 
            scale: 0.7, 
            rotationX: -45,
            transformPerspective: 1000
        });
        gsap.set(title, { 
            opacity: 0, 
            y: -60,
            scale: 0.5,
            rotation: -10
        });
        gsap.set(badgesContainer.children, { 
            opacity: 0, 
            y: 80, 
            scale: 0.4,
            rotation: 45
        });

        // Fixed: Set initial states for glow elements individually instead of using arrays
        gsap.set(glow, { opacity: 0, scale: 0.3 });
        gsap.set(orb, { opacity: 0, scale: 0.3 });
        gsap.set(lightRay, { opacity: 0, scale: 0.3 });

        // Master entrance timeline with premium easing
        const masterTL = gsap.timeline({ delay: props.index * 0.15 });
        
        masterTL
            .to(card, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationX: 0,
                duration: 1.2,
                ease: "premium"
            })
            .to(glow, {
                opacity: 0.4,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.8")
            .to(orb, {
                opacity: 0.6,
                scale: 1,
                duration: 1,
                ease: "elastic"
            }, "-=0.6")
            .to(lightRay, {
                opacity: 0.8,
                scale: 1,
                rotation: 180,
                duration: 1.5,
                ease: "power1.out"
            }, "-=1.0")
            .to(title, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotation: 0,
                duration: 0.8,
                ease: "elastic"
            }, "-=1.0")
            .to(badgesContainer.children, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotation: 0,
                duration: 0.6,
                stagger: {
                    amount: 0.8,
                    from: "center",
                    ease: "power2.out"
                },
                ease: "elastic"
            }, "-=0.5");

        // Advanced particle system
        const createParticleSystem = () => {
            const particles = particleSystemRef.current;
            if (!particles) return;

            particles.innerHTML = '';
            
            for (let i = 0; i < 12; i++) {
                const particle = document.createElement('div');
                const symbols = ['✦', '✧', '⟡', '◆', '◇', '⬟'];
                particle.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
                particle.className = 'absolute text-primaryColor opacity-60 pointer-events-none select-none';
                particle.style.fontSize = `${Math.random() * 8 + 6}px`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                particles.appendChild(particle);

                gsap.to(particle, {
                    x: `random(-30, 30)`,
                    y: `random(-30, 30)`,
                    rotation: `random(-180, 180)`,
                    scale: `random(0.5, 1.5)`,
                    opacity: `random(0.3, 0.8)`,
                    duration: `random(3, 6)`,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: Math.random() * 2
                });
            }
        };

        // Sophisticated hover interactions
        const handleMouseEnter = () => {
            createParticleSystem();
            
            const hoverTL = gsap.timeline();
            hoverTL
                .to(card, {
                    y: -15,
                    scale: 1.05,
                    rotationY: 5,
                    duration: 0.6,
                    ease: "premium"
                })
                .to(glow, {
                    opacity: 0.8,
                    scale: 1.3,
                    rotation: 180,
                    duration: 0.8,
                    ease: "power2.out"
                }, 0)
                .to(orb, {
                    opacity: 1,
                    scale: 1.5,
                    rotation: 360,
                    duration: 1,
                    ease: "power1.out"
                }, 0.1)
                .to(lightRay, {
                    opacity: 1,
                    scale: 1.8,
                    rotation: 720,
                    duration: 2,
                    ease: "none"
                }, 0.2)
                .to(card, {
                    boxShadow: `
                        0 25px 50px rgba(100, 255, 218, 0.4),
                        0 0 80px rgba(100, 255, 218, 0.3),
                        inset 0 0 30px rgba(100, 255, 218, 0.1)
                    `,
                    duration: 0.6,
                    ease: "power2.out"
                }, 0.3)
                .to(title, {
                    color: "#64FFDA",
                    scale: 1.08,
                    textShadow: "0 0 30px rgba(100, 255, 218, 0.8)",
                    duration: 0.5,
                    ease: "power2.out"
                }, 0.2);

            // Energy build-up animation
            const energyTL = gsap.timeline({ repeat: -1 });
            energyTL.to({}, {
                duration: 0.1,
                onUpdate: function() {
                    setCardEnergy(prev => Math.min(prev + 2, 100));
                }
            });
        };

        const handleMouseLeave = () => {
            if (particleSystemRef.current) {
                particleSystemRef.current.innerHTML = '';
            }
            
            gsap.killTweensOf({});
            setCardEnergy(0);

            const leaveTL = gsap.timeline();
            leaveTL
                .to(card, {
                    y: 0,
                    scale: 1,
                    rotationY: 0,
                    duration: 0.6,
                    ease: "power2.out"
                })
                // Fixed: Animate each element individually instead of using arrays
                .to(glow, {
                    opacity: 0.4,
                    scale: 1,
                    rotation: 0,
                    duration: 0.8,
                    ease: "power2.out"
                }, 0)
                .to(orb, {
                    opacity: 0.6,
                    scale: 1,
                    rotation: 0,
                    duration: 0.8,
                    ease: "power2.out"
                }, 0)
                .to(lightRay, {
                    opacity: 0.8,
                    scale: 1,
                    rotation: 0,
                    duration: 0.8,
                    ease: "power2.out"
                }, 0)
                .to(card, {
                    boxShadow: "0 15px 35px rgba(100, 255, 218, 0.2)",
                    duration: 0.6,
                    ease: "power2.out"
                }, 0.2)
                .to(title, {
                    color: "#ffffff",
                    scale: 1,
                    textShadow: "none",
                    duration: 0.5,
                    ease: "power2.out"
                }, 0.1);
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
            gsap.killTweensOf("*");
        };
    }, [props.index]);

    // Ultra-advanced skill selection system
    const handleSkillClick = (skill: string, event: React.MouseEvent<HTMLDivElement>) => {
        const badge = event.currentTarget;
        const img = badge.querySelector('img') as HTMLElement;
        const text = badge.querySelector('.skill-text') as HTMLElement;
        const progressBar = badge.querySelector('.progress-bar') as HTMLElement;

        // Generate skill mastery if not exists
        if (!skillMastery[skill]) {
            const mastery = Math.floor(Math.random() * 40) + 60; // 60-100%
            setSkillMastery(prev => ({ ...prev, [skill]: mastery }));
        }

        if (selectedSkill === skill) {
            // Ultra-smooth deselection
            setSelectedSkill(null);
            
            const deselectTL = gsap.timeline();
            deselectTL
                .to(badge, {
                    scale: 1,
                    backgroundColor: "rgba(75, 85, 99, 0.6)",
                    borderColor: "#6B7280",
                    boxShadow: "none",
                    duration: 0.5,
                    ease: "elastic"
                })
                .to(img, {
                    rotation: 0,
                    scale: 1,
                    filter: "none",
                    duration: 0.6,
                    ease: "elastic"
                }, 0)
                .to(text, {
                    color: "#D1D5DB",
                    scale: 1,
                    duration: 0.4,
                    ease: "power2.out"
                }, 0.1)
                .to(progressBar, {
                    width: "0%",
                    duration: 0.4,
                    ease: "power2.out"
                }, 0.2);

        } else {
            // Deselect previous skill
            if (selectedSkill) {
                const prevBadge = badgesContainerRef.current?.querySelector(`[data-skill="${selectedSkill}"]`) as HTMLElement;
                if (prevBadge) {
                    gsap.to(prevBadge, {
                        scale: 0.95,
                        backgroundColor: "rgba(75, 85, 99, 0.6)",
                        borderColor: "#6B7280",
                        boxShadow: "none",
                        duration: 0.3,
                        ease: "power2.out",
                        onComplete: () => {
                            gsap.to(prevBadge, {
                                scale: 1,
                                duration: 0.2,
                                ease: "back.out(1.4)"
                            });
                        }
                    });
                }
            }

            setSelectedSkill(skill);
            
            // Epic selection animation with mastery reveal
            const selectTL = gsap.timeline();
            selectTL
                .to(badge, {
                    scale: 1.15,
                    backgroundColor: "rgba(100, 255, 218, 0.3)",
                    borderColor: "#64FFDA",
                    duration: 0.5,
                    ease: "elastic"
                })
                .to(img, {
                    rotation: 720,
                    scale: 1.3,
                    filter: "drop-shadow(0 0 20px #64FFDA) brightness(1.4) saturate(1.3)",
                    duration: 1,
                    ease: "power2.out"
                }, 0)
                .to(text, {
                    color: "#64FFDA",
                    scale: 1.1,
                    textShadow: "0 0 15px rgba(100, 255, 218, 0.8)",
                    duration: 0.5,
                    ease: "power2.out"
                }, 0.2)
                .to(badge, {
                    boxShadow: `
                        0 0 40px rgba(100, 255, 218, 0.6),
                        inset 0 0 30px rgba(100, 255, 218, 0.2),
                        0 0 80px rgba(0, 212, 255, 0.4)
                    `,
                    duration: 0.6,
                    ease: "power2.out"
                }, 0.3)
                .to(progressBar, {
                    width: `${skillMastery[skill] || 75}%`,
                    duration: 1.2,
                    ease: "power2.out"
                }, 0.4);

            // Continuous mastery pulse
            gsap.to(badge, {
                boxShadow: `
                    0 0 60px rgba(100, 255, 218, 0.8),
                    inset 0 0 40px rgba(100, 255, 218, 0.3),
                    0 0 120px rgba(0, 212, 255, 0.6)
                `,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    };

    // Advanced badge hover with magnetic effects
    const handleBadgeHover = (skill: string, isEnter: boolean, badge: HTMLElement) => {
        if (selectedSkill === skill) return;

        const img = badge.querySelector('img') as HTMLElement;
        const text = badge.querySelector('.skill-text') as HTMLElement;

        if (isEnter) {
            gsap.to(badge, {
                scale: 1.08,
                borderColor: "#64FFDA",
                backgroundColor: "rgba(100, 255, 218, 0.15)",
                y: -5,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(img, {
                rotation: 25,
                scale: 1.1,
                filter: "brightness(1.2)",
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(text, {
                color: "#64FFDA",
                duration: 0.3,
                ease: "power2.out"
            });
        } else {
            gsap.to(badge, {
                scale: 1,
                borderColor: "#6B7280",
                backgroundColor: "rgba(75, 85, 99, 0.6)",
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(img, {
                rotation: 0,
                scale: 1,
                filter: "none",
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(text, {
                color: "#D1D5DB",
                duration: 0.3,
                ease: "power2.out"
            });
        }
    };

    return (
        <div 
            ref={cardRef}
            className="w-[47%] sm-mx:w-full p-8 rounded-3xl bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-md border border-gray-600/50 relative overflow-hidden cursor-pointer"
            style={{ 
                boxShadow: "0 15px 35px rgba(100, 255, 218, 0.2)",
                transformStyle: 'preserve-3d'
            }}
        >
            {/* Multi-layered background effects */}
            <div 
                ref={glowRef}
                className="absolute inset-0 bg-gradient-to-br from-primaryColor/30 via-transparent to-blue-500/20 rounded-3xl"
                style={{ filter: 'blur(25px)' }}
            />
            
            <div 
                ref={orbRef}
                className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-primaryColor/40 to-blue-500/40 rounded-full"
                style={{ filter: 'blur(15px)' }}
            />
            
            <div 
                ref={lightRayRef}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primaryColor/10 to-transparent rounded-3xl"
                style={{ filter: 'blur(30px)' }}
            />

            {/* Advanced particle system */}
            <div ref={particleSystemRef} className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl" />

            {/* Energy level indicator */}
            {cardEnergy > 0 && (
                <div className="absolute top-4 left-4 w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-primaryColor to-blue-400 transition-all duration-100 rounded-full"
                        style={{ width: `${cardEnergy}%` }}
                    />
                </div>
            )}
            
            {/* Content */}
            <div className="relative z-20">
                {/* Enhanced title */}
                <h3 
                    ref={titleRef}
                    className="text-3xl font-bold text-white text-center mb-8 sm-mx:text-2xl"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                >
                    {props.title}
                    {selectedSkill && (
                        <div className="text-base font-medium text-primaryColor mt-3 opacity-90 flex items-center justify-center gap-2">
                            <span className="animate-spin">⚡</span>
                            {selectedSkill} - {skillMastery[selectedSkill] || '???'}% Mastery
                            <span className="animate-pulse">✨</span>
                        </div>
                    )}
                </h3>
                
                {/* Ultra-enhanced skills badges */}
                <div 
                    ref={badgesContainerRef}
                    className="flex flex-wrap justify-center gap-4"
                >
                    {props.skills.map((skill: string, index: number) => (
                        <div
                            key={index}
                            data-skill={skill}
                            className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-gray-500/80 bg-gray-600/60 backdrop-blur-sm cursor-pointer transition-colors duration-300 select-none relative overflow-hidden group"
                            onClick={(e) => handleSkillClick(skill, e)}
                            onMouseEnter={(e) => handleBadgeHover(skill, true, e.currentTarget)}
                            onMouseLeave={(e) => handleBadgeHover(skill, false, e.currentTarget)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleSkillClick(skill, e as any);
                                }
                            }}
                            tabIndex={0}
                            role="button"
                            aria-pressed={selectedSkill === skill}
                            aria-label={`${selectedSkill === skill ? 'Deselect' : 'Select'} ${skill}`}
                        >
                            <img 
                                src={`Icons/${skill}.png`}
                                alt={`${skill} icon`}
                                className="w-10 h-10 bs-mx:w-8 bs-mx:h-8 object-contain relative z-10"
                            />
                            <span className="skill-text text-gray-200 font-semibold text-lg sm-mx:text-base xs-mx:text-sm relative z-10">
                                {skill}
                            </span>
                            
                            {/* Mastery progress bar */}
                            <div className="progress-bar absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primaryColor to-blue-400 rounded-full transition-all duration-500"
                                 style={{ width: selectedSkill === skill ? `${skillMastery[skill] || 0}%` : '0%' }} />
                            
                            {/* Hover shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                        </div>
                    ))}
                </div>

                {/* Premium clear selection button */}
                {selectedSkill && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => {
                                const selectedBadge = badgesContainerRef.current?.querySelector(`[data-skill="${selectedSkill}"]`) as HTMLElement;
                                if (selectedBadge) {
                                    gsap.killTweensOf(selectedBadge);
                                    gsap.to(selectedBadge, {
                                        scale: 1,
                                        backgroundColor: "rgba(75, 85, 99, 0.6)",
                                        borderColor: "#6B7280",
                                        boxShadow: "none",
                                        duration: 0.5,
                                        ease: "elastic"
                                    });
                                    const progressBar = selectedBadge.querySelector('.progress-bar') as HTMLElement;
                                    gsap.to(progressBar, { width: "0%", duration: 0.4 });
                                }
                                setSelectedSkill(null);
                            }}
                            className="group relative px-6 py-3 bg-gradient-to-r from-primaryColor/20 to-blue-500/20 border-2 border-primaryColor/60 rounded-2xl text-primaryColor font-semibold text-sm hover:border-primaryColor hover:bg-gradient-to-r hover:from-primaryColor/30 hover:to-blue-500/30 transition-all duration-500 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <span className="animate-spin">🔄</span>
                                Reset Selection
                                <span className="group-hover:animate-bounce">✨</span>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primaryColor/10 via-blue-500/10 to-primaryColor/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SkillCard;
