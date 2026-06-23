import Window from "@/components/Window";

export default function Resume() {
  return (
    <Window id="resume" title="resume.pdf" defaultWidth={800} defaultHeight={900}>
      <div className="w-full h-full bg-white flex flex-col relative overflow-hidden rounded-md shadow-inner">
        <iframe 
          src="/assets/Resume%20(2).pdf" 
          className="w-full h-full border-none"
          title="Resume"
        />
      </div>
    </Window>
  );
}
