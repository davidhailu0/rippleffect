import { NotificationBarProps } from "@/app/(protected)/work-with-me-old/_components/YellowNotificationbar";
import Cookies from "js-cookie";
export default function utilcheckFirstTimeLogin(
  redirect: (arg: string) => void
): NotificationBarProps {
  if (Cookies.get("questionFinished")) {
    if (sessionStorage.getItem("go-to-step-3")) {
      return {};
    }
    return {
      message: `You've booked your call! Don't forget to watch all the videos in Step 3.`,
      actionLabel: "Go to Step 3",
      onAction: () => {
        sessionStorage.setItem("go-to-step-3", "true");
        redirect("/work-with-me/step-3");
      },
    };
  } else if (Cookies.get("booked")) {
    if (sessionStorage.getItem("go-to-question")) {
      return {};
    }
    return {
      message: `You've booked your call, but haven't answered the important questions yet.`,
      actionLabel: "Complete Questionnaire",
      onAction: () => {
        sessionStorage.setItem("go-to-question", "true");
        redirect("/work-with-me/questionnaire");
      },
    };
  } else if (Cookies.get("step-2-watched")) {
    if (sessionStorage.getItem("go-to-book")) {
      return {};
    }
    sessionStorage.setItem("go-to-book", "true");
    return {
      message: `You've completed Step 2! You're now ready to book a call`,
      actionLabel: "Book a Call",
      onAction: () => {
        sessionStorage.setItem("go-to-book", "true");
        redirect("/work-with-me/book");
      },
    };
  } else if (Cookies.get("step-1-watched")) {
    if (sessionStorage.getItem("go-to-step-2")) {
      return {};
    }
    return {
      message: `You've completed Step 1! You can now proceed to Step 2.`,
      actionLabel: "Watch Step 2",
      onAction: () => {
        sessionStorage.setItem("go-to-step-2", "true");
        redirect("/work-with-me/step-2");
      },
    };
  } else if (Cookies.get("token")) {
    if (sessionStorage.getItem("token")) {
      return {};
    }
    return {
      message: `You've Signup Successfully! You can now proceed to Step 1.`,
      actionLabel: "Watch Step 1",
      onAction: () => {
        sessionStorage.setItem("token", "true");
        redirect("/work-with-me/step-1");
      },
    };
  }
  return {};
}
