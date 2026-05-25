"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const VIDEO_BY_CODE: Record<string, string> = {
  video_1: "/video/video_1.mp4",
};

export default function DecisionPage() {
  const searchParams = useSearchParams();
  const videoCode = searchParams.get("video") ?? "";
  const videoSrc = VIDEO_BY_CODE[videoCode] ?? null;

  return (
    <>
      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-xl flex justify-between items-center px-margin-mobile h-touch-target-min shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border-2 border-primary/20">
            <img
              alt="Sahabat Mascot"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCek7BeVliq6Q4EMHNOVCux9Xdy0lymFIF2y4CLSA4L98BzTiIFsNiMeV4BKnZd8-KQE7YUyQtXn9oaEXct8E2qkYmNMmLV6Nem7e_9bdwKOqG0PyaAbhEZS7pSxjmu2Wr9VCeJ-qGPW2oJauwcBFSq6IUx45mF5UBlIDkcjlsQQOENN8Zc-2cHalgve4qJraxNmVfu03b2sZNe7hiH2Md3yttIBxtUhErNA-4m4ngQWWZb6gUJfVKV3yJLkzdpWYn2iP6ywTBuVc1U"
            />
          </div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary leading-none">
            Sahabat AR
          </h1>
        </div>
        <button className="text-on-surface-variant hover:scale-105 transition-transform active:translate-y-0.5">
          <span className="material-symbols-outlined text-[32px]">settings</span>
        </button>
      </header>

      {/* Main Canvas (AR Context Area) */}
      <main className="flex-grow pt-24 pb-40 px-margin-mobile flex flex-col items-center justify-center min-h-screen relative overflow-x-hidden">
        {/* Decision Scene Content */}
        <div className="w-full max-w-md flex flex-col items-center gap-12 z-10 w-full">
          {/* Speech Bubble */}
          <div className="relative w-full">
            <div className="speech-bubble bg-white rounded-lg p-8 text-center border-2 border-surface-container-highest">
              <p className="font-headline-lg text-on-surface leading-snug">Aku harus apa ya?</p>
            </div>
          </div>

          {/* Thinking Mascot */}
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Soft Glow behind mascot */}
            <div className="absolute inset-0 bg-primary-fixed-dim/30 blur-3xl rounded-full scale-125"></div>
            {videoSrc ? (
              <video
                className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : (
              <img
                alt="Thinking Friend"
                className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCek7BeVliq6Q4EMHNOVCux9Xdy0lymFIF2y4CLSA4L98BzTiIFsNiMeV4BKnZd8-KQE7YUyQtXn9oaEXct8E2qkYmNMmLV6Nem7e_9bdwKOqG0PyaAbhEZS7pSxjmu2Wr9VCeJ-qGPW2oJauwcBFSq6IUx45mF5UBlIDkcjlsQQOENN8Zc-2cHalgve4qJraxNmVfu03b2sZNe7hiH2Md3yttIBxtUhErNA-4m4ngQWWZb6gUJfVKV3yJLkzdpWYn2iP6ywTBuVc1U"
              />
            )}
            {/* AR Placement Reticle pulsing subtle effect */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/5 rounded-[100%] blur-md"></div>
          </div>

          {/* Decision Options Cluster */}
          <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2 mt-4 px-4">
            {/* Action 1: Membantu Teman */}
            <button className="chunky-button button-orange group flex flex-col items-center gap-4 bg-secondary-container p-6 rounded-lg shadow-sm border-2 border-secondary/20">
              <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center p-2 shadow-inner">
                <img
                  alt="Heart Icon"
                  className="w-full h-full object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8WNOgLaIleC9OddpboxfDff3C0AWuGyy7CjnzLr6UkUXH6ZPijjPD4EaRVJwLkpUii86uniKTaedu2O0rR2spz3S0VrD3UjZyeU-4AKM-Tv61m3gBBTv486HSbRfJWvLgJsIoDhoqgb3z-BWNKkjjPjI8q0r11RGL8o-gdf3mET-ShmCuVnH6haT0zWIEtgQ42OEEGvTx8hdiyQxP_E0bDnThlEhD_o-lt9FgzJPiOEG10jaqe2drrsDOc4HQ71kz6c7tnjPPc7SS"
                />
              </div>
              <span className="font-headline-lg-mobile text-on-secondary-container">Membantu Teman</span>
            </button>

            {/* Action 2: Diam Saja */}
            <button className="chunky-button button-blue group flex flex-col items-center gap-4 bg-primary-container p-6 rounded-lg shadow-sm border-2 border-primary/20">
              <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center p-2 shadow-inner">
                <img
                  alt="Pause Icon"
                  className="w-full h-full object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi06pEMnvz-XMPBwTkn-E3kAz4pFtj_Gn7B0QAHMhc0xBA0QHdVuF4b2ilugKeVnlcv1CoBuYXwgEDLhxmsFWQDZSPmm8BaOL_ogF2ewx7OvWd577WbHvbHXdIRV77zbOKKlO9gQPQolBr2zMF5CBYqLHf-Qyw1pObj-5V0nbOcQ7r3lIrdBMpxeUW7BQvtHudgBeRZ4fJjgN27IMqwDUIcdyS6sSH6tQPqNMzMUX7FxGdDjboD66sitEvtrT24gioZAyQi9qkMLG7"
                />
              </div>
              <span className="font-headline-lg-mobile text-on-primary-container">Diam Saja</span>
            </button>
          </div>
        </div>
      </main>

      {/* Navigation Shell (BottomNavBar) */}
      <nav className="fixed bottom-0 left-0 w-full rounded-t-lg z-50 bg-white/80 backdrop-blur-xl border-t-4 border-surface-container-highest flex justify-around items-center px-gutter pb-4 pt-2 shadow-[0px_-8px_24px_rgba(0,0,0,0.08)] pointer-events-auto">
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant w-14 h-14 hover:bg-surface-container-high rounded-full transition-colors active:translate-y-1"
          href="/"
        >
          <span className="material-symbols-outlined text-[28px]">home</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full w-14 h-14 border-b-4 border-on-secondary-fixed-variant transition-all duration-75 active:translate-y-1 active:border-b-0 cursor-pointer"
          href="/"
        >
          <span
            className="material-symbols-outlined text-[28px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            camera
          </span>
        </Link>
        <a
          className="flex flex-col items-center justify-center text-on-surface-variant w-14 h-14 hover:bg-surface-container-high rounded-full transition-colors active:translate-y-1"
          href="#"
        >
          <span className="material-symbols-outlined text-[28px]">emoji_events</span>
        </a>
      </nav>

      {/* Floating UI Helper */}
      <div className="fixed top-24 right-margin-mobile flex flex-col gap-3 z-40">
        <div className="bg-white/90 backdrop-blur p-3 rounded-full shadow-sm border border-surface-variant flex flex-col gap-2 items-center">
          <div className="w-4 h-4 rounded-full bg-tertiary shadow-[0_0_8px_rgba(0,108,75,0.4)]"></div>
          <div className="w-1 h-20 bg-surface-container rounded-full relative overflow-hidden">
            <div className="absolute bottom-0 w-full h-1/2 bg-tertiary"></div>
          </div>
          <span className="material-symbols-outlined text-tertiary text-[20px]">lightbulb</span>
        </div>
      </div>
    </>
  );
}
