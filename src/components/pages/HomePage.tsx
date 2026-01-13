// HPI 1.6-V
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Users, MapPin, Camera, BookOpen, Stethoscope, Heart, Star, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';

// --- Utility Components ---

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          element.classList.add('is-visible');
        }, delay);
        observer.unobserve(element);
      }
    }, { threshold: 0.1 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return <div ref={ref} className={`opacity-0 translate-y-8 transition-all duration-1000 ease-out ${className || ''}`}>{children}</div>;
};

// --- Main Component ---

export default function HomePage() {
  const { isAuthenticated, actions } = useMember();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Canonical Data Sources
  const features = [
    {
      icon: Users,
      title: 'Pet Communities',
      description: 'Connect with fellow pet owners who share your passion.',
      link: '/communities',
      image: 'https://static.wixstatic.com/media/161bc2_87726f0411eb44b59da860c6e2a81dd0~mv2.png?originWidth=768&originHeight=960',
      rotation: '-6deg'
    },
    {
      icon: MapPin,
      title: 'Pet Map',
      description: 'Discover nearby pet owners and arrange playdates.',
      link: '/pet-map',
      image: 'https://static.wixstatic.com/media/161bc2_9760ad1d115443618b494bc98b80bd74~mv2.png?originWidth=768&originHeight=960',
      rotation: '0deg'
    },
    {
      icon: Camera,
      title: 'Photo Gallery',
      description: 'Share adorable moments and browse memories.',
      link: '/gallery',
      image: 'https://static.wixstatic.com/media/161bc2_080ee04130854f2b8ee198faa2c84a12~mv2.png?originWidth=768&originHeight=960',
      rotation: '6deg'
    },
  ];

  const services = [
    {
      icon: BookOpen,
      title: 'Behavioral Resources',
      description: 'Expert guidance on common pet behavioral challenges and solutions.',
      link: '/resources',
      image: 'https://static.wixstatic.com/media/161bc2_796b55f2ee154ff8ab63b18aba2ab350~mv2.png?originWidth=1152&originHeight=640'
    },
    {
      icon: Stethoscope,
      title: 'Veterinary Directory',
      description: 'Connect with certified veterinarians for online consultations and emergency care.',
      link: '/vets',
      image: 'https://static.wixstatic.com/media/161bc2_e9bf4e64a2fe42a99a52f0b4d96b1fef~mv2.png?originWidth=1152&originHeight=640'
    },
    {
      icon: Heart,
      title: 'Follow Pet Owners',
      description: 'Stay updated with your favorite pet owners and their adorable companions.',
      link: '/communities',
      image: 'https://static.wixstatic.com/media/161bc2_26d33c34a7434dfe8448072f8481dd12~mv2.png?originWidth=1152&originHeight=640'
    },
  ];

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-clip selection:bg-white selection:text-black">
      <style>{`
        .is-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .text-stroke {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
          color: transparent;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <Header />

      <main className="w-full">
        {/* HERO SECTION: "Live & Love" Inspiration */}
        <section className="relative w-full min-h-[110vh] flex flex-col items-center pt-32 pb-20 px-6 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
             <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white blur-[150px] rounded-full mix-blend-overlay" />
             <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-white blur-[180px] rounded-full mix-blend-overlay" />
          </div>

          {/* Main Headline */}
          <div className="relative z-10 text-center mb-12 lg:mb-24 max-w-[100rem]">
            <AnimatedElement>
              <h1 className="font-heading text-[15vw] leading-[0.85] tracking-tighter text-white mix-blend-difference">
                Connect <span className="font-paragraph italic font-light text-[12vw]">&</span> Share
              </h1>
            </AnimatedElement>
            <AnimatedElement delay={200}>
              <p className="font-paragraph text-xl lg:text-3xl text-white/70 mt-8 max-w-2xl mx-auto font-light tracking-wide">
                The sanctuary for pet lovers. Join a vibrant community dedicated to the joy of companionship.
              </p>
            </AnimatedElement>
          </div>

          {/* Tilted Cards Display */}
          <div className="relative z-20 w-full max-w-[100rem] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 items-center justify-center perspective-1000">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 100, rotate: 0 }}
                  animate={{ opacity: 1, y: 0, rotate: feature.rotation }}
                  transition={{ duration: 1, delay: 0.4 + (index * 0.2), type: "spring", stiffness: 50 }}
                  whileHover={{ scale: 1.05, rotate: 0, zIndex: 50, transition: { duration: 0.3 } }}
                  className="relative group"
                >
                  <Link to={feature.link} className="block">
                    <div className="bg-white rounded-[2rem] p-3 pb-12 shadow-2xl transition-all duration-500 group-hover:shadow-white/20">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] mb-6 bg-black">
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          width={800}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-black">
                            <ArrowUpRight className="w-6 h-6" />
                          </span>
                        </div>
                      </div>
                      <div className="px-4">
                        <h3 className="font-heading text-3xl text-black mb-2">{feature.title}</h3>
                        <p className="font-paragraph text-black/60 text-lg leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MARQUEE SECTION: Infinite Scroll */}
        <section className="w-full py-12 border-y border-white/10 bg-black overflow-hidden">
          <div className="flex whitespace-nowrap">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
              className="flex items-center gap-16 pr-16"
            >
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  <span className="text-6xl font-heading text-stroke opacity-50">DOGS</span>
                  <Star className="w-8 h-8 text-white/30" />
                  <span className="text-6xl font-heading text-stroke opacity-50">CATS</span>
                  <Star className="w-8 h-8 text-white/30" />
                  <span className="text-6xl font-heading text-stroke opacity-50">BIRDS</span>
                  <Star className="w-8 h-8 text-white/30" />
                  <span className="text-6xl font-heading text-stroke opacity-50">REPTILES</span>
                  <Star className="w-8 h-8 text-white/30" />
                  <span className="text-6xl font-heading text-stroke opacity-50">SMALL PETS</span>
                  <Star className="w-8 h-8 text-white/30" />
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </section>

        {/* VISUAL BREATHER: The Philosophy */}
        <section className="w-full py-32 lg:py-48 px-6 relative">
          <div className="max-w-[120rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <AnimatedElement>
              <div className="relative">
                <h2 className="font-heading text-6xl lg:text-8xl text-white mb-8 leading-[0.9]">
                  A World <br/>
                  <span className="text-white/40 italic">Built for</span> <br/>
                  Companions.
                </h2>
                <div className="w-24 h-1 bg-white mb-8" />
                <p className="font-paragraph text-xl lg:text-2xl text-white/70 max-w-xl leading-relaxed">
                  We believe that every pet deserves a community, and every owner deserves support. 
                  Our platform bridges the gap between solitary care and collective wisdom.
                </p>
              </div>
            </AnimatedElement>
            
            <div className="relative h-[80vh] w-full rounded-3xl overflow-hidden">
              <motion.div style={{ y: y1 }} className="absolute inset-0 h-[120%] w-full -top-[10%]">
                <Image 
                  src="https://static.wixstatic.com/media/161bc2_01ec89234bd443f6b3d8fb28a71b0f90~mv2.png?originWidth=1152&originHeight=768" 
                  alt="Pet owner bonding with dog"
                  className="w-full h-full object-cover opacity-60"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-4">
                    {[1,2,3].map((i) => (
                      <div key={i} className="w-12 h-12 rounded-full border-2 border-black bg-white/10 backdrop-blur-md overflow-hidden">
                         <Image src={'https://static.wixstatic.com/media/161bc2_d8b76af0dea1405cbbe21decced4bfb1~mv2.png?originWidth=1152&originHeight=768'} alt="User" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <span className="text-white font-paragraph italic">Join 10,000+ members</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STICKY SERVICES SECTION */}
        <section className="w-full py-32 px-6 bg-white text-black rounded-t-[4rem] relative z-30">
          <div className="max-w-[120rem] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              
              {/* Sticky Sidebar */}
              <div className="lg:col-span-4 relative">
                <div className="sticky top-32">
                  <AnimatedElement>
                    <span className="block font-paragraph text-lg uppercase tracking-widest mb-4 border-b border-black/10 pb-4">
                      Holistic Care
                    </span>
                    <h2 className="font-heading text-6xl lg:text-7xl mb-8">
                      Everything <br/> You Need.
                    </h2>
                    <p className="font-paragraph text-xl text-black/60 mb-12 max-w-md">
                      From behavioral advice to emergency care, we've curated the essential resources for modern pet parenting.
                    </p>
                    <Link to="/resources">
                      <Button className="rounded-full px-8 py-6 text-lg bg-black text-white hover:bg-black/80 transition-all hover:scale-105">
                        Explore All Resources
                      </Button>
                    </Link>
                  </AnimatedElement>
                </div>
              </div>

              {/* Scrolling Content */}
              <div className="lg:col-span-8 space-y-32">
                {services.map((service, index) => (
                  <AnimatedElement key={service.title} delay={index * 100}>
                    <Link to={service.link} className="group block">
                      <div className="relative aspect-[16/9] overflow-hidden rounded-3xl mb-8">
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                        <Image
                          src={service.image}
                          alt={service.title}
                          width={1200}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute top-8 right-8 z-20 bg-white/90 backdrop-blur-sm p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                          <ArrowUpRight className="w-8 h-8 text-black" />
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-t border-black/10 pt-8">
                        <div>
                          <h3 className="font-heading text-4xl mb-3 group-hover:italic transition-all">{service.title}</h3>
                          <p className="font-paragraph text-xl text-black/60 max-w-xl">{service.description}</p>
                        </div>
                        <div className="hidden md:block font-paragraph text-lg text-black/40">
                          0{index + 1}
                        </div>
                      </div>
                    </Link>
                  </AnimatedElement>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* PARALLAX GALLERY MOSAIC */}
        <section className="w-full py-32 bg-black text-white overflow-hidden">
          <div className="max-w-[120rem] mx-auto px-6 mb-20 text-center">
            <AnimatedElement>
              <h2 className="font-heading text-5xl lg:text-7xl mb-6">Captured Moments</h2>
              <p className="font-paragraph text-xl text-white/60">Real stories from our community.</p>
            </AnimatedElement>
          </div>
          
          <div className="h-[80vh] w-full overflow-hidden relative flex gap-8 justify-center px-6">
            {/* Column 1 - Slow Scroll Up */}
            <motion.div style={{ y: y1 }} className="w-1/3 lg:w-1/4 flex flex-col gap-8 pt-20">
              {[1, 2, 3].map((i) => (
                <div key={`c1-${i}`} className="w-full aspect-[3/4] rounded-2xl overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                  <Image src={'https://static.wixstatic.com/media/161bc2_df117854e67244bd9a0cf0d67ed5a433~mv2.png?originWidth=768&originHeight=1024'} alt="Gallery" className="w-full h-full object-cover" />
                </div>
              ))}
            </motion.div>

            {/* Column 2 - Fast Scroll Down */}
            <motion.div style={{ y: y2 }} className="w-1/3 lg:w-1/4 flex flex-col gap-8 -mt-40">
              {[1, 2, 3, 4].map((i) => (
                <div key={`c2-${i}`} className="w-full aspect-[3/4] rounded-2xl overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                  <Image src={'https://static.wixstatic.com/media/161bc2_fa393ad3d40545898cc21aede678f065~mv2.png?originWidth=768&originHeight=1024'} alt="Gallery" className="w-full h-full object-cover" />
                </div>
              ))}
            </motion.div>

            {/* Column 3 - Slow Scroll Up */}
            <motion.div style={{ y: y1 }} className="w-1/3 lg:w-1/4 flex flex-col gap-8 pt-10 hidden md:flex">
              {[1, 2, 3].map((i) => (
                <div key={`c3-${i}`} className="w-full aspect-[3/4] rounded-2xl overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                  <Image src={'https://static.wixstatic.com/media/161bc2_6764c341a5da40c88bd554a99e80f388~mv2.png?originWidth=768&originHeight=1024'} alt="Gallery" className="w-full h-full object-cover" />
                </div>
              ))}
            </motion.div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/gallery">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-full px-10 py-6 text-lg transition-all">
                View Full Gallery
              </Button>
            </Link>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="w-full py-32 lg:py-48 px-6 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-black to-black pointer-events-none" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <AnimatedElement>
              <h2 className="font-heading text-6xl lg:text-8xl text-white mb-8">
                Start Your Journey
              </h2>
              <p className="font-paragraph text-2xl text-white/70 mb-12 leading-relaxed">
                Join thousands of pet owners who have found their community. <br/>
                Create your profile today.
              </p>
              
              {!isAuthenticated ? (
                <Button
                  onClick={actions.login}
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 text-xl px-12 py-8 h-auto rounded-full transition-transform hover:scale-105"
                >
                  Create Free Account
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              ) : (
                <Link to="/profile">
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 text-xl px-12 py-8 h-auto rounded-full transition-transform hover:scale-105"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Button>
                </Link>
              )}
            </AnimatedElement>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}