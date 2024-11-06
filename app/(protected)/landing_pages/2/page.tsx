"use client";
import VideoPlayer from "@/app/components/videoComponent";
import { Button } from "@/components/ui/button";
import { Suspense, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { GetVideoContext } from "@/app/hooks/VideoContext";
import AuthPopup from "../../work-with-me-old/_components/AuthPopup";
import { useSearchParams } from "next/navigation";

const App: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showBtn, setShowBtn] = useState(false);
  const videoContext = GetVideoContext();
  const landing_page = videoContext?.videos.find(({ tag_list }) =>
    tag_list.includes("landing")
  );

  useEffect(() => {
    if (!Cookies.get("token")) {
      setShowBtn(true);
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col items-center h-auto overflow-hidden bg-gradient-radial from-gray-900 to-black min-h-screen">
      <div className="flex flex-col md:flex-row w-full items-center justify-between md:justify-center md:space-x-8 space-y-8 md:space-y-0 p-8">
        {/* Left Side: Video Player */}
        <div className="flex flex-col items-center md:w-2/3">
          <VideoPlayer
            videoID={landing_page?.id}
            playBackId={landing_page?.mux_playback_id}
            className="md:h-[460px]"
          />
        </div>

        {/* Right Side: Text Content and Button */}
        <div className="flex flex-col items-center gap-4 justify-center h-full md:w-1/3 text-center md:text-left">
          <span className="mb-4 px-6 py-2 bg-white/20 rounded-lg transition">
            No Experience Required
          </span>
          <h1 className="text-5xl font-semibold mb-4">Work with Me</h1>
          <p className="text-lg mb-8">
            Get Free Access to My Lead-Generating Sales System!
          </p>
          {showBtn && (
            <Button
              onClick={() => setShowPopup(true)}
              className="px-6 py-3 h-12 bg-pink-400 text-white hover:bg-pink-600 transition rounded-[50px] shadow-xl font-bold mt-4"
            >
              Create Account
            </Button>
          )}
        </div>
      </div>

      {showPopup && (
        <Suspense>
          <AuthPopup closePopup={closePopup} />
        </Suspense>
      )}

      <footer className="mt-auto mb-4 text-sm">
        &copy; {new Date().getFullYear()} All rights reserved.
      </footer>
    </div>
  );
};

export default App;