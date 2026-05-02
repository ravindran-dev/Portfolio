"use client";

import Window from "@/components/Window";

export default function Terminal() {
  return (
    <Window id="terminal" title="terminal - bash" defaultWidth={860} defaultHeight={600}>
      <div className="w-full h-full bg-black">
        <iframe 
          src="/terminal/index.html" 
          className="w-full h-full border-none"
          title="Terminal Simulator"
        />
      </div>
    </Window>
  );
}
