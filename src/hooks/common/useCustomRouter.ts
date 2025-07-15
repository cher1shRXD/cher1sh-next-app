"use client";

import { useLoadingStore } from "@/stores/loading";
import { usePathname, useRouter } from "next/navigation";

export const useCustomRouter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsLoading } = useLoadingStore();

	const push = (href: string) => {
		if (pathname !== href) {
			setIsLoading(true);
			setTimeout(() => router.push(href), 200);
		}
	};

    const replace = (href: string) => {
			if (pathname !== href) {
				setIsLoading(true);
				setTimeout(() => router.replace(href), 200);
			}
    };

    const back = () => {
			setIsLoading(true);
			setTimeout(() => router.back(), 200);
    };

    return {
			push,
			replace,
			back,
    };
};
