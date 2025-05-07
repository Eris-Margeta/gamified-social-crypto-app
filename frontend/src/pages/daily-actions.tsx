import { DailyActionStatusCard } from "@/components/action-components/daily-actions-statuscard";

export const DailyActions = () => {
	return (
		<div className="flex flex-col pt-8 lg:max-w-lg md:px-12 w-full px-4 mx-auto">
			<div
				className="overflow-auto w-full flex flex-col space-y-8 pl-6 pr-6 mr-1 ml-1 mx-auto"
				style={{ maxHeight: "calc(100vh - 10rem)" }}
			>
				<DailyActionStatusCard />
			</div>
		</div>
	);
};
