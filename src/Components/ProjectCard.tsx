import { Badge, Button, Card, Group, Image, Indicator, Text, useMatches, Menu, Tooltip, Progress } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, useEffect, useRef } from "react";
import FullProjectModal from "./FullProjectModal";

const ProjectCard = (props: any) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showFullDesc, setShowFullDesc] = useState(false);
    const [menuOpened, setMenuOpened] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isClicked, setIsClicked] = useState(false);
    const [ripples, setRipples] = useState<any[]>([]);
    const [particles, setParticles] = useState<any[]>([]);
    const [glitchActive, setGlitchActive] = useState(false);
    const [energyLevel, setEnergyLevel] = useState(0);
    const [matrixRain, setMatrixRain] = useState<any[]>([]);
    const [soundWaves, setSoundWaves] = useState<any[]>([]);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [starField, setStarField] = useState<any[]>([]);
    const [pulseRings, setPulseRings] = useState<any[]>([]);
    const cardRef = useRef<HTMLDivElement>(null);
    
    const badge = useMatches({
        xsm: "sm", 
        md: "md", 
        lg: "lg"
    });

    // Simplified mouse tracking without velocity
    const handleMouseMove = (e: any) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const newPosition = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
        setMousePosition(newPosition);
    };

    // Glitch effect trigger
    useEffect(() => {
        if (isHovered) {
            const glitchTimer = setInterval(() => {
                setGlitchActive(true);
                setTimeout(() => setGlitchActive(false), 100);
            }, 3000);
            return () => clearInterval(glitchTimer);
        }
    }, [isHovered]);

    // Energy level animation
    useEffect(() => {
        if (isHovered) {
            const interval = setInterval(() => {
                setEnergyLevel(prev => (prev + 1) % 100);
            }, 50);
            return () => clearInterval(interval);
        } else {
            setEnergyLevel(0);
        }
    }, [isHovered]);

    // Matrix rain effect
    useEffect(() => {
        if (isHovered) {
            const rainDrops = Array.from({ length: 8 }, (_, i) => ({
                id: i,
                x: (i * 12.5) + Math.random() * 5,
                delay: Math.random() * 2,
                duration: 2 + Math.random() * 2,
            }));
            setMatrixRain(rainDrops);
        } else {
            setMatrixRain([]);
        }
    }, [isHovered]);

    // Sound wave visualization
    useEffect(() => {
        if (isHovered) {
            const waves = Array.from({ length: 6 }, (_, i) => ({
                id: i,
                amplitude: Math.random() * 20 + 10,
                frequency: Math.random() * 0.5 + 0.5,
                delay: i * 0.1,
            }));
            setSoundWaves(waves);
        } else {
            setSoundWaves([]);
        }
    }, [isHovered]);

    // Loading progress simulation
    useEffect(() => {
        if (!imageLoaded) {
            const progressTimer = setInterval(() => {
                setLoadingProgress(prev => {
                    if (prev >= 95) {
                        clearInterval(progressTimer);
                        return 100;
                    }
                    return prev + Math.random() * 10;
                });
            }, 100);
            return () => clearInterval(progressTimer);
        }
    }, [imageLoaded]);

    // Star field background
    useEffect(() => {
        if (isHovered) {
            const stars = Array.from({ length: 20 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 3 + 1,
                twinkleDelay: Math.random() * 3,
            }));
            setStarField(stars);
        } else {
            setStarField([]);
        }
    }, [isHovered]);

    // Advanced particle system
    useEffect(() => {
        if (isHovered) {
            const particleTypes = ['✨', '⭐', '💫', '✦', '◈'];
            const particleArray = Array.from({ length: 15 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
                scale: Math.random() * 0.8 + 0.2,
                rotation: Math.random() * 360,
                delay: Math.random() * 3,
                duration: 2 + Math.random() * 3,
            }));
            setParticles(particleArray);
        } else {
            setParticles([]);
        }
    }, [isHovered]);

    const handleTechClick = (tech: string, e: any) => {
        e.stopPropagation();
        createAdvancedRipple(e);
        triggerPulseRings();
        console.log(`Clicked on ${tech}`);
    };

    const createAdvancedRipple = (e: any) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 1.5;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        const newRipple = {
            x, y, size,
            id: Date.now(),
            color: Math.random() > 0.5 ? '#64FFDA' : '#FF6B6B',
        };
        
        setRipples(prev => [...prev, newRipple]);
        setTimeout(() => {
            setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
        }, 1200);
    };

    const triggerPulseRings = () => {
        const rings = Array.from({ length: 3 }, (_, i) => ({
            id: Date.now() + i,
            delay: i * 200,
        }));
        setPulseRings(rings);
        setTimeout(() => setPulseRings([]), 1500);
    };

    const handleDescClick = (e: any) => {
        e.stopPropagation();
        setShowFullDesc(!showFullDesc);
        triggerPulseRings();
    };

    const handleCardClick = (e: any) => {
        setIsClicked(true);
        createAdvancedRipple(e);
        triggerPulseRings();
        setTimeout(() => {
            setIsClicked(false);
            open();
        }, 300);
    };

    const handleCardKeyDown = (e: any) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            open();
        }
    };

    return (
        <div 
            className="w-[32%] lg-mx:w-[46%] md-mx:w-[48%] sm-mx:w-[90%] xs-mx:w-full group perspective-1000 relative"
            data-aos="fade-up" 
            data-aos-duration="800"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            ref={cardRef}
            style={{
                zIndex: isHovered ? 50 : 1,
            }}
        >
            <Card 
                onClick={handleCardClick}
                onKeyDown={handleCardKeyDown}
                tabIndex={0}
                className={`!bg-bgColor cursor-pointer relative focus:outline-none focus:ring-2 focus:ring-[#64FFDA] transition-all duration-700 ease-out mb-5 !border-primaryColor border-2 backdrop-blur-sm overflow-hidden transform-gpu ${
                    isHovered 
                        ? '!shadow-[0_25px_50px_rgba(100,255,218,0.4),0_0_100px_rgba(100,255,218,0.2),inset_0_0_20px_rgba(100,255,218,0.1)] !border-[#64FFDA] !bg-gradient-to-br !from-bgColor !via-[#64FFDA08] !to-[#64FFDA12]' 
                        : '!shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                } ${isClicked ? 'scale-95' : ''} ${glitchActive ? 'animate-pulse filter hue-rotate-180' : ''}`}
                shadow="lg" 
                padding="sm" 
                radius="lg" 
                withBorder
                style={{
                    transformOrigin: 'center',
                    transform: isHovered 
                        ? `perspective(600px) rotateY(${(mousePosition.x - 200) / 50}deg) rotateX(${(mousePosition.y - 150) / 50}deg)` 
                        : isClicked ? 'scale(0.98)' : 'scale(1)',
                    filter: glitchActive ? 'hue-rotate(180deg) saturate(2)' : 'none',
                }}
            >
                {/* Star field background */}
                {starField.map((star) => (
                    <div
                        key={star.id}
                        className="absolute bg-[#64FFDA] rounded-full animate-pulse pointer-events-none"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            animationDelay: `${star.twinkleDelay}s`,
                            animationDuration: '3s',
                            opacity: 0.6,
                        }}
                    />
                ))}

                {/* Matrix rain effect */}
                {matrixRain.map((drop) => (
                    <div
                        key={drop.id}
                        className="absolute top-0 text-[#64FFDA] text-xs font-mono opacity-60 pointer-events-none animate-pulse"
                        style={{
                            left: `${drop.x}%`,
                            animationDelay: `${drop.delay}s`,
                            animationDuration: `${drop.duration}s`,
                        }}
                    >
                        <div className="animate-bounce">01010</div>
                    </div>
                ))}

                {/* Enhanced ripple effects */}
                {ripples.map((ripple) => (
                    <div
                        key={ripple.id}
                        className="absolute pointer-events-none"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            width: ripple.size,
                            height: ripple.size,
                        }}
                    >
                        <div 
                            className="w-full h-full rounded-full opacity-40 animate-ping border-2" 
                            style={{ 
                                borderColor: ripple.color,
                                backgroundColor: `${ripple.color}20`,
                                animationDuration: '1.2s'
                            }} 
                        />
                    </div>
                ))}

                {/* Pulse rings */}
                {pulseRings.map((ring) => (
                    <div
                        key={ring.id}
                        className="absolute inset-0 border-2 border-[#64FFDA] rounded-lg opacity-30 animate-ping pointer-events-none"
                        style={{
                            animationDelay: `${ring.delay}ms`,
                            animationDuration: '1.5s',
                        }}
                    />
                ))}

                {/* Advanced floating particles */}
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute text-lg opacity-80 pointer-events-none animate-bounce"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            transform: `scale(${particle.scale}) rotate(${particle.rotation}deg)`,
                            animationDelay: `${particle.delay}s`,
                            animationDuration: `${particle.duration}s`,
                        }}
                    >
                        <span className="animate-spin">{particle.type}</span>
                    </div>
                ))}

                {/* Energy level indicator */}
                {isHovered && (
                    <div className="absolute top-2 left-2 w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-[#64FFDA] to-[#00D4FF] transition-all duration-100"
                            style={{ width: `${energyLevel}%` }}
                        />
                    </div>
                )}

                {/* Sound wave visualization */}
                {soundWaves.map((wave) => (
                    <div
                        key={wave.id}
                        className="absolute bottom-2 bg-[#64FFDA] opacity-60 animate-pulse"
                        style={{
                            left: `${10 + wave.id * 15}%`,
                            width: '2px',
                            height: `${wave.amplitude}px`,
                            animationDelay: `${wave.delay}s`,
                            animationDuration: `${wave.frequency}s`,
                        }}
                    />
                ))}

                {/* Holographic scan line */}
                <div className={`absolute inset-0 transition-all duration-2000 ${
                    isHovered 
                        ? 'bg-gradient-to-b from-transparent via-[#64FFDA15] to-transparent animate-pulse' 
                        : 'opacity-0'
                }`} style={{
                    background: isHovered ? 
                        `linear-gradient(to bottom, transparent 0%, rgba(100,255,218,0.1) ${energyLevel}%, transparent 100%)` : 
                        'transparent'
                }} />

                {/* Dynamic border glow */}
                <div className={`absolute inset-0 rounded-lg transition-all duration-500 pointer-events-none ${
                    isHovered 
                        ? 'shadow-[inset_0_0_30px_rgba(100,255,218,0.3)] animate-pulse' 
                        : ''
                }`} />

                {/* Quick Action Menu with enhanced effects */}
                <Menu opened={menuOpened} onChange={setMenuOpened} position="bottom-end">
                    <Menu.Target>
                        <Tooltip label="Quick Actions" position="left">
                            <Button 
                                variant="subtle" 
                                size="compact-xs"
                                className={`absolute top-3 right-3 !text-[#64FFDA] transition-all duration-500 hover:!bg-[#64FFDA25] z-20 !border-[#64FFDA40] border backdrop-blur-sm transform ${
                                    isHovered ? 'opacity-100 translate-y-0 rotate-0 scale-110' : 'opacity-0 translate-y-4 rotate-90 scale-75'
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setMenuOpened(true);
                                    triggerPulseRings();
                                }}
                            >
                                <span className={`transition-all duration-300 ${menuOpened ? 'rotate-180 scale-125' : ''}`}>
                                    <div className="relative">
                                        ⚡
                                        <div className="absolute -inset-1 bg-[#64FFDA] opacity-30 rounded-full animate-ping" />
                                    </div>
                                </span>
                            </Button>
                        </Tooltip>
                    </Menu.Target>
                    <Menu.Dropdown className="!bg-bgColor !border-[#64FFDA40] backdrop-blur-md animate-in slide-in-from-top-4 fade-in duration-300 !shadow-[0_20px_40px_rgba(100,255,218,0.3)]">
                        {props.live && (
                            <Menu.Item 
                                className="!text-white hover:!bg-[#64FFDA15] hover:!text-[#64FFDA] transition-all duration-300 hover:scale-105 hover:translate-x-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(props.link, '_blank');
                                }}
                            >
                                <span className="animate-bounce inline-block mr-3 text-lg">🚀</span> 
                                <span className="font-semibold">Live Demo</span>
                            </Menu.Item>
                        )}
                        {props.github && (
                            <Menu.Item 
                                className="!text-white hover:!bg-[#64FFDA15] hover:!text-[#64FFDA] transition-all duration-300 hover:scale-105 hover:translate-x-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(props.github, '_blank');
                                }}
                            >
                                <span className="animate-pulse inline-block mr-3 text-lg">💻</span> 
                                <span className="font-semibold">Source Code</span>
                            </Menu.Item>
                        )}
                        <Menu.Item 
                            className="!text-white hover:!bg-[#64FFDA15] hover:!text-[#64FFDA] transition-all duration-300 hover:scale-105 hover:translate-x-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                open();
                            }}
                        >
                            <span className="animate-spin inline-block mr-3 text-lg">⚙️</span> 
                            <span className="font-semibold">Full Details</span>
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>

                {/* Enhanced image section */}
                <Card.Section className="p-3 relative overflow-hidden">
                    <div className="relative overflow-hidden rounded-xl">
                        <Image
                            className={`!rounded-xl transition-all duration-1000 ease-out transform-gpu ${
                                imageLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-30 blur-lg scale-110'
                            } ${
                                isHovered 
                                    ? '!shadow-[0_20px_40px_rgba(100,255,218,0.5)] brightness-125 contrast-125 saturate-150' 
                                    : '!shadow-[0_10px_25px_rgba(100,255,218,0.3)]'
                            } ${glitchActive ? 'hue-rotate-180' : ''}`}
                            src={props.image}
                            alt={props.image}
                            onLoad={() => setImageLoaded(true)}
                        />
                        
                        {/* Enhanced loading animation */}
                        {!imageLoaded && (
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-xl flex items-center justify-center">
                                <div className="relative">
                                    <div className="w-12 h-12 border-4 border-[#64FFDA20] rounded-full"></div>
                                    <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-[#64FFDA] rounded-full animate-spin"></div>
                                    <div className="absolute top-1 left-1 w-10 h-10 border-4 border-transparent border-t-[#64FFDA80] rounded-full animate-spin animate-reverse"></div>
                                    <div className="absolute top-2 left-2 w-8 h-8 border-4 border-transparent border-t-[#00D4FF] rounded-full animate-spin"></div>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <Progress value={loadingProgress} color="#64FFDA" size="xs" />
                                    <Text size="xs" c="dimmed" className="mt-2 text-center">
                                        Loading... {Math.round(loadingProgress)}%
                                    </Text>
                                </div>
                            </div>
                        )}

                        {/* Multiple shimmer effects */}
                        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#64FFDA40] to-transparent rounded-xl transform -skew-x-12 transition-all duration-2000 ${
                            isHovered ? 'translate-x-full opacity-100' : '-translate-x-full opacity-0'
                        }`} style={{ width: '40%' }} />
                        
                        <div className={`absolute inset-0 bg-gradient-to-l from-transparent via-[#00D4FF30] to-transparent rounded-xl transform skew-x-12 transition-all duration-1500 ${
                            isHovered ? 'translate-x-full opacity-100' : '-translate-x-full opacity-0'
                        }`} style={{ width: '30%', animationDelay: '0.5s' }} />
                        
                        {/* Holographic overlay with mouse tracking */}
                        <div 
                            className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                                isHovered ? 'opacity-100' : 'opacity-0'
                            }`}
                            style={{
                                background: isHovered ? 
                                    `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(100,255,218,0.2) 0%, transparent 50%)` : 
                                    'transparent'
                            }}
                        />
                    </div>
                </Card.Section>

                <div className="relative z-10">
                    {/* Enhanced title section */}
                    <Group justify="space-between" mt="xs" mb="xs">
                        <div className="!text-2xl gap-3 !font-bold !text-white flex items-center sm-mx:!text-xl">
                            <span className={`transition-all duration-500 transform ${
                                isHovered ? 'text-[#64FFDA] drop-shadow-[0_0_10px_rgba(100,255,218,0.8)] animate-pulse' : ''
                            } ${glitchActive ? 'animate-bounce text-[#FF6B6B]' : ''}`}>
                                {props.title}
                            </span>
                            {props.live === true && (
                                <Badge 
                                    className="!px-3 !bg-red-500/20 !border-red-400 animate-pulse hover:animate-bounce transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-400/50" 
                                    variant="outline" 
                                    color="red" 
                                    rightSection={
                                        <div className="relative">
                                            <Indicator 
                                                className="!mr-1 !z-0 animate-pulse" 
                                                color="red" 
                                                position="middle-end" 
                                                size={8}
                                            />
                                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-400 rounded-full opacity-75 animate-ping" />
                                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                                            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-600 rounded-full" />
                                        </div>
                                    }
                                >
                                    <span className="font-bold tracking-wider">LIVE</span>
                                </Badge>
                            )}
                        </div>
                    </Group>

                    {/* Ultra-enhanced technology badges */}
                    <Group mb="sm" className="!gap-3">
                        {props.technologies.map((tech: string, index: number) => 
                            index < 3 && (
                                <Tooltip key={index} label={`Click to filter by ${tech}`} position="top">
                                    <Badge 
                                        size={badge} 
                                        variant="light" 
                                        className={`cursor-pointer transition-all duration-500 transform !bg-gradient-to-r !from-[#64FFDA15] !to-[#00D4FF15] !text-[#64FFDA] !border-[#64FFDA40] border-2 hover:!bg-gradient-to-r hover:!from-[#64FFDA30] hover:!to-[#00D4FF30] hover:!border-[#64FFDA] hover:!text-white hover:scale-125 hover:rotate-6 hover:shadow-lg hover:shadow-[#64FFDA50] active:scale-90 active:rotate-0 ${
                                            glitchActive ? 'animate-bounce hue-rotate-180' : ''
                                        }`}
                                        onClick={(e) => handleTechClick(tech, e)}
                                        style={{
                                            animationDelay: `${index * 150}ms`,
                                        }}
                                    >
                                        <span className="font-semibold tracking-wide">
                                            {tech}
                                        </span>
                                    </Badge>
                                </Tooltip>
                            )
                        )}
                        {props.technologies.length > 3 && (
                            <Tooltip label="View all technologies" position="top">
                                <Badge 
                                    size={badge} 
                                    variant="outline" 
                                    className="cursor-pointer transition-all duration-500 !border-[#64FFDA60] !text-[#64FFDA80] hover:!bg-[#64FFDA15] hover:!border-[#64FFDA] hover:!text-[#64FFDA] hover:scale-125 hover:-rotate-3 animate-pulse hover:shadow-lg hover:shadow-[#64FFDA30]"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        open();
                                    }}
                                >
                                    <span className="font-bold">
                                        +{props.technologies.length - 3} more
                                    </span>
                                </Badge>
                            </Tooltip>
                        )}
                    </Group>

                    {/* Advanced text section with multiple effects */}
                    <div className="relative">
                        <Text 
                            className={`!text-justify !text-sm xs-mx:!text-xs transition-all duration-700 cursor-pointer relative overflow-hidden ${
                                showFullDesc ? 'max-h-none' : ''
                            } ${isHovered && !showFullDesc ? '!text-gray-300' : ''} ${
                                glitchActive ? 'animate-pulse text-[#00D4FF]' : ''
                            }`} 
                            lineClamp={showFullDesc ? undefined : 4}
                            size="sm" 
                            c="dimmed"
                            onClick={handleDescClick}
                        >
                            {props.desc}
                            {props.desc.length > 150 && (
                                <span className={`text-[#64FFDA80] ml-2 text-xs font-bold hover:text-[#64FFDA] transition-all duration-300 inline-flex items-center gap-1 animate-pulse hover:animate-bounce`}>
                                    {showFullDesc ? (
                                        <>
                                            <span className="animate-bounce">↑</span> 
                                            <span className="tracking-wider">COLLAPSE</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="animate-bounce">↓</span> 
                                            <span className="tracking-wider">EXPAND</span>
                                        </>
                                    )}
                                </span>
                            )}
                        </Text>
                        
                        {/* Text enhancement effects */}
                        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#64FFDA15] to-transparent transform -skew-x-12 transition-all duration-1500 pointer-events-none ${
                            showFullDesc ? 'translate-x-full opacity-100' : '-translate-x-full opacity-0'
                        }`} style={{ width: '40%' }} />
                    </div>

                    {/* Ultimate button with multiple effects */}
                    <Button 
                        onClick={open} 
                        className={`transition-all duration-700 transform hover:!bg-gradient-to-r hover:!from-[#64FFDA] hover:!to-[#00D4FF] hover:!text-bgColor !border-[#64FFDA80] hover:!border-[#64FFDA] group/btn relative overflow-hidden !font-bold ${
                            isHovered ? 'shadow-lg shadow-[#64FFDA30] animate-pulse' : ''
                        } ${glitchActive ? 'animate-bounce hue-rotate-180' : ''}`}
                        color="#64FFDA" 
                        variant="outline" 
                        mt="md" 
                        radius="md"
                        fullWidth
                        size="md"
                    >
                        {/* Multiple button effects */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 transition-all duration-1500 group-hover/btn:translate-x-full group-hover/btn:opacity-100 -translate-x-full opacity-0" />
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#00D4FF30] to-transparent transform skew-x-12 transition-all duration-1000 group-hover/btn:translate-x-full group-hover/btn:opacity-100 -translate-x-full opacity-0" />
                        
                        <span className="flex items-center justify-center gap-3 relative z-10">
                            <span className="transition-all duration-500 group-hover/btn:animate-pulse group-hover/btn:tracking-widest font-bold">
                                EXPLORE PROJECT
                            </span>
                            <span className={`text-xl transition-all duration-500 transform group-hover/btn:translate-x-3 group-hover/btn:scale-125 group-hover/btn:rotate-12 ${
                                isHovered ? 'animate-bounce text-2xl' : ''
                            }`}>
                                🚀
                            </span>
                        </span>

                        {/* Button glow effect */}
                        <div className="absolute inset-0 rounded-md transition-all duration-500 group-hover/btn:shadow-[inset_0_0_20px_rgba(100,255,218,0.5)] opacity-0 group-hover/btn:opacity-100" />
                    </Button>
                </div>

                {/* Ultimate glow and energy effects */}
                <div className={`absolute inset-0 rounded-lg transition-all duration-1000 pointer-events-none ${
                    isHovered 
                        ? 'shadow-[inset_0_0_40px_rgba(100,255,218,0.25)] animate-pulse' 
                        : ''
                }`} />

                {/* Cyberpunk scan lines */}
                <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                }`}>
                    {Array.from({ length: 5 }, (_, i) => (
                        <div
                            key={i}
                            className="absolute w-full h-px bg-[#64FFDA] opacity-20"
                            style={{
                                top: `${(i + 1) * 20}%`,
                                animationDelay: `${i * 0.2}s`,
                            }}
                        />
                    ))}
                </div>
            </Card>
            
            <FullProjectModal 
                opened={opened} 
                close={close} 
                title={props.title} 
                desc={props.desc} 
                image={props.image} 
                live={props.live} 
                link={props.link} 
                github={props.github} 
                technologies={props.technologies} 
            />
        </div>
    );
};

export default ProjectCard;
