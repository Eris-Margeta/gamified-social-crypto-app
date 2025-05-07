import React, { useEffect, useState } from "react";
import leftDoorImage from "@/assets/left-half.png";
import rightDoorImage from "@/assets/right-half.png";
import "@/styles/myr-doors-overlay.css";

type MyrDoorsOverlayProps = {
	className?: string;
};

export const MyrDoorsOverlay: React.FC<MyrDoorsOverlayProps> = ({
	className,
}) => {
	const [hideImages, setHideImages] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setHideImages(true);
		}, 1500);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div
			className={`door-parts-overlay z-10 overflow-hidden ${className} ${
				hideImages ? "hide" : ""
			}`}
		>
			<img
				src={leftDoorImage}
				alt="Left Door Part"
				className={`left-half ${hideImages ? "hide" : ""}`}
			/>
			<img
				src={rightDoorImage}
				alt="Right Door Part"
				className={`right-half ${hideImages ? "hide" : ""}`}
			/>
		</div>
	);
};
