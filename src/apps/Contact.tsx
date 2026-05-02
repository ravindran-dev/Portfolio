import Window from "@/components/Window";

export default function Contact() {
  return (
    <Window id="contact" title="contact.sh" defaultWidth={500} defaultHeight={350}>
      <div className="font-mono text-sm sm:text-base text-foreground/90">
        <div className="mb-4">
          <span className="text-primary font-bold">ravindran@arch</span>
          <span className="text-foreground">{" ~ $ "}</span>
          <span className="text-foreground/80">./contact.sh</span>
        </div>
        
        <div className="flex flex-col gap-4 pl-2 border-l-2 border-surface-container-high ml-2 mt-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="text-secondary w-20">Email:</span>
            <a href="mailto:ravindrans.dev@gmail.com" className="text-primary hover:underline hover:drop-shadow-[0_0_8px_rgba(0,242,255,0.5)] transition-all">
              ravindrans.dev@gmail.com
            </a>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="text-secondary w-20">GitHub:</span>
            <a href="https://github.com/ravindran-dev" target="_blank" rel="noreferrer" className="text-primary hover:underline hover:drop-shadow-[0_0_8px_rgba(0,242,255,0.5)] transition-all">
              github.com/ravindran-dev
            </a>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="text-secondary w-20">LinkedIn:</span>
            <a href="https://linkedin.com/in/ravindran-s" target="_blank" rel="noreferrer" className="text-primary hover:underline hover:drop-shadow-[0_0_8px_rgba(0,242,255,0.5)] transition-all">
              linkedin.com/in/ravindran-s
            </a>
          </div>
        </div>
        
        <div className="mt-8 animate-pulse">
          <span className="text-primary font-bold">ravindran@arch</span>
          <span className="text-foreground">{" ~ $ "}</span>
          <span className="inline-block w-2.5 h-4 bg-primary align-middle ml-1"></span>
        </div>
      </div>
    </Window>
  );
}
