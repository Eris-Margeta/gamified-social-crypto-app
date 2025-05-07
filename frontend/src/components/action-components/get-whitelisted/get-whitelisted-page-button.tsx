import { Button } from "@/components/catalyst/button";

interface GetWhitelistedPageButtonProps {
	onClick: () => void;
	children?: React.ReactNode;
}

export const GetWhitelistedPageButton = ({
	onClick,
	children,
}: GetWhitelistedPageButtonProps) => {
	return (
		<>
			<Button
				onClick={onClick}
				className="animate-glow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				{children || "GET WHITELISTED!"}
			</Button>
		
		</>
	);
};
