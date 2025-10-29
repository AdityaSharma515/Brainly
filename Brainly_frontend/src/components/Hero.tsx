import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

const Hero = () => {
    const navigation=useNavigate();
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 py-20 md:py-32 bg-[#EEF2FF]">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10" />
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
      >
        Your Second Brain <br />
        <span className="text-indigo-600">Organize Smarter</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-lg md:text-xl text-gray-600 mt-4 max-w-2xl"
      >
        Collect, organize, and share your knowledge — all in one place.  
        Simple. Fast. Intelligent.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col md:flex-row gap-4 mt-8"
      >
        <button onClick={()=>navigation("/signup")} className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition-all duration-300">
          Get Started
        </button>
        <button className="px-6 py-3 rounded-lg border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition-all duration-300">
          Learn More
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
