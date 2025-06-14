"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { loadingStore } from "@/stores/loadingStore";
import { LoadingProviderProps } from "@/types/props/LoadingProviderProps";

const LoadingProvider = ({ color }: LoadingProviderProps) => {
  const pathname = usePathname();
  const { isLoading, setIsLoading } = loadingStore();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout>(null);

  const incrementProgress = useCallback(() => {
    setProgress((prev) => {
      if (prev < 30) {
        return prev + Math.random() * 8 + 2;
      } else if (prev < 70) {
        return prev + Math.random() * 4 + 1;
      } else if (prev < 90) {
        return prev + Math.random() * 2 + 0.5;
      } else {
        return Math.min(prev + Math.random() * 0.5, 95);
      }
    });
  }, []);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      setProgress(0);
      
      
      setProgress(5);
      
      intervalRef.current = setInterval(incrementProgress, 150);
    } else {
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isLoading, incrementProgress]);

 
  useEffect(() => {
    if (isLoading) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      setProgress(100);

      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  }, [pathname, setIsLoading]);

  useEffect(() => {
    if (!isLoading && visible) {
      hideTimeoutRef.current = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 200);
    }

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    };
  }, [isLoading, visible]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-0.5 z-[9999] pointer-events-none">
      <div
        className={`h-full transition-all ease-out ${
          progress === 100 ? 'duration-100' : 'duration-200'
        }`}
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
          background: color,
          boxShadow: visible ? `0 0 10px ${color}40` : 'none', 
        }}
      />
    </div>
  );
};

export default LoadingProvider;