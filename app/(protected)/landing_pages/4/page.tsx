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
    <div className="flex flex-col items-center h-screen bg-gray-900 bg-opacity-90 overflow-hidden">
      <div className="w-full max-w-4xl p-4">
        <header className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white">
            Discover Our Lead System
          </h1>
          <p className="text-gray-300 mt-2">
            Join thousands of others in growing your business.
          </p>
        </header>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <div className="w-full md:w-1/2 bg-white bg-opacity-20 rounded-xl p-6 shadow-lg backdrop-blur-md text-center">
            <span className="text-pink-400 font-semibold tracking-wide text-md">
              No Experience Required
            </span>
            <h2 className="text-3xl font-semibold text-white mt-4 mb-4">
              Start Your Journey
            </h2>
            <p className="text-gray-300 mb-6">
              Gain access to exclusive resources designed to grow your sales.
            </p>
            {showBtn && (
              <Button
                onClick={() => setShowPopup(true)}
                className="bg-pink-500 px-8 py-3 rounded-full shadow-xl text-white font-medium hover:bg-pink-600"
              >
                Join Now
              </Button>
            )}
            {showPopup && (
              <Suspense>
                <AuthPopup closePopup={closePopup} />
              </Suspense>
            )}
          </div>
          <div className="w-full md:w-1/2 bg-white bg-opacity-20 rounded-xl shadow-lg backdrop-blur-md p-4">
            <VideoPlayer
              videoID={landing_page?.id}
              playBackId={landing_page?.mux_playback_id}
            />
          </div>
        </div>
      </div>
      <footer className="mt-auto py-6 text-gray-400">
        &copy; {new Date().getFullYear()} All rights reserved.
      </footer>
    </div>
  );
};

export default App;
