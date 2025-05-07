
type WoodsVideoBackground = {
	isMuted: boolean;
};

export const WoodsVideoBackground = ({ isMuted }: WoodsVideoBackground) => (
	<video
		autoPlay
		loop
		muted={isMuted}
		playsInline
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
		<source src="./woods1.mp4" type="video/mp4" />
		Your browser does not support the video tag.
	</video>
);
