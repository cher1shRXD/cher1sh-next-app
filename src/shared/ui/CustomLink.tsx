"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useLoadingStore } from "../model/loading";

interface Props { 
  href: string; 
  children: React.ReactNode;
  className: string;
}

const CustomLink = ({ href, children, className }: Props) => {
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
