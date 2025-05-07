import React from "react";
import { Button } from "@/components/catalyst/button";

type StartButton = {
	onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const StartButton = ({ onClick }: StartButton) => (
	<Button
		onClick={onClick}
		style={{
			position: "fixed",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			zIndex: "20",
		}}
	>
		✨ enter ✨
	</Button>
);
