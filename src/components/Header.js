import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      className="w-full py-2 sm:py-3 md:py-4 print:hidden print:bg-transparent print:pt-0 print:mt-0"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="container mx-auto px-0 sm:px-0 md:px-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="print:hidden">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-blue-800 dark:text-blue-400 leading-tight whitespace-normal w-full">
            GT & GV Notice Generation
          </h1>
          <p className="mt-2 sm:mt-3 text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed whitespace-normal w-full">
            Effortlessly generate Ground Truthing and Ground Validation notices for private land records Khata Wise.
          </p>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;