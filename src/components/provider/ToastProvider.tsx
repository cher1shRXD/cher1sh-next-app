"use client"

import { CircleAlert, CircleCheck, CircleX, Info, X } from "lucide-react";
import React, {useEffect, useState} from "react";


export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  duration?: number;
}

const eventEmitter = {
  listeners: new Map(),
  on(event: string, callback: (toast: ToastMessage) => void) {
    this.listeners.set(event, callback);
  },
  emit(event: string, data: ToastMessage) {
    const callback = this.listeners.get(event);
    if (callback) callback(data);
  },
};

const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    eventEmitter.on("showToast", (toast: ToastMessage) => {
      setToasts((prev) => [...prev, toast]);

      setTimeout(() => {
        removeToast(toast.id);
      }, toast.duration || 3000);
    });
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const getToastIcon = (type: ToastMessage["type"]) => {
    switch (type) {
      case "success":
        return <CircleCheck color="green" />;
      case "error":
        return <CircleX color="red" />;
      case "warning":
        return <CircleAlert color="orange" />;
      case "info":
      default:
        return <Info color="blue" />;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`min-w-[300px] p-4 rounded shadow-lg flex items-center toast
            white transform transition-all duration-300 ease-in-out bg-white gap-2`}
        >
          {getToastIcon(toast.type)}
          <span>{toast.message}</span>
          <div className="flex-1" />
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-4 text-white hover:text-gray-200"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export const toast = {
  show(message: string, type: ToastMessage["type"] = "info", duration = 3000) {
    eventEmitter.emit("showToast", {
      id: Date.now().toString(),
      message,
      type,
      duration,
    });
  },
  success(message: string, duration?: number) {
    this.show(message, "success", duration);
  },
  error(message: string, duration?: number) {
    this.show(message, "error", duration);
  },
  warning(message: string, duration?: number) {
    this.show(message, "warning", duration);
  },
  info(message: string, duration?: number) {
    this.show(message, "info", duration);
  },
};

export default ToastContainer;
