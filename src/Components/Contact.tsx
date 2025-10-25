import { useState, useRef, useEffect } from "react";
import { Button, useMatches, Loader, Progress, Tooltip } from "@mantine/core";
import { IconTopologyStar3, IconSend, IconCheck, IconMail, IconMapPin, IconClock } from "@tabler/icons-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase";
import toast from "react-hot-toast";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { validateForm } from "./Validation";
import FloatingInput from "./FloatingInput";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const form = {
        name: "",
        email: "",
        phone: "",
        message: ""
    };
    
    const [formData, setFormData] = useState<{ [key: string]: string }>(form);
    const [formError, setFormError] = useState<{ [key: string]: string }>(form);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitProgress, setSubmitProgress] = useState(0);
    
    // Refs for smooth animations
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const inputRefs = useRef<(HTMLDivElement | null)[]>([]);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const successRef = useRef<HTMLDivElement>(null);
    
    const btn = useMatches({
        xsm: 'xs',
        sm: "sm",
        md: 'md',
        lg: "lg"
    });

    // Optimized entrance animations
    useEffect(() => {
        const container = containerRef.current;
        const title = titleRef.current;
        const formContainer = formRef.current;
        const validInputs = inputRefs.current.filter(ref => ref !== null);
        const button = buttonRef.current;

        if (!container || !title || !formContainer || !button) return;

        const ctx = gsap.context(() => {
            gsap.set([title, formContainer, ...validInputs, button], { 
                opacity: 0,
                visibility: "hidden",
                willChange: "transform"
            });

            gsap.set(title, { y: -50, scale: 0.95 });
            gsap.set(formContainer, { y: 80, scale: 0.98 });
            gsap.set(validInputs, { x: -40, scale: 0.98 });
            gsap.set(button, { y: 40, scale: 0.95 });

            const masterTL = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top 90%",
                    end: "bottom top",
                    toggleActions: "play none none reverse",
                    invalidateOnRefresh: true,
                    anticipatePin: 1
                },
                defaults: {
                    ease: "power2.out",
                    duration: 0.8
                }
            });

            masterTL
                .to([title, formContainer, ...validInputs, button], {
                    opacity: 1,
                    visibility: "visible",
                    duration: 0.1
                })
                .to(title, {
                    y: 0,
                    scale: 1,
                    duration: 0.6
                })
                .to(formContainer, {
                    y: 0,
                    scale: 1,
                    duration: 0.6
                }, "-=0.4")
                .to(validInputs, {
                    x: 0,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.1
                }, "-=0.4")
                .to(button, {
                    y: 0,
                    scale: 1,
                    duration: 0.4
                }, "-=0.3")
                .set([title, formContainer, ...validInputs, button], {
                    willChange: "auto"
                });

        }, container);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    // ✅ UPDATED: Skip phone validation entirely
    const handleChange = (id: string, value: string) => {
        setFormData({ ...formData, [id]: value });
        
        // Skip validation for phone field completely
        if (id === 'phone') {
            setFormError({ ...formError, [id]: "" });
            return;
        }
        
        // Validate other fields (name, email, message)
        const error = validateForm(id, value);
        setFormError({ ...formError, [id]: error });
        
        const fieldIndex = Object.keys(form).indexOf(id);
        const fieldElement = inputRefs.current[fieldIndex];
        
        if (fieldElement) {
            gsap.killTweensOf(fieldElement);
            
            if (error.length === 0 && value.length > 0) {
                gsap.timeline()
                    .to(fieldElement, {
                        scale: 1.02,
                        boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)",
                        duration: 0.3,
                        ease: "power2.out"
                    })
                    .to(fieldElement, {
                        scale: 1,
                        boxShadow: "0 0 10px rgba(34, 197, 94, 0.1)",
                        duration: 0.4,
                        ease: "power2.out"
                    });
            } else if (error.length > 0) {
                gsap.to(fieldElement, {
                    x: 5,
                    duration: 0.1,
                    ease: "power2.out",
                    yoyo: true,
                    repeat: 3,
                    onComplete: () => { gsap.set(fieldElement, { x: 0 }); }
                });
            }
        }
    };

    // ✅ UPDATED: Skip phone validation in submission
    const handleSubmit = async () => {
        let valid = true;
        let newFormError: { [key: string]: string } = {};
        
        // Validate all fields EXCEPT phone
        for (let key in formData) {
            if (key === 'phone') continue; // Skip phone validation
            
            const error = validateForm(key, formData[key]);
            if (error.length > 0) {
                newFormError[key] = error;
                valid = false;
            }
        }
        
        setFormError(newFormError);
        
        if (!valid) {
            if (formRef.current) {
                gsap.to(formRef.current, {
                    x: 10,
                    duration: 0.1,
                    ease: "power2.out",
                    yoyo: true,
                    repeat: 3,
                    onComplete: () => { gsap.set(formRef.current, { x: 0 }); }
                });
            }
            toast.error('Please fix the errors before submitting!', { duration: 4000 });
            return;
        }

        setIsSubmitting(true);
        setSubmitProgress(0);

        try {
            gsap.to({ progress: 0 }, {
                progress: 100,
                duration: 2,
                ease: "power1.out",
                onUpdate: function() {
                    setSubmitProgress(Math.floor(this.targets()[0].progress));
                }
            });

            await addDoc(collection(db, "portfolio"), {
                ...formData,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            });

            setIsSuccess(true);
            setFormData(form);
            
            if (formRef.current) {
                gsap.timeline()
                    .to(formRef.current, {
                        scale: 1.05,
                        boxShadow: "0 0 40px rgba(34, 197, 94, 0.5)",
                        duration: 0.4,
                        ease: "power2.out"
                    })
                    .to(formRef.current, {
                        scale: 1,
                        duration: 0.5,
                        ease: "power2.out"
                    });
            }

            toast.success('Message sent successfully! 🎉 I will get back to you soon!', { duration: 5000 });

            setTimeout(() => {
                if (successRef.current) {
                    gsap.to(successRef.current, {
                        opacity: 0,
                        y: -20,
                        duration: 0.4,
                        ease: "power2.out",
                        onComplete: () => { setIsSuccess(false); }
                    });
                }
            }, 4000);

        } catch (error) {
            console.error("Error submitting form: ", error);
            toast.error('Failed to send message. Please try again later.', { duration: 4000 });
        } finally {
            setIsSubmitting(false);
            setSubmitProgress(0);
        }
    };

    return (
        <div 
            ref={containerRef} 
            className="px-16 md-mx:px-8 sm-mx:px-4 mx-20 lg-mx:mx-10 md-mx:mx-0 my-20 font-mono" 
            id="Contact"
        >
            {/* Title */}
            <h1 
                ref={titleRef}
                className="text-5xl sm-mx:text-4xl xs-mx:text-3xl mb-16 font-black text-center text-white cursor-pointer relative"
                onMouseEnter={() => {
                    gsap.to(titleRef.current, {
                        scale: 1.05,
                        color: "#64FFDA",
                        textShadow: "0 0 30px #64FFDA",
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }}
                onMouseLeave={() => {
                    gsap.to(titleRef.current, {
                        scale: 1,
                        color: "#ffffff",
                        textShadow: "none",
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }}
            >
                <span className="text-primaryColor animate-pulse">06.&nbsp;</span>
                <span className="relative">
                    Contact Me
                    <div className="absolute -inset-4 bg-gradient-to-r from-primaryColor/20 via-blue-500/20 to-primaryColor/20 opacity-0 hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10" />
                </span>
            </h1>

            {/* Form container */}
            <div 
                ref={formRef}
                className={`w-[70%] lg-mx:w-full m-auto flex flex-col gap-8 border-2 p-12 rounded-3xl sm-mx:p-8 relative overflow-hidden transition-all duration-500 ${
                    isSuccess 
                        ? 'bg-gradient-to-br from-green-900/30 via-green-800/20 to-green-900/30 border-green-400 shadow-[0_0_40px_0_rgba(34,197,94,0.6)]' 
                        : 'bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 border-primaryColor shadow-[0_0_30px_0_#64FFDA50]'
                } backdrop-blur-sm hover:shadow-[0_0_50px_0_#64FFDA70] group`}
            >
                {/* Background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-primaryColor/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                {/* Header */}
                <div className="text-4xl flex gap-4 items-center text-white font-black sm-mx:text-3xl xs-mx:text-2xl relative z-10">
                    <span className="bg-gradient-to-r from-primaryColor via-blue-400 to-primaryColor bg-clip-text text-transparent">
                        Let&apos;s Connect
                    </span>
                    <div className="relative">
                        <IconTopologyStar3 
                            className="w-14 text-primaryColor h-14 sm-mx:w-10 sm-mx:h-10 transition-transform duration-500 hover:rotate-180 hover:scale-110" 
                        />
                        <div className="absolute -inset-3 bg-primaryColor rounded-full opacity-20 animate-pulse" />
                    </div>
                </div>

                {/* Progress bar */}
                {isSubmitting && (
                    <div className="relative z-10 space-y-3">
                        <Progress 
                            value={submitProgress} 
                            color="#64FFDA" 
                            size="lg" 
                            radius="xl"
                            striped 
                            animated 
                            className="shadow-lg"
                        />
                        <div className="text-center text-primaryColor font-bold flex items-center justify-center gap-3 text-lg">
                            <Loader size="md" color="#64FFDA" />
                            <span>Sending your message...</span>
                            <span className="text-xl">{submitProgress}%</span>
                        </div>
                    </div>
                )}

                {/* Form fields */}
                <div className="relative z-10 space-y-8">
                    {Object.keys(form).map((key, index) => (
                        <div 
                            key={key}
                            ref={el => inputRefs.current[index] = el}
                            className="transition-all duration-300"
                        >
                            <FloatingInput 
                                id={key} 
                                name={
                                    key === 'phone' ? 'Phone Number (Optional - Any Format)' :
                                    key === 'message' ? 'Your Message' :
                                    key.charAt(0).toUpperCase() + key.slice(1)
                                }
                                value={formData[key]} 
                                handleChange={handleChange}  
                                error={formError[key]}
                            />
                            {key === 'phone' && (
                                <div className="mt-2 text-sm text-primaryColor/70">
                                    💡 Enter your phone number in any format - no validation required
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Submit button */}
                <Button 
                    ref={buttonRef}
                    fullWidth 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                    rightSection={
                        isSubmitting ? (
                            <div className="flex items-center gap-2">
                                <Loader size="sm" color="white" />
                                <span className="text-xs">Processing...</span>
                            </div>
                        ) : isSuccess ? (
                            <IconCheck size={24} className="animate-bounce text-green-300" />
                        ) : (
                            <IconSend size={20} className="transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
                        )
                    }
                    className={`!font-black !text-lg transition-all duration-500 group relative overflow-hidden ${
                        isSuccess 
                            ? '!bg-green-500 hover:!bg-green-400 !text-white shadow-[0_0_30px_rgba(34,197,94,0.6)]' 
                            : '!bg-primaryColor hover:!bg-primaryColor/90 !text-bgColor shadow-[0_0_25px_rgba(100,255,218,0.5)]'
                    } hover:scale-105 active:scale-95`}
                    variant="filled" 
                    size={btn} 
                    radius="xl"
                    color={isSuccess ? "#22c55e" : "#64FFDA"}
                >
                    <span className="relative z-10 flex items-center gap-3">
                        {isSubmitting ? (
                            <>
                                <span>Sending Message</span>
                                <div className="flex gap-1">
                                    {[0, 200, 400].map((delay, i) => (
                                        <div 
                                            key={i}
                                            className="w-2 h-2 bg-white rounded-full animate-bounce" 
                                            style={{ animationDelay: `${delay}ms` }} 
                                        />
                                    ))}
                                </div>
                            </>
                        ) : isSuccess ? (
                            <span className="text-xl">Message Sent Successfully! ✨</span>
                        ) : (
                            <span className="text-xl">Send Message</span>
                        )}
                    </span>
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-800" />
                </Button>

                {/* Success indicator */}
                {isSuccess && (
                    <div 
                        ref={successRef}
                        className="text-center text-green-400 font-bold text-lg flex items-center justify-center gap-3 bg-green-900/20 p-4 rounded-2xl border border-green-400/30"
                    >
                        <IconCheck className="animate-bounce text-green-300" size={24} />
                        <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                            Your message has been received! I will respond within 24 hours.
                        </span>
                        <IconCheck className="animate-bounce text-green-300" size={24} style={{ animationDelay: '0.5s' }} />
                    </div>
                )}

                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primaryColor/20 to-blue-500/20 rounded-full blur-2xl opacity-60" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-blue-500/20 to-primaryColor/20 rounded-full blur-2xl opacity-60" />
            </div>

            {/* Contact information cards */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                    { 
                        icon: IconMail, 
                        title: "Email Response", 
                        info: "Within 24 hours", 
                        detail: "yash237yash@gmail.com",
                        color: "from-blue-500/20 to-cyan-500/20",
                        hoverColor: "hover:border-blue-400"
                    },
                    { 
                        icon: IconMapPin, 
                        title: "Location", 
                        info: "Available worldwide", 
                        detail: "Remote work preferred",
                        color: "from-purple-500/20 to-pink-500/20",
                        hoverColor: "hover:border-purple-400"
                    },
                    { 
                        icon: IconClock, 
                        title: "Availability", 
                        info: "Mon-Fri, 9AM-6PM", 
                        detail: "Your timezone",
                        color: "from-orange-500/20 to-red-500/20",
                        hoverColor: "hover:border-orange-400"
                    }
                ].map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <Tooltip key={index} label={item.detail} position="top">
                            <div 
                                className={`p-8 rounded-3xl border border-primaryColor/30 bg-gradient-to-br ${item.color} ${item.hoverColor} backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer group`}
                            >
                                <div className="text-center">
                                    <IconComponent className="w-12 h-12 text-primaryColor mb-4 mx-auto group-hover:animate-bounce transition-all duration-300" />
                                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-primaryColor font-semibold mb-1">{item.info}</p>
                                    <p className="text-textColor text-sm group-hover:text-primaryColor transition-colors duration-300">{item.detail}</p>
                                </div>
                            </div>
                        </Tooltip>
                    );
                })}
            </div>

            {/* Call-to-action */}
            <div className="mt-16 text-center space-y-6">
                <p className="text-textColor text-xl mb-6 leading-relaxed">
                    Ready to bring your ideas to life? Let&apos;s discuss your project and create something amazing together!
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                    <span className="px-6 py-3 bg-primaryColor/10 text-primaryColor rounded-full border border-primaryColor/30 hover:bg-primaryColor/20 hover:scale-105 transition-all duration-300 cursor-pointer font-semibold">
                        💼 Available for Projects
                    </span>
                    <span className="px-6 py-3 bg-green-500/10 text-green-400 rounded-full border border-green-500/30 hover:bg-green-500/20 hover:scale-105 transition-all duration-300 cursor-pointer font-semibold">
                        🚀 Fast Response Guaranteed
                    </span>
                    <span className="px-6 py-3 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/30 hover:bg-blue-500/20 hover:scale-105 transition-all duration-300 cursor-pointer font-semibold">
                        ⭐ Quality Work Assured
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Contact;
