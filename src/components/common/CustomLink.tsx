"use client";

import { loadingStore } from "@/stores/loadingStore";
import { CustomLinkProps } from "@/types/props/CustomLinkProps";

import Link from "next/link";
import { usePathname } from "next/navigation";

const CustomLink = ({ href, children, className }: CustomLinkProps) => {
  const pathname = usePathname();
  const { setIsLoading } = loadingStore();

	return (
		<Link
			href={href}
			onClick={() => {
				if (pathname !== href) setIsLoading(true);
			}}
			className={className}
		>
			{children}
		</Link>
	);
};

export default CustomLink;
