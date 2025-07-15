"use client";

import { useLoadingStore } from "@/stores/loading";
import { CustomLinkProps } from "@/types/props/custom-link-props";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const CustomLink = ({ href, children, className }: CustomLinkProps) => {
  const pathname = usePathname();
	const searchParams = useSearchParams();
  const { setIsLoading } = useLoadingStore();

	return (
		<Link
			href={href}
			onClick={(e) => {
				if (`${pathname}/?${searchParams.toString()}` !== href) setIsLoading(true); else e.preventDefault();
			}}
			className={className}
		>
			{children}
		</Link>
	);
};

export default CustomLink;
