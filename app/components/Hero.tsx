// "use client"
// import React from 'react'
// import { useTypewriter, Cursor} from 'react-simple-typewriter';
// import { CheckCircle, Lock, ShoppingBag } from "lucide-react";

// const Hero: React.FC = () => {
//     const [text] = useTypewriter({
//         words: [
//       "Instant Payouts,\nFull Control, No Limits",
//       "Buy Once, Download\n Anytime, Keep Forever",
//       "Discover, Buy, and Sell\n Digital Products",
//       "Sell for Free,\nPay Only When You Earn",
//     ],
//         loop:0,
//         delaySpeed: 2000,   
//     });
//   return (
//     <section className="flex flex-col items-center justify-center h-screen bg-black text-white px-6 space-y-9">
//       {/* Heading */}
//       <h1 className="text-5xl md:text-5xl font-extrabold text-center leading-tight whitespace-pre-line">
//         {text}
//         <Cursor cursorColor="white" />
//       </h1>

//       {/* Subheading */}
//       <p className="text-lg md:text-xl text-gray-400 text-center max-w-2xl">
//         Your one-stop digital platform for 3D models and digital creations.Join our community of creators and collectors today.
//       </p>
//       <button
//       className="px-8 py-3 border border-gray-600 rounded-full text-white font-semibold text-base hover:border-gray-400 transition"
//     >
//       Explore all products
//     </button>
//     </section>
//   )
// }

// export default Hero

// // Instant Payouts,
// // Full Control, No Limits|

// // Buy Once, Download 
// // Anytime, Keep Forever|

// // Discover, Buy, and Sell
// // Digital Products|

// // Sell for Free,
// // Pay Only When You Earn|

"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { 
  Download, 
  Music, 
  Heart, 
  ShoppingBag, 
  Star, 
  Headphones,
  Tag,
  Upload,
  Search,
  Zap,
  Grid3X3,
  Box
} from "lucide-react";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Bubble data with icons and positions
const bubbleData = [
  { id: 1, icon: Download, x: 10, y: 20, color: 'hero-bubble-icon', delay: 0 },
  { id: 2, icon: Music, x: 85, y: 15, color: 'hero-bubble-icon-alt', delay: 0.5 },
  { id: 3, icon: Heart, x: 15, y: 70, color: 'hero-bubble-icon-red', delay: 1 },
  { id: 4, icon: ShoppingBag, x: 90, y: 75, color: 'hero-bubble-icon-green', delay: 1.5 },
  { id: 5, icon: Star, x: 20, y: 45, color: 'hero-bubble-icon', delay: 2 },
  { id: 6, icon: Headphones, x: 75, y: 45, color: 'hero-bubble-icon-alt', delay: 2.5 },
  { id: 7, icon: Tag, x: 5, y: 50, color: 'hero-bubble-icon', delay: 3 },
  { id: 8, icon: Upload, x: 95, y: 35, color: 'hero-bubble-icon-green', delay: 3.5 },
  { id: 9, icon: Search, x: 80, y: 25, color: 'hero-bubble-icon-alt', delay: 4 },
  { id: 10, icon: Zap, x: 25, y: 25, color: 'hero-bubble-icon', delay: 4.5 },
  { id: 11, icon: Grid3X3, x: 85, y: 60, color: 'hero-bubble-icon-red', delay: 5 },
  { id: 12, icon: Box, x: 30, y: 80, color: 'hero-bubble-icon-green', delay: 5.5 },
];

interface FloatingBubbleProps {
  bubble: typeof bubbleData[0];
  index: number;
}

const FloatingBubble: React.FC<FloatingBubbleProps> = ({ bubble, index }) => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const IconComponent = bubble.icon;

  // Framer Motion scroll-based animations
  const { scrollYProgress } = useScroll();
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  // Create smooth spring animations for better performance
  const scaleSpring = useSpring(1, springConfig);
  const opacitySpring = useSpring(0.8, springConfig);
  const rotateSpring = useSpring(0, springConfig);

  useEffect(() => {
    const element = bubbleRef.current;
    if (!element) return;

    // Enhanced GSAP entrance animation with better easing
    const entranceTl = gsap.timeline();
    
    entranceTl
      .fromTo(element, 
        { 
          scale: 0,
          opacity: 0,
          rotation: 180,
          y: 100
        },
        {
          scale: 1,
          opacity: 0.8,
          rotation: 0,
          y: 0,
          duration: 1.2,
          delay: bubble.delay * 0.15,
          ease: "elastic.out(1, 0.5)"
        }
      )
      .to(element, {
        rotation: bubble.id % 2 === 0 ? 360 : -360,
        duration: 20,
        repeat: -1,
        ease: "none"
      }, "-=0.5");

    // Enhanced scroll-triggered animations with GSAP + Framer Motion combo
    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: "top 90%",
      end: "bottom 10%",
      scrub: 2, // Smoother scrub value
      onUpdate: (self) => {
        const progress = self.progress;
        const buttonElement = document.querySelector('.hero-button');
        
        if (buttonElement) {
          const buttonRect = buttonElement.getBoundingClientRect();
          const elementRect = element.getBoundingClientRect();
          
          // Enhanced calculations for smoother movement
          const originalX = (bubble.x / 100) * window.innerWidth;
          const originalY = (bubble.y / 100) * window.innerHeight;
          const buttonCenterX = buttonRect.left + buttonRect.width / 2;
          const buttonCenterY = buttonRect.top + buttonRect.height / 2;
          
          const directionX = originalX - buttonCenterX;
          const directionY = originalY - buttonCenterY;
          const distance = Math.sqrt(directionX ** 2 + directionY ** 2);
          
          if (progress > 0.1) {
            // SCROLL DOWN: Enhanced scatter with organic movement
            const scatterMultiplier = progress * 2;
            const organicOffsetX = Math.sin(progress * Math.PI * 2 + index) * 50;
            const organicOffsetY = Math.cos(progress * Math.PI * 2 + index) * 30;
            
            gsap.to(element, {
              x: (directionX * scatterMultiplier * 0.4) + organicOffsetX,
              y: (directionY * scatterMultiplier * 0.4) + organicOffsetY,
              scale: 1 + (progress * 0.3),
              opacity: Math.max(0.1, 1 - (progress * 0.8)),
              rotation: `+=${progress * 90}`,
              duration: 0.4,
              ease: "power2.out"
            });
            
            // Update Framer Motion springs for additional effects
            scaleSpring.set(1 + (progress * 0.3));
            opacitySpring.set(Math.max(0.1, 1 - (progress * 0.8)));
            rotateSpring.set(progress * 180);
            
          } else {
            // SCROLL UP: Enhanced convergence with magnetic effect
            const convergeProgress = 1 - progress;
            const magneticForce = Math.min(1, distance / 200);
            
            gsap.to(element, {
              x: -directionX * (1 - convergeProgress) * 0.5 * magneticForce,
              y: -directionY * (1 - convergeProgress) * 0.5 * magneticForce,
              scale: Math.max(0.8, 1 - ((1 - convergeProgress) * 0.4)),
              opacity: 0.7 + (convergeProgress * 0.3),
              rotation: 0,
              duration: 0.6,
              ease: "elastic.out(1.2, 0.4)"
            });
            
            // Reset springs
            scaleSpring.set(1);
            opacitySpring.set(0.8);
            rotateSpring.set(0);
          }
        }
      }
    });

    // Cleanup
    return () => {
      scrollTrigger.kill();
      entranceTl.kill();
    };
  }, [bubble.delay, bubble.x, bubble.y, bubble.id, index, scaleSpring, opacitySpring, rotateSpring]);

  return (
    <motion.div
      ref={bubbleRef}
      className={`absolute text-white w-12 h-12 md:w-16 md:h-16 rounded-full 
                 bg-hero-bubble-bg/30 backdrop-blur-sm border border-hero-bubble-border/50
                 flex items-center justify-center cursor-pointer
                 transition-all duration-300`}
      style={{
        left: `${bubble.x}%`,
        top: `${bubble.y}%`,
        scale: scaleSpring,
        opacity: opacitySpring,
        rotate: rotateSpring,
      }}
      initial={{ 
        scale: 0, 
        opacity: 0,
        filter: "blur(10px)"
      }}
      animate={{ 
        scale: 1, 
        opacity: 0.8,
        filter: "blur(0px)"
      }}
      transition={{
        duration: 1.2,
        delay: bubble.delay * 0.1,
        ease: [0.68, -0.55, 0.265, 1.55]
      }}
      whileHover={{ 
        scale: 1.3,
        boxShadow: "0 20px 40px rgba(255, 255, 255, 0.15)",
        filter: "brightness(1.2)"
      }}
      whileTap={{ 
        scale: 0.8,
        transition: { duration: 0.1 }
      }}
    >
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <IconComponent 
          className={`w-5 h-5 md:w-6 md:h-6 text-${bubble.color} transition-all duration-300`}
          strokeWidth={1.5}
        />
      </motion.div>
    </motion.div>
  );
};

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Enhanced Framer Motion scroll tracking
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 0.5, 0]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Enhanced typewriter effect with custom timing
  const [text] = useTypewriter({
    words: [
      "Instant Payouts,\nFull Control, No Limits",
      "Buy Once, Download\nAnytime, Keep Forever", 
      "Discover, Buy, and Sell\nDigital Products",
      "Sell for Free,\nPay Only When You Earn",
    ],
    loop: 0,
    delaySpeed: 3000,
    typeSpeed: 60,
    deleteSpeed: 40,
  });

  useEffect(() => {
    const heroElement = heroRef.current;
    const contentElement = contentRef.current;
    
    if (!heroElement || !contentElement) return;

    // Enhanced GSAP timeline with more sophisticated animations
    const masterTl = gsap.timeline();
    
    // Background entrance animation
    masterTl
      .fromTo(heroElement,
        {
          scale: 1.1,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 2,
          ease: "power2.out"
        }
      );

    // Content entrance with staggered animations
    masterTl
      .fromTo(contentElement.children,
        {
          y: 120,
          opacity: 0,
          scale: 0.8,
          rotationY: 45
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.5,
          stagger: {
            amount: 0.6,
            from: "start",
            ease: "power2.out"
          },
          ease: "elastic.out(1, 0.6)"
        },
        "-=1.5"
      );

    // Enhanced parallax with GSAP
    ScrollTrigger.create({
      trigger: heroElement,
      start: "top top",
      end: "bottom top",
      scrub: 1.5,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Dynamic background movement
        gsap.to(heroElement, {
          backgroundPosition: `50% ${progress * 30}%`,
          filter: `brightness(${1 - progress * 0.3})`,
          duration: 0.3
        });
        
        // Content fade and movement
        gsap.to(contentElement, {
          y: -progress * 100,
          opacity: 1 - progress * 0.8,
          scale: 1 - progress * 0.1,
          duration: 0.3
        });
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      masterTl.kill();
    };
  }, []);

  return (
    <motion.section 
      ref={heroRef}
      className="relative text-white min-h-screen flex items-center justify-center overflow-hidden
                 bg-gradient-to-br from-hero-gradient-start via-hero-gradient-middle to-hero-gradient-end"
      style={{
        backgroundSize: '200% 200%',
        backgroundPosition: '50% 0%',
        y: backgroundY,
      }}
    >
      {/* Enhanced animated background overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20"
        style={{ opacity: contentOpacity }}
      />
      
      {/* Floating bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {bubbleData.map((bubble, index) => (
          <FloatingBubble 
            key={bubble.id} 
            bubble={bubble} 
            index={index}
          />
        ))}
      </div>

      {/* Enhanced main content with Framer Motion */}
      <motion.div 
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 space-y-8 max-w-4xl mx-auto"
        style={{
          y: contentY,
          opacity: contentOpacity
        }}
      >
        {/* Enhanced heading with advanced Framer Motion */}
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-hero-text-primary 
                     leading-tight whitespace-pre-line tracking-tight"
          initial={{ opacity: 0, y: 80, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ 
            duration: 1.5, 
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 100,
            damping: 10
          }}
        >
          {text}
          <Cursor cursorColor="hsl(var(--hero-bubble-icon))" />
        </motion.h1>

        {/* Enhanced subtitle with staggered animation */}
        <motion.p 
          className="text-lg md:text-xl lg:text-2xl text-hero-text-secondary 
                     max-w-3xl leading-relaxed font-medium"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.4, 
            ease: [0.23, 1, 0.32, 1]
          }}
        >
          Your one-stop digital platform for 3D models and digital creations.
          Join our community of creators and collectors today.
        </motion.p>

        {/* Enhanced CTA Button with complex animations */}
        <motion.button
          className="hero-button px-8 py-4 md:px-10 md:py-5 
                     border border-hero-button-border rounded-full 
                     text-hero-text-primary font-semibold text-base md:text-lg
                     hover:border-hero-button-hover hover:bg-hero-button-hover/10
                     backdrop-blur-sm transition-all duration-500
                     shadow-lg hover:shadow-xl overflow-hidden relative"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1.3, 
            delay: 0.8, 
            ease: [0.68, -0.55, 0.265, 1.55]
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 25px 50px rgba(255, 255, 255, 0.15)",
            y: -3,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          whileTap={{ 
            scale: 0.95,
            transition: { duration: 0.1 }
          }}
          aria-label="Explore all products"
        >
          {/* Button shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "linear"
            }}
          />
          Explore all products
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default Hero;