"use client";

import { motion } from 'framer-motion';
import { IoMailOutline, IoLogoGithub, IoLogoLinkedin, IoSend } from 'react-icons/io5';
import { useState } from 'react';
import { sendContactEmail } from '@/actions/sendEmail';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSend = async () => {
    if (!name || !email || !message) return;
    setIsSending(true);
    setStatus(null);
    try {
      const res = await sendContactEmail(name, email, message);
      if (res.success) {
        setStatus("success");
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus(res.error || "Failed to send message");
      }
    } catch (err) {
      setStatus("Network error. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full h-full pt-20 pb-32 px-5 overflow-y-auto overflow-x-hidden">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold text-white mb-6 tracking-tight"
      >
        Contact
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h3 className="text-[13px] font-bold text-[#839493] uppercase tracking-wider ml-4 mb-2">Connect</h3>
        
        <div className="w-full rounded-[20px] bg-[#1a1c20]/50 backdrop-blur-xl border border-white/10 overflow-hidden">
          <a href="mailto:ravindrans.dev@gmail.com" className="flex items-center gap-4 p-4 border-b border-white/5 active:bg-white/5 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#00fbfb]/20 flex items-center justify-center text-[#00fbfb]">
              <IoMailOutline size={18} />
            </div>
            <div className="flex-1">
              <span className="text-white font-medium text-[16px]">Email</span>
            </div>
            <span className="text-[#839493] text-[15px] truncate max-w-[150px]">ravindrans.dev@gmail.com</span>
          </a>
          
          <a href="https://github.com/ravindran-dev" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 border-b border-white/5 active:bg-white/5 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#2f3035] flex items-center justify-center text-white">
              <IoLogoGithub size={18} />
            </div>
            <div className="flex-1">
              <span className="text-white font-medium text-[16px]">GitHub</span>
            </div>
            <span className="text-[#839493] text-[15px]">ravindran-dev</span>
          </a>
          
          <a href="https://www.linkedin.com/in/ravindran-s-982702327" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 active:bg-white/5 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#438fff]/20 flex items-center justify-center text-[#438fff]">
              <IoLogoLinkedin size={18} />
            </div>
            <div className="flex-1">
              <span className="text-white font-medium text-[16px]">LinkedIn</span>
            </div>
            <span className="text-[#839493] text-[15px] truncate max-w-[120px]">/in/ravindran-s-982702327</span>
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-[13px] font-bold text-[#839493] uppercase tracking-wider ml-4 mb-2">Send Message</h3>
        
        <div className="w-full rounded-[24px] bg-[#1a1c20]/50 backdrop-blur-xl border border-white/10 p-5 flex flex-col gap-4">
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-xs font-mono text-center"
            >
              ✓ Sent directly to server!
            </motion.div>
          )}
          {status && status !== "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-mono text-center"
            >
              ⚠️ Error: {status}
            </motion.div>
          )}

          <div className="bg-[#111318] rounded-[16px] border border-white/5 overflow-hidden">
            <input 
              type="text" 
              placeholder="Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent text-white px-4 py-3 outline-none placeholder:text-[#839493] text-[16px] border-b border-white/5"
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-white px-4 py-3 outline-none placeholder:text-[#839493] text-[16px]"
            />
          </div>
          
          <div className="bg-[#111318] rounded-[16px] border border-white/5 overflow-hidden">
            <textarea 
              placeholder="Message" 
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-transparent text-white px-4 py-3 outline-none placeholder:text-[#839493] text-[16px] resize-none"
            />
          </div>
          
          <motion.button 
            disabled={isSending}
            whileTap={{ scale: isSending ? 1 : 0.95 }}
            onClick={handleSend}
            className={`w-full py-3.5 rounded-full bg-gradient-to-r from-[#00fbfb] to-[#00dddd] text-[#002020] font-bold text-[16px] shadow-[0_0_15px_rgba(0,251,251,0.3)] flex items-center justify-center gap-2 ${
              isSending ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSending ? (
              <>
                Sending... <div className="w-4 h-4 border-2 border-[#002020] border-t-transparent rounded-full animate-spin" />
              </>
            ) : (
              <>
                Send <IoSend size={16} />
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
