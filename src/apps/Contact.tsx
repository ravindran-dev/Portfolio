import Window from "@/components/Window";
import { FiMail, FiGithub, FiLinkedin, FiMapPin, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Contact() {
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
      value: "linkedin.com/in/ravindran-s",
      link: "https://linkedin.com/in/ravindran-s",
      color: "text-blue-400"
    }
  ];

  return (
    <Window id="contact" title="Contact" defaultWidth={500} defaultHeight={500}>
      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#1a1a1c] to-[#0d0d0f] text-white">
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-[2px] shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <div className="w-full h-full rounded-full bg-[#131313] flex items-center justify-center">
              <FiMail className="text-3xl text-white/90" />
            </div>
          </div>
          <h2 className="text-2xl font-display font-bold mt-4 tracking-wide">Get In Touch</h2>
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              <div className={`p-3 rounded-lg bg-black/30 shadow-inner ${contact.color}`}>
                <contact.icon className="text-xl" />
              </div>
              
              <div className="flex flex-col flex-1">
                <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">{contact.label}</span>
                <span className="text-sm font-medium text-white/90 truncate">{contact.value}</span>
              </div>
              
              <FiExternalLink className="text-white/30 group-hover:text-white/80 transition-colors" />
            </motion.a>
          ))}
        </div>
      </div>
    </Window>
  );
}
