import Link from "next/link";

const DEFAULT_CONTENT = {
  silentTitle: "Hmm, yuk coba lagi ya!",
  silentBody: "Kadang kita ragu. Coba pilih membantu teman supaya semua senang.",
};

const VIDEO_CONTENT: Record<string, typeof DEFAULT_CONTENT> = {
  video_1: {
    silentTitle: "Hmm, kalau main sendiri kurang seru...",
    silentBody: "Ayo coba berbagi mainan dengan teman agar bisa bermain bersama dan lebih gembira!",
  },
  video_2: {
    silentTitle: "Wah, kasihan temanku...",
    silentBody: "Coba bantu temanmu yang sedang kesulitan agar pekerjaannya terasa lebih ringan!",
  },
  video_3: {
    silentTitle: "Hmm, bekerja sendirian melelahkan...",
    silentBody: "Ayo tawarkan bantuan untuk bekerja bersama agar tugas cepat selesai dan menyenangkan!",
  },
  video_4: {
    silentTitle: "Temanmu pasti merasa kesepian...",
    silentBody: "Cobalah mendekatinya dan hibur dia agar kesedihannya berkurang dan dia tersenyum lagi!",
  },
  video_5: {
    silentTitle: "Temanmu mungkin merasa karyanya kurang dihargai...",
    silentBody: "Ayo berikan pujian yang tulus agar temanmu merasa senang dan bersemangat berkarya!",
  },
  video_6: {
    silentTitle: "Menjauh dari teman baru membuatnya sedih...",
    silentBody: "Mari ajak teman baru bermain bersama karena perbedaan membuat pertemanan kita lebih kaya!",
  },
  video_7: {
    silentTitle: "Melewati teman begitu saja terasa dingin...",
    silentBody: "Cobalah menyapa dan berikan senyuman terbaikmu agar suasana menjadi lebih akrab!",
  },
};

export default async function SilentChoicePage(props: {
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

        {/* Reflection Content */}
        <div className="max-w-md w-full flex flex-col items-center gap-8 text-center z-10 my-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-white/40 blur-3xl rounded-full scale-125" />
            <img
              alt="Thinking Mascot"
              className="w-48 md:w-56 max-h-40 md:max-h-48 object-contain drop-shadow-xl relative z-10"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCek7BeVliq6Q4EMHNOVCux9Xdy0lymFIF2y4CLSA4L98BzTiIFsNiMeV4BKnZd8-KQE7YUyQtXn9oaEXct8E2qkYmNMmLV6Nem7e_9bdwKOqG0PyaAbhEZS7pSxjmu2Wr9VCeJ-qGPW2oJauwcBFSq6IUx45mF5UBlIDkcjlsQQOENN8Zc-2cHalgve4qJraxNmVfu03b2sZNe7hiH2Md3yttIBxtUhErNA-4m4ngQWWZb6gUJfVKV3yJLkzdpWYn2iP6ywTBuVc1U"
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-[0px_8px_24px_rgba(0,0,0,0.08)] relative border-2 border-surface-container-highest">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-t-2 border-l-2 border-surface-container-highest rotate-45" />
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-2">
              {currentContent.silentTitle}
            </h1>
            <p className="font-body-md text-on-surface-variant">
              {currentContent.silentBody}
            </p>
          </div>

          <div className="flex gap-2 bg-surface-container/50 p-3 rounded-full backdrop-blur-sm">
            <div className="w-12 h-4 rounded-full bg-tertiary-container flex items-center justify-center">
              <span
                className="material-symbols-outlined text-[12px] text-white"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            </div>
            <div className="w-12 h-4 rounded-full bg-surface-container-highest" />
            <div className="w-12 h-4 rounded-full bg-surface-container-highest" />
            <div className="w-12 h-4 rounded-full bg-surface-container-highest" />
          </div>

          {/* Action Button Section */}
          <div className="w-full pt-4">
            <Link
              className="w-full bg-primary text-on-primary font-headline-lg-mobile text-headline-lg-mobile h-touch-target-min rounded-lg chunky-shadow flex items-center justify-center gap-3 transition-all"
              href={`/decision${video ? `?video=${video}` : ""}`}
            >
              Coba Lagi
              <span className="material-symbols-outlined text-3xl">refresh</span>
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
