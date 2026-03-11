import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg font-sans transition-colors duration-300">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center p-8 sm:items-start text-left">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold tracking-tighter text-text sm:text-7xl">
            THEME <span className="text-accent underline decoration-accent/30">SYSTEM</span> READY.
          </h1>
          <p className="max-w-md text-xl leading-relaxed text-text-sub">
            Testing your <span className="font-mono text-accent">Bold & Expressive</span> palette. 
            Change your OS theme (Light/Dark) to see the transition.
          </p>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-bg-2 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-text">Surface 2</h3>
              <p className="text-sm text-muted">Used for cards and navigation elements.</p>
            </div>
            <div className="rounded-xl border border-border bg-bg-3 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-text">Surface 3</h3>
              <p className="text-sm text-muted">Used for hover states and secondary depth.</p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button className="rounded-full bg-accent px-8 py-3 font-bold text-bg transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(245,166,35,0.3)]">
              CTA BUTTON
            </button>
            <button className="rounded-full border border-accent text-accent px-8 py-3 font-bold transition-colors hover:bg-accent/10">
              OUTLINE
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
