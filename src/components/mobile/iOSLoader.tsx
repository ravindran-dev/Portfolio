import { motion } from 'framer-motion';

export default function IOSLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00fbfb]/10 blur-[100px] rounded-full"></div>
      
      <div className="relative flex flex-col items-center justify-center">
        {/* Animated RS Logo */}
        <div className="relative w-24 h-24 mb-8">
          <motion.div 
            className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-[#00fbfb]/20 to-[#006a6a]/20 border border-[#00fbfb]/30 backdrop-blur-xl flex items-center justify-center shadow-[0_0_30px_rgba(0,251,251,0.2)] overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Shimmer effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-[200%] h-full"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img 
              src="/assets/logo.png" 
              alt="RS Logo" 
              className="w-16 h-16 object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
          </motion.div>
        </div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="text-white font-bold text-xl tracking-tight">Ravindran S</div>
          <div className="flex items-center gap-2">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-[#00fbfb]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            />
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-[#00fbfb]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-[#00fbfb]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
