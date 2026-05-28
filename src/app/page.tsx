"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import jsQR from "jsqr";

const QR_CODES = new Set([
  "video_1",
  "video_2",
  "video_3",
  "video_4",
  "video_5",
  "video_6",
  "video_7",
]);
const DECISION_ROUTE = "/decision";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanRequestRef = useRef<number | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const router = useRouter();

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  useEffect(() => {
    let isMounted = true;

    const startCamera = async () => {
      try {
        // Meminta akses kamera belakang (environment) khusus untuk AR
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (!isMounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Gagal mengakses kamera:", err);
      }
    };

    startCamera();

    return () => {
      isMounted = false;
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (!isScanning) {
      if (scanRequestRef.current !== null) {
        cancelAnimationFrame(scanRequestRef.current);
        scanRequestRef.current = null;
      }
      return;
    }

    const scanFrame = () => {
      scanRequestRef.current = null;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) {
        scanRequestRef.current = requestAnimationFrame(scanFrame);
        return;
      }

      if (video.readyState < 2) {
        scanRequestRef.current = requestAnimationFrame(scanFrame);
        return;
      }

      const width = video.videoWidth;
      const height = video.videoHeight;
      if (!width || !height) {
        scanRequestRef.current = requestAnimationFrame(scanFrame);
        return;
      }

      if (canvas.width !== width) {
        canvas.width = width;
      }
      if (canvas.height !== height) {
        canvas.height = height;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        scanRequestRef.current = requestAnimationFrame(scanFrame);
        return;
      }

      ctx.drawImage(video, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      const result = jsQR(imageData.data, width, height);

      if (result?.data) {
        const data = result.data.trim();
        if (QR_CODES.has(data)) {
          setIsScanning(false);
          stopCamera();
          router.push(`${DECISION_ROUTE}?video=${encodeURIComponent(data)}`);
          return;
        }
      }

      scanRequestRef.current = requestAnimationFrame(scanFrame);
    };

    scanRequestRef.current = requestAnimationFrame(scanFrame);

    return () => {
      if (scanRequestRef.current !== null) {
        cancelAnimationFrame(scanRequestRef.current);
        scanRequestRef.current = null;
      }
    };
  }, [isScanning, router]);

  return (
    <>
      {/* AR Camera View Simulation */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        data-alt="A soft-focus POV shot of a child's brightly lit playroom with colorful wooden blocks and a drawing table. The lighting is warm and natural, coming from a nearby window. The atmosphere is cozy, safe, and imaginative, using a gentle pastel color palette dominated by soft blues and warm woods to match a child-friendly UI."
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC_Zv0RpUYu-2am1P3vFCHaqf8UXEikU67UCVnyFCmr60bSEqoVByYw2Z5RofUGXu-g4Yys_4ttN-L2GZm1_eGDGjkUs2HHRRJoIrYpGXzvm-rbx-Qw0ifE7AyJ1RoZElA8C1uX0PekcErgLKQq9ZkamjygZr6-3QagqAxiBx24rkbzUEhPNPBht50FsloI2cW0RbgjXiLyNEcRrFQtBoogBbqnNfs7xoOkJrRBLpa8l1zdPusXztGQwNx20E4FHxyM8YplpFcZ0ZwR')",
        }}
      >
        {/* Overlay Blur for AR Feel */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>
      </div>

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

      {/* Main AR Canvas */}
      <main className="relative z-10 h-screen flex flex-col items-center justify-center px-margin-mobile">
        {/* Instruction Bubble */}
        <div className="mb-12 bg-white/90 backdrop-blur-md px-6 py-4 rounded-lg shadow-[0px_8px_24px_rgba(0,0,0,0.08)] relative border-2 border-surface-container-highest">
          <p className="font-body-lg text-body-lg text-on-surface text-center">
            Arahkan kamera ke kartu karakter
          </p>
          {/* Bubble Tail */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-r-2 border-b-2 border-surface-container-highest rotate-45"></div>
        </div>

        {/* Scanning Reticle */}
        <div className="w-72 h-72 md:w-96 md:h-96 ar-scan-frame flex items-center justify-center relative backdrop-blur-[1px] overflow-hidden drop-shadow-md">
          {/* Real AR Camera View ONLY INSIDE RETICLE */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

          <div className="absolute inset-0 flex items-center justify-center z-10">
            <span
              className="material-symbols-outlined text-white/50 text-[80px]"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              center_focus_strong
            </span>
          </div>
          {/* Animated corner accents */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-8 border-l-8 border-secondary rounded-tl-[2.5rem] z-10"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-8 border-r-8 border-secondary rounded-tr-[2.5rem] z-10"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-8 border-l-8 border-secondary rounded-bl-[2.5rem] z-10"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-8 border-r-8 border-secondary rounded-br-[2.5rem] z-10"></div>
        </div>

        {/* Floating Mascot Helper */}
        <div className="fixed bottom-32 right-6 md:right-24 w-28 h-28 md:w-36 md:h-36 drop-shadow-2xl">
          {/* Friendly Mascot Image Removed */}
        </div>

        {/* Bottom Actions */}
        <div className="fixed bottom-24 w-full px-margin-mobile flex justify-center z-10">
          <button
            className="bg-secondary-container text-on-secondary-container font-headline-lg-mobile text-headline-lg-mobile py-4 px-12 rounded-lg chunky-button-shadow chunky-button-active flex items-center gap-3 transition-all hover:brightness-105 active:brightness-95 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            type="button"
            onClick={() => setIsScanning(true)}
            disabled={isScanning}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_arrow
            </span>
            {isScanning ? "Memindai..." : "Mulai"}
          </button>
        </div>
      </main>

      {/* Navigation Shell (BottomNavBar) */}
      <nav className="fixed bottom-0 left-0 w-full rounded-t-lg z-50 bg-white/80 backdrop-blur-xl border-t-4 border-surface-container-highest flex justify-around items-center px-gutter pb-4 pt-2 shadow-[0px_-8px_24px_rgba(0,0,0,0.08)]">
        <a
          className="flex flex-col items-center justify-center text-on-surface-variant w-14 h-14 hover:bg-surface-container-high rounded-full transition-colors active:translate-y-1"
          href="#"
        >
          <span className="material-symbols-outlined text-[28px]">home</span>
        </a>
        <a
          className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full w-14 h-14 border-b-4 border-on-secondary-fixed-variant transition-all duration-75 active:translate-y-1 active:border-b-0"
          href="#"
        >
          <span
            className="material-symbols-outlined text-[28px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            camera
          </span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-on-surface-variant w-14 h-14 hover:bg-surface-container-high rounded-full transition-colors active:translate-y-1"
          href="#"
        >
          <span className="material-symbols-outlined text-[28px]">emoji_events</span>
        </a>
      </nav>
    </>
  );
}