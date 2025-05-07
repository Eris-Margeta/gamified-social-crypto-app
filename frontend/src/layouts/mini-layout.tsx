import React from "react";

interface MiniLayoutProps {
	children: React.ReactNode;
}

export const MiniLayout = ({ children }: MiniLayoutProps) => {
	return (
		<div
			className="flex flex-col w-full h-min overflow-auto"

		>
			{children}
		</div>
	);
};
