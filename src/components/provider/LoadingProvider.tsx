"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { loadingStore } from "@/stores/loadingStore";
import { LoadingProviderProps } from "@/types/props/LoadingProviderProps";

const LoadingProvider = ({ color }: LoadingProviderProps) => {
  const pathname = usePathname();
  const { isLoading, setIsLoading } = loadingStore();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isLoading) {
      setVisible(true);
      setProgress(0)
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 99) {
            clearInterval(interval);
            return 99;
          }
          return prev + Math.floor(Math.random() * 5 + 1);
        });
      }, 200);
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
      setProgress(100);

      const timeout = setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => {
          setVisible(false);
          setProgress(0);
        }, 300);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 w-full h-0.5 z-[9999] pointer-events-none">
      <div
        className="h-full transition-all duration-300 ease-out"
        style={{ width: `${progress}%`, opacity: visible ? 1 : 0, background: color }}
      />
    </div>
  );
};

export default LoadingProvider;
