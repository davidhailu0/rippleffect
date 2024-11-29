import { useAppSelector } from "@/lib/reduxStore/hooks";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import { motion } from "framer-motion";

const NotificationBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lead = useAppSelector((state) => state.auth.lead);
  const pathname = usePathname();
  const router = useRouter();

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null; // If not visible, render nothing

  const messageToRender = () => {
    if (lead?.tag_list.includes("step3_watched")) {
      return null;
    } else if (
      lead?.tag_list.includes("booked_call") &&
      !lead?.tag_list.includes("survey_completed")
    ) {
      return {
        message: `You've booked your call, but haven't answered the important questions yet.`,
        actionLabel: "Complete Questionnaire",
        hideThisMessageOnRoute: "/questionnaire",
        onAction: () => {
          router.push("/questionnaire");
        },
      };
    } else if (lead?.tag_list.includes("booked_call")) {
      return {
        message: `You've booked your call! Don't forget to watch all the videos in Step 3 before your call.`,
        actionLabel: "Go to Step 3",
        hideThisMessageOnRoute: "/step-3",
        onAction: () => {
          router.push("/step-3");
        },
      };
    } else if (lead?.tag_list.includes("step2_watched")) {
      return {
        message: `You've completed Step 2! You're now ready to book a call`,
        actionLabel: "Book a Call",
        hideThisMessageOnRoute: "/book",
        onAction: () => {
          router.push("/book");
        },
      };
    } else if (lead?.tag_list.includes("step1_watched")) {
      return {
        message: `You've completed Step 1! You can now proceed to Step 2.`,
        actionLabel: "Watch Step 2",
        hideThisMessageOnRoute: "/step-2",
        onAction: () => {
          router.push("/step-2");
        },
      };
    } else if (lead?.tag_list?.length === 0) {
      return {
        message: `You've Signed Up Successfully! You can now proceed to Step 1.`,
        actionLabel: "Watch Step 1",
        hideThisMessageOnRoute: "/step-1",
        onAction: () => {
          router.push("/step-1");
        },
      };
    } else {
      return null;
    }
  };

  const result = messageToRender();

  if (!result) return null;

  const { message, hideThisMessageOnRoute, actionLabel, onAction } = result;

  return (
    <>
      {pathname.includes(hideThisMessageOnRoute) ? null : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-10 max-w-[300px] flex-col gap-3 left-4 transition-all px-4 py-3 rounded shadow-lg flex"
          style={{
            backgroundColor: "#facc15",
            color: "#000000",
            border: "1px solid #fbbf24",
            zIndex: 50,
          }}
        >
          <span className="font-bold w-[] max-w-[94%]">{message}</span>
          <div className="flex  w-full">
            {actionLabel && (
              <button
                onClick={onAction}
                className="bg-black w-full text-white px-5 py-3 rounded hover:bg-gray-800 transition"
              >
                {actionLabel}
              </button>
            )}
            <button
              onClick={handleClose}
              className="text-black absolute right-3 text-xl top-3 font-bold hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};
export default NotificationBanner;
