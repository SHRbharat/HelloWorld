// src/hooks/useToast.js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Simple wrapper hook
export function useToast() {
  return {
    success: (msg) => toast.success(msg),
    error: (msg) => toast.error(msg),
    info: (msg) => toast.info(msg),
    warning: (msg) => toast.warning(msg),
  };
}

// import { toast } from "react-toastify";
// toast.success("Welcome to the Home Page!")
