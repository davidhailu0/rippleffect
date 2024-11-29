import { ENVIRONMENT } from "@/lib/constants";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const errorHandler = (err: Error | AxiosError) => {
  if (ENVIRONMENT === "dev") {
    console.log(err);
  }
  if (err instanceof AxiosError && err?.response?.data) {
    const responseData = err.response.data;
    if (responseData.message) {
      toast.error("Error Happened", {
        description: responseData.message,
        id: responseData.message,
      });
      throw responseData.message;
    } else if (responseData.error) {
      toast.error("Error Happened", {
        description: responseData.error,
        id: responseData.error,
      });
      throw responseData.error;
    } else {
      toast.error("Network Error", {
        id: "Network Error",
      });
      throw "Network Error";
    }
  } else {
    toast.error("Network Error", {
      id: "Network Error",
    });
    throw err?.message || "Network Error";
  }
};
