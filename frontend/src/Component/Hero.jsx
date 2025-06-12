import React, { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, OrbitControls } from '@react-three/drei';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { userDataContext } from '../Context/UserContext';
import { FaHome, FaSearch, FaMapMarkerAlt, FaBuilding, FaSwimmingPool, FaHotel, FaHouseUser, FaCity, FaHouseDamage, FaArrowRight, FaStar, FaCheckCircle } from 'react-icons/fa';

function HouseModel() {
  const house = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    house.current.rotation.y = Math.sin(t / 4) / 8;
    house.current.position.y = Math.sin(t / 1.5) / 10;
    if (hovered) {
      house.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh 
        ref={house} 
        scale={hovered ? 2.2 : 2}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={hovered ? "#ff4757" : "#ff6b6b"} 
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <HouseModel />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} />
    </>
  );
}

function CountUp({ end, duration = 5 }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    let animationFrame;
    let startValue = 0;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(startValue + (end - startValue) * easeOutQuart);
      
      setCount(currentCount);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isVisible]);

  return <span ref={countRef}>{count.toLocaleString()}+</span>;
}

function Hero() {
  const navigate = useNavigate();
  const { userData } = useContext(userDataContext);
  const controls = useAnimation();

  const homeImages = [
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60",
      title: "Modern Villa",
      price: "₹2.5 Cr",
      location: "Mumbai, Maharashtra",
      rating: 4.8,
      features: ["5 Beds", "4 Baths", "3000 sq.ft"]
    },
    {
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60",
      title: "Luxury Apartment",
      price: "₹1.8 Cr",
      location: "Delhi, NCR",
      rating: 4.9,
      features: ["3 Beds", "3 Baths", "2500 sq.ft"]
    },
    {
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&auto=format&fit=crop&q=60",
      title: "Beach House",
      price: "₹3.2 Cr",
      location: "Goa",
      rating: 4.7,
      features: ["4 Beds", "3 Baths", "2800 sq.ft"]
    },
    {
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop&q=60",
      title: "Penthouse Suite",
      price: "₹4.5 Cr",
      location: "Bangalore, Karnataka",
      rating: 4.9,
      features: ["6 Beds", "5 Baths", "4000 sq.ft"]
    }
  ];

  const stats = [
    { number: 500, label: "Properties", icon: <FaBuilding className="text-3xl mb-2" /> },
    { number: 30, label: "Cities", icon: <FaCity className="text-3xl mb-2" /> },
    { number: 200, label: "Happy Clients", icon: <FaHouseUser className="text-3xl mb-2" /> },
    { number: 24, label: "Support", icon: <FaCheckCircle className="text-3xl mb-2" /> }
  ];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a]">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60')] bg-cover bg-center opacity-5" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-start w-full px-4 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[1920px] mx-auto"
        >
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-left relative lg:ml-20"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-2xl">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                  Find Your
                </span>
                <span className="block text-[#ff6b6b] mt-1 sm:mt-2 drop-shadow-lg">
                  Dream Home
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed drop-shadow-lg">
                Discover luxury properties across India. Your perfect home is just a click away.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <button
                  onClick={() => userData ? navigate("/listingpage1") : navigate("/login")}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#ff6b6b] text-white rounded-lg font-semibold hover:bg-[#ff4757] transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <FaHome className="text-lg sm:text-xl" />
                  List Your Property
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border border-white/20 text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <FaMapMarkerAlt className="text-lg sm:text-xl" />
                  Explore Properties
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="text-center bg-white/5 p-3 sm:p-4 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="text-[#ff6b6b]">
                      {React.cloneElement(stat.icon, { className: "text-2xl sm:text-3xl mb-1 sm:mb-2" })}
                    </div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
                      {stat.label === "Support" ? "24/7" : <CountUp end={stat.number} duration={5} />}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Featured Properties */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 sm:mt-0 lg:max-w-[800px] lg:mx-auto"
            >
              <div className="grid grid-cols-2 gap-6">
                {homeImages.map((home, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="group relative overflow-hidden rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 bg-white/5 backdrop-blur-sm"
                  >
                    <div className="relative h-64">
                      <img 
                        src={home.image} 
                        alt={home.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                        <div className="absolute top-4 left-4">
                          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                            <FaStar className="text-[#ff6b6b]" />
                            <span className="text-white text-sm font-medium">{home.rating}</span>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-bold text-white">{home.title}</h3>
                            <p className="text-xl font-bold text-[#ff6b6b]">{home.price}</p>
                          </div>
                          <p className="text-gray-300 text-sm mb-3 flex items-center gap-2">
                            <FaMapMarkerAlt className="text-[#ff6b6b]" />
                            {home.location}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {home.features.map((feature, i) => (
                              <span key={i} className="text-xs bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-gray-300">
                                {feature}
                              </span>
                            ))}
                          </div>
                          <button className="w-full bg-[#ff6b6b] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#ff4757] transition-colors flex items-center justify-center gap-2">
                            View Details
                            <FaArrowRight className="text-xs" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero; 