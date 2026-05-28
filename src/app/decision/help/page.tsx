import Link from "next/link";

const DEFAULT_CONTENT = {
  successTitle: "Hebat! Sekarang ayo praktik di dunia nyata!",
  successBody: "Kamu sudah belajar hal baru hari ini. Ayo tunjukkan kebaikanmu!",
};

const VIDEO_CONTENT: Record<string, typeof DEFAULT_CONTENT> = {
  video_1: {
    successTitle: "Hebat! Berbagi itu indah!",
    successBody: "Aku punya mainan, yuk kita main bersama! Aku senang berbagi dengan teman.",
  },
  video_2: {
    successTitle: "Luar biasa! Kamu penolong yang baik!",
    successBody: "Temanku butuh bantuan… aku bantu yuk! Aku senang bisa menolong.",
  },
  video_3: {
    successTitle: "Bagus sekali! Kerja sama membuat segalanya mudah!",
    successBody: "Ayo kita lakukan bersama! Kalau bersama, jadi lebih mudah dan menyenangkan.",
  },
  video_4: {
    successTitle: "Hebat! Kamu teman yang sangat empati!",
    successBody: "Temanku sedih ya… aku temani dan hibur dia supaya kembali senang.",
  },
  video_5: {
    successTitle: "Keren! Menghargai orang lain itu terpuji!",
    successBody: "Wah, bagus sekali! Aku suka dan menghargai hasil karya temanku.",
  },
  video_6: {
    successTitle: "Indahnya kebersamaan dalam perbedaan!",
    successBody: "Kita boleh berbeda, tapi tetap bisa bermain dan berteman bersama.",
  },
  video_7: {
    successTitle: "Ramah sekali! Menyapa itu awal persahabatan!",
    successBody: "Hai teman! Aku menyapa dan tersenyum agar kita bisa bermain bersama.",
  },
};

export default async function HelpSuccessPage(props: {
  searchParams: Promise<{ video?: string }>;
}) {
  const searchParams = await props.searchParams;
  const video = searchParams.video ?? "";
  const currentContent = video ? VIDEO_CONTENT[video] ?? DEFAULT_CONTENT : DEFAULT_CONTENT;

  return (
    <div className="h-screen bg-surface font-body-md text-on-surface flex flex-col overflow-hidden">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-xl flex justify-between items-center px-margin-mobile h-touch-target-min shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
            <img
              alt="Sahabat Mascot"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsIt4_9AqSfP6lHv1XhyCsnYSmH-LM0Wafn3cBjt05RD7gA9WCgbMcCgY6oJdr6VXV6nkkNT-iRhhgeQm3sFKFQmYQ6LTnrfxZtMjDAWPfKv2dIjF8fEpdTHYBW9-BbxVsweh8_i15cZLdggm0-47cysJqyp5vLcwYIEBJgdEd-DFs5HldUYPFL4eT96-DA8WISycwCSTR4jftuy7RL8SMeoIUPdqblrjssl0Jj4jqb62DxXxjgLBhz8Xa20mt-zu54wMC8U5ZFWUI"
            />
          </div>
          <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary">Sahabat AR</span>
        </div>
        <button className="w-touch-target-min h-touch-target-min flex items-center justify-center text-on-surface-variant hover:scale-105 transition-transform active:translate-y-0.5">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </header>

      {/* Main Canvas */}
      <main className="flex-grow pt-20 pb-32 px-margin-mobile flex flex-col items-center relative bg-surface-container-low overflow-y-auto overflow-x-hidden">
        {/* Decorative Floating Confetti */}
        <div className="confetti-shape top-16 right-8 w-6 h-6 rounded-full bg-surface-container-highest" aria-hidden="true" />
        <div className="confetti-shape bottom-1/3 left-10 w-8 h-4 rounded-full bg-secondary-fixed" aria-hidden="true" />
        <div className="confetti-shape top-1/2 right-16 w-4 h-4 rounded-sm bg-tertiary-fixed" aria-hidden="true" />

        {/* Success Message Content */}
        <div className="max-w-md w-full flex flex-col items-center gap-8 text-center z-10 my-auto">
          {/* Success Illustration Container */}
          <div className="relative">
            <div className="absolute inset-0 bg-white/40 blur-3xl rounded-full scale-125" />
            <img
              alt="Success Mascot"
              className="w-48 md:w-56 max-h-40 md:max-h-48 object-contain drop-shadow-xl relative z-10"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFlMXg5G1S1eMiHFB5Cx0gRz0Yt6vvfPb6lSIn8eqPMOavq0DzSiq0uSsOP8rmHaCdcB0J9Wq9CeRqgw1UUT_oTt3fXHPTKMPRuxOQBGk0PpZhhXkN9VDiNTq0lwrQQNJLKzGyx8P8H-omBZI1R_okj9ifHsYpD9LQOvJ3ddig8jTC3jKdj5axZYUP2slWi-04y8hkdebdzEOWTUyaUXV_6eY4PzfyCX81Vvon0CqddlPpMFCmw2s0ZbwXCmXv8meJCah2LywJMBCU"
            />
          </div>

          {/* Speech Bubble Style Headline */}
          <div className="bg-white p-6 rounded-lg shadow-[0px_8px_24px_rgba(0,0,0,0.08)] relative border-2 border-surface-container-highest">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-t-2 border-l-2 border-surface-container-highest rotate-45" />
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-2">
              {currentContent.successTitle}
            </h1>
            <p className="font-body-md text-on-surface-variant">
              {currentContent.successBody}
            </p>
          </div>

          {/* Progress Insight */}
          <div className="flex gap-2 bg-surface-container/50 p-3 rounded-full backdrop-blur-sm">
            <div className="w-12 h-4 rounded-full bg-tertiary-container flex items-center justify-center">
              <span
                className="material-symbols-outlined text-[12px] text-white"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            </div>
            <div className="w-12 h-4 rounded-full bg-tertiary-container flex items-center justify-center">
              <span
                className="material-symbols-outlined text-[12px] text-white"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            </div>
            <div className="w-12 h-4 rounded-full bg-tertiary-container flex items-center justify-center">
              <span
                className="material-symbols-outlined text-[12px] text-white"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            </div>
            <div className="w-12 h-4 rounded-full bg-surface-container-highest" />
          </div>

          {/* Action Button Section */}
          <div className="w-full pt-4">
            <Link
              className="w-full bg-primary text-on-primary font-headline-lg-mobile text-headline-lg-mobile h-touch-target-min rounded-lg chunky-shadow flex items-center justify-center gap-3 transition-all"
              href="/"
            >
              Selesai
              <span className="material-symbols-outlined text-3xl">task_alt</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Bottom Navigation Shell */}
      <nav className="fixed bottom-0 left-0 w-full rounded-t-lg z-50 bg-white/80 backdrop-blur-xl border-t-4 border-surface-container-highest shadow-[0px_-8px_24px_rgba(0,0,0,0.08)]">
        <div className="flex justify-around items-center px-gutter pb-4 pt-2 w-full">
          <Link
            className="flex flex-col items-center justify-center text-on-surface-variant w-14 h-14 hover:bg-surface-container-high transition-colors active:translate-y-1"
            href="/"
          >
            <span className="material-symbols-outlined">home</span>
          </Link>
          <Link
            className="flex flex-col items-center justify-center text-on-surface-variant w-14 h-14 hover:bg-surface-container-high transition-colors active:translate-y-1"
            href="/"
          >
            <span className="material-symbols-outlined">camera</span>
          </Link>
          <div className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full w-14 h-14 border-b-4 border-on-secondary-fixed-variant">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              emoji_events
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}
