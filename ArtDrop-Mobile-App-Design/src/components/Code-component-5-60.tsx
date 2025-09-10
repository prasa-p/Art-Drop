import { motion } from 'motion/react';
import { Palette } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          className="w-20 h-20 mx-auto mb-8 rounded-full bg-gray-900 flex items-center justify-center"
        >
          <Palette className="w-10 h-10 text-white" />
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl font-semibold text-gray-900 mb-3"
        >
          ArtDrop
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-gray-600 text-lg"
        >
          Curated art experiences
        </motion.p>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="mt-12"
        >
          <div className="flex justify-center space-x-2">
            {[0, 0.2, 0.4].map((delay, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0.3, scale: 1 }}
                animate={{ opacity: 1, scale: 1.2 }}
                transition={{
                  duration: 0.6,
                  delay,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="w-2 h-2 bg-gray-400 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}