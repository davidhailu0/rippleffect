"use client";
import VideoPlayer from "@/components/ui/VideoPlayer/VideoPlayer";
import { useAppSelector } from "@/lib/reduxStore/hooks";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const App: React.FC = () => {
  const videos = useAppSelector((state) => state.user.videos);
  const landing_page = videos?.find(({ tag_list }) =>
    tag_list.includes("landing")
  );
  const searchParams = useSearchParams();
  const ref_code = searchParams.get("ref_code");

  return (
    <div className="flex flex-col items-center h-auto overflow-hidden bg-gradient-radial from-gray-900 to-black pt-10">
      <div className="flex flex-col md:flex-row w-full items-center overflow-auto justify-between md:justify-center md:space-x-8 space-y-8 md:space-y-0 p-8">
        {/* Left Side: Text Content and Button */}
        <div className="flex flex-col items-center gap-4 justify-center h-full md:w-1/3 text-center md:text-left">
          <span className="mb-4 px-6 py-2 bg-white/20 rounded-lg transition">
            No Experience Required
          </span>
          <h1 className="text-5xl font-semibold mb-4">Work with Me</h1>
          <p className="text-lg mb-8">
            Get Free Access to My Lead-Generating Sales System!
          </p>
          <Link
            href={ref_code ? `/sign-up?ref_code=${ref_code}` : '/sign-up'}
            className="px-6 py-3 h-12 bg-pink-400 text-white hover:bg-pink-600 transition rounded-[50px] shadow-xl font-bold mt-4"
          >
            Create Account
          </Link>
        </div>

        {/* Right Side: Video Player */}
        <div className="flex flex-col items-center md:w-2/3">
          <VideoPlayer
            videoID={landing_page?.id}
            playBackId={landing_page?.mux_playback_id}
            className="md:h-[460px]"
          />
        </div>
      </div>

      <footer className="mt-auto mb-4 text-sm">
        &copy; {new Date().getFullYear()} All rights reserved.
      </footer>
    </div>
  );
};

export default App;
