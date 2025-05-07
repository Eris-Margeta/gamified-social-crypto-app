import { useEffect, useRef, useState } from "react";
import closedDoorsImage from "@/assets/webp/myr-entry.avif";
import leftDoorImage from "@/assets/webp/left-half.avif";
import rightDoorImage from "@/assets/webp/right-half.avif";
import "@/styles/myr-entry-overlay.css";
import "@/styles/myr-doors-overlay.css";


type CombinedOverlayProps = {
	className?: string;
	startFadeOut: boolean;
};

export const CombinedOverlay = ({
	className,
	startFadeOut,
}: CombinedOverlayProps) => {
	const entryOverlayRef = useRef<HTMLImageElement>(null);
	const [hideDoors, setHideDoors] = useState(false);

	useEffect(() => {
		if (startFadeOut) {
			const fadeOutTimer = setTimeout(() => {
				if (entryOverlayRef.current) {
					entryOverlayRef.current.style.transition = "opacity 0.5s";
					entryOverlayRef.current.style.opacity = "0";
				}
			}, 1500);

			const hideDoorsTimer = setTimeout(() => {
				setHideDoors(true);
			}, 1500);
			return () => {
				clearTimeout(fadeOutTimer);
				clearTimeout(hideDoorsTimer);
			};
		}
	}, [startFadeOut]);

	return (
		<>
			<div className="justify-start w-screen h-screen">
				<>
					<img
						ref={entryOverlayRef}
						src={closedDoorsImage}
						alt="Closed Doors"
						className={className}
						style={{
							position: "relative",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							objectFit: "cover",
							zIndex: "15",
							opacity: "1",
						}}
					/>
				</>

				<div
					className={`door-parts-overlay ${className} ${
						hideDoors ? "hide" : ""
					}`}
					style={{ position: "absolute", zIndex: "10" }}
				>
					<img
						src={leftDoorImage}
						alt="Left Door Part"
						className={`left-half ${hideDoors ? "hide" : ""}`}
					/>
					<img
						src={rightDoorImage}
						alt="Right Door Part"
						className={`right-half ${hideDoors ? "hide" : ""}`}
					/>
				</div>
				
			</div>
		</>
	);
};
