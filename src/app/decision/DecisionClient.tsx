"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const VIDEO_BY_CODE: Record<string, string> = {
  video_1: "/video/video_1.mp4",
  video_2: "/video/video_2.mp4",
  video_3: "/video/video_3.mp4",
  video_4: "/video/video_4.mp4",
  video_5: "/video/video_5.mp4",
  video_6: "/video/video_6.mp4",
  video_7: "/video/video_7.mp4",
};

const DEFAULT_CONTENT = {
  question: "Aku harus apa ya?",
  optionHelpText: "Membantu Teman",
  optionSilentText: "Diam Saja",
};

const VIDEO_CONTENT: Record<string, typeof DEFAULT_CONTENT> = {
  video_1: {
    question: "Aku punya mainan baru. Apa yang harus aku lakukan?",
    optionHelpText: "Bermain Bersama",
    optionSilentText: "Bermain Sendiri",
  },
  video_2: {
    question: "Temanku terlihat kesulitan membawa barang. Apa yang sebaiknya aku lakukan?",
    optionHelpText: "Membantu Teman",
    optionSilentText: "Diam Saja",
  },
  video_3: {
    question: "Ada tugas membersihkan kelas. Bagaimana sebaiknya kita melakukannya?",
    optionHelpText: "Bekerja Sama",
    optionSilentText: "Bekerja Sendiri",
  },
  video_4: {
    question: "Temanku sedang menangis sendirian di pojokan. Apa yang harus aku lakukan?",
    optionHelpText: "Menghibur Teman",
    optionSilentText: "Diam Saja",
  },
  video_5: {
    question: "Temanku menunjukkan gambar buatannya. Bagaimana tanggapanku?",
    optionHelpText: "Memuji Karya",
    optionSilentText: "Diam Saja",
  },
  video_6: {
    question: "Ada teman baru yang penampilannya berbeda dengan kami. Bagaimana sikapku?",
    optionHelpText: "Bermain Bersama",
    optionSilentText: "Pilih-Pilih Teman",
  },
  video_7: {
    question: "Aku berpapasan dengan teman di koridor sekolah. Apa yang harus aku lakukan?",
    optionHelpText: "Menyapa & Senyum",
    optionSilentText: "Abaikan / Diam",
  },
};

export default function DecisionClient({ video }: { video: string }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const videoCode = video;
  const videoSrc = isHydrated ? VIDEO_BY_CODE[videoCode] ?? null : null;
  const currentContent = videoCode ? VIDEO_CONTENT[videoCode] ?? DEFAULT_CONTENT : DEFAULT_CONTENT;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!videoSrc) {
      return;
    }
    const video = videoRef.current;
    if (!video) {
      return;
    }

    // Try to autoplay with sound; browsers may block it without user gesture.
    video.muted = false;
    const tryPlay = async () => {
      try {
        await video.play();
        setNeedsInteraction(false);
      } catch (err) {
        setNeedsInteraction(true);
      }
    };

    tryPlay();
  }, [videoSrc, isHydrated]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      }
    };

    const handlePageHide = () => {
      video.pause();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handlePageHide);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handlePageHide);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [videoSrc, isHydrated]);

  const handleEnableAudio = async () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    video.muted = false;
    try {
      await video.play();
      setNeedsInteraction(false);
    } catch (err) {
      setNeedsInteraction(true);
    }
  };

  return (
    <div className="h-screen bg-surface font-body-md text-on-surface flex flex-col overflow-hidden">
      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-xl flex justify-between items-center px-margin-mobile h-touch-target-min shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
            <img
              alt="Sahabat Mascot"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsIt4_9AqSfP6lHv1XhyCsnYSmH-LM0Wafn3cBjt05RD7gA9WCgbMcCgY6oJdr6VXV6nkkNT-iRhhgeQm3sFKFQmYQ6LTnrfxZtMjDAWPfKv2dIjF8fEpdTHYBW9-BbxVsweh8_i15cZLdggm0-47cysJqyp5vLcwYIEBJgdEd-DFs5HldUYPFL4eT96-DA8WISycwCSTR4jftuy7RL8SMeoIUPdqblrjssl0Jj4jqb62DxXxjgLBhz8Xa20mt-zu54wMC8U5ZFWUI"
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
      <main className="flex-grow pt-24 pb-25 px-margin-mobile flex flex-col items-center relative overflow-y-auto overflow-x-hidden">
        {/* Decision Scene Content */}
        <div className="w-full max-w-md flex flex-col items-center gap-12 z-10 my-auto">
          {/* Speech Bubble */}
          <div className="relative w-full">
            <div className="speech-bubble bg-white rounded-lg p-8 text-center border-2 border-surface-container-highest">
              <p className="font-headline-lg text-on-surface leading-snug">
                {currentContent.question}
              </p>
            </div>
          </div>

          {/* Thinking Mascot */}
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Soft Glow behind mascot */}
            <div className="absolute inset-0 bg-primary-fixed-dim/30 blur-3xl rounded-full scale-125"></div>
            {videoSrc ? (
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                  src={videoSrc}
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                />
                {needsInteraction ? (
                  <button
                    className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 text-white text-body-lg font-body-lg rounded-full"
                    type="button"
                    onClick={handleEnableAudio}
                  >
                    Ketuk untuk menyalakan suara
                  </button>
                ) : null}
              </div>
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
            {/* Action 1: Membantu Teman / Positif */}
            <Link
              className="chunky-button button-orange group flex flex-col items-center gap-4 bg-secondary-container p-6 rounded-lg shadow-sm border-2 border-secondary/20"
              href={`/decision/help${videoCode ? `?video=${videoCode}` : ""}`}
            >
              <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center p-2 shadow-inner">
                <img
                  alt="Heart Icon"
                  className="w-full h-full object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8WNOgLaIleC9OddpboxfDff3C0AWuGyy7CjnzLr6UkUXH6ZPijjPD4EaRVJwLkpUii86uniKTaedu2O0rR2spz3S0VrD3UjZyeU-4AKM-Tv61m3gBBTv486HSbRfJWvLgJsIoDhoqgb3z-BWNKkjjPjI8q0r11RGL8o-gdf3mET-ShmCuVnH6haT0zWIEtgQ42OEEGvTx8hdiyQxP_E0bDnThlEhD_o-lt9FgzJPiOEG10jaqe2drrsDOc4HQ71kz6c7tnjPPc7SS"
                />
              </div>
              <span className="font-headline-lg-mobile text-on-secondary-container">
                {currentContent.optionHelpText}
              </span>
            </Link>

            {/* Action 2: Diam Saja / Negatif */}
            <Link
              className="chunky-button button-blue group flex flex-col items-center gap-4 bg-primary-container p-6 rounded-lg shadow-sm border-2 border-primary/20"
              href={`/decision/silent${videoCode ? `?video=${videoCode}` : ""}`}
            >
              <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center p-2 shadow-inner">
                <img
                  alt="Pause Icon"
                  className="w-full h-full object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi06pEMnvz-XMPBwTkn-E3kAz4pFtj_Gn7B0QAHMhc0xBA0QHdVuF4b2ilugKeVnlcv1CoBuYXwgEDLhxmsFWQDZSPmm8BaOL_ogF2ewx7OvWd577WbHvbHXdIRV77zbOKKlO9gQPQolBr2zMF5CBYqLHf-Qyw1pObj-5V0nbOcQ7r3lIrdBMpxeUW7BQvtHudgBeRZ4fJjgN27IMqwDUIcdyS6sSH6tQPqNMzMUX7FxGdDjboD66sitEvtrT24gioZAyQi9qkMLG7"
                />
              </div>
              <span className="font-headline-lg-mobile text-on-primary-container">
                {currentContent.optionSilentText}
              </span>
            </Link>
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
    </div>
  );
}
