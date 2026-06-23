import Window from "@/components/Window";
import { FiMail, FiGithub, FiLinkedin, FiMapPin, FiExternalLink, FiSend } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState } from "react";
import { sendContactEmail } from "@/actions/sendEmail";

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
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
        // Clear success notification after 5s
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

  const contacts = [
    {
      icon: FiMail,
      label: "Email",
      value: "ravindrans.dev@gmail.com",
      link: "mailto:ravindrans.dev@gmail.com",
      color: "text-rose-400"
    },
    {
      icon: FiGithub,
      label: "GitHub",
      value: "github.com/ravindran-dev",
      link: "https://github.com/ravindran-dev",
      color: "text-white"
    },
    {
      icon: FiLinkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/ravindran-s-982702327",
      link: "https://www.linkedin.com/in/ravindran-s-982702327",
      color: "text-blue-400"
    }
  ];

  return (
    <Window id="contact" title="Contact" defaultWidth={800} defaultHeight={650}>
      <div className="w-full h-full flex flex-col md:flex-row bg-[#0d0d0f] text-white overflow-hidden">
        
        {/* Left Side: Info */}
        <div className="w-full md:w-2/5 p-8 flex flex-col bg-gradient-to-b from-[#1a1a1c] to-[#0d0d0f] border-r border-white/5">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-[2px] shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <div className="w-full h-full rounded-full bg-[#131313] flex items-center justify-center">
                <FiMail className="text-3xl text-white/90" />
              </div>
            </div>
            <h2 className="text-2xl font-display font-bold mt-4 tracking-wide text-center">Get In Touch</h2>
            <p className="text-white/50 text-sm mt-1 flex items-center gap-2">
              <FiMapPin /> Chennai, India
            </p>
          </div>

          <div className="w-full flex flex-col gap-3">
            {contacts.map((contact, index) => (
              <motion.a
                key={index}
                href={contact.link}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group flex items-center gap-4 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                <div className={`p-2.5 rounded-lg bg-black/30 shadow-inner ${contact.color}`}>
                  <contact.icon className="text-lg" />
                </div>
                
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">{contact.label}</span>
                  <span className="text-xs font-medium text-white/80 truncate">{contact.value}</span>
                </div>
                
                <FiExternalLink className="text-white/20 group-hover:text-white/60 transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-3/5 p-8 flex flex-col bg-[#0d0d0f] overflow-y-auto">
          <h3 className="text-lg font-bold mb-6 text-white/90">Send a Message</h3>
          
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-xs font-mono mb-4 text-center"
            >
              ✓ Message delivered successfully directly to server!
            </motion.div>
          )}
          {status && status !== "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-mono mb-4 text-center"
            >
              ⚠️ Error: {status}
            </motion.div>
          )}
          
          <form onSubmit={handleSend} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-white/40 uppercase tracking-widest font-bold ml-1">Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500/50 focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-white/40 uppercase tracking-widest font-bold ml-1">Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500/50 focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-white/40 uppercase tracking-widest font-bold ml-1">Message</label>
              <textarea 
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What's on your mind?" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500/50 focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/20 resize-none"
              />
            </div>

            <motion.button 
              type="submit"
              disabled={isSending}
              whileHover={{ scale: isSending ? 1 : 1.02 }}
              whileTap={{ scale: isSending ? 1 : 0.98 }}
              className={`mt-2 w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all ${
                isSending ? "opacity-50 cursor-not-allowed" : "shadow-blue-500/20 hover:shadow-blue-500/40"
              }`}
            >
              {isSending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending Message...
                </>
              ) : (
                <>
                  <FiSend /> Send Message
                </>
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </Window>
  );
}
