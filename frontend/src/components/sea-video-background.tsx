import { useEffect, useRef, useState } from "react";

type SeaVideoBackgroundProps = {
	isMuted: boolean;
};

export const SeaVideoBackground = ({ isMuted }: SeaVideoBackgroundProps) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isMobile, setIsMobile] = useState(false);

	const checkIfMobile = () => window.innerWidth <= 768;

	useEffect(() => {
		setIsMobile(checkIfMobile());

		const handleResize = () => {
			setIsMobile(checkIfMobile());
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.playbackRate = 0.6;
		}
	}, []);

	return (
		<>
			<video
				autoPlay
				loop
				muted={isMuted}
				playsInline
				ref={videoRef}
				style={{
					position: "fixed",
					width: "100%",
					left: "50%",
					top: "50%",
					height: "100%",
					objectFit: "cover",
					transform: "translate(-50%, -50%)",
					zIndex: "-2",
				}}
			>
				<source
					src={isMobile ? "./sea_mobile.mp4" : "./sea_horizontal.mp4"}
					type="video/mp4"
				/>
				Your browser does not support the video tag.
			</video>

			<div
				style={{
					position: "fixed",
					width: "100%",
					height: "100%",
					left: "0",
					top: "0",
					backgroundColor: "rgba(0, 0, 0, 0.25)",
					zIndex: "-1",
				}}
			></div>
		</>
	);
};
