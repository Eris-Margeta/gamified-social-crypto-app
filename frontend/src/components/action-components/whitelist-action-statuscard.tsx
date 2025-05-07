// import { useEffect, useState, useCallback } from "react";

// import { useSession } from "@/hooks/use-session";
// import { Progress } from "@/components/ui/progress";

export const WhitelistActionsStatus = () => {
	//   const [totalPoints, setTotalPoints] = useState<number>(0);

	// const fetchPointsForAction = useCallback(
	//    async (action: string): Promise<number> => {
	//         if (!sessionUsername) return 0;

	//        const API_URL: string = import.meta.env.VITE_BACK_END_URL;
	//        const API_KEY: string = import.meta.env.VITE_API_KEY;

	//       try {
	//           const response = await fetch(
	//             `${API_URL}/api/user-action-points/${sessionUsername}?from_action=${encodeURIComponent(
	//                  action
	//              )}`,
	//              {
	//                  headers: {
	//                     Authorization: `Bearer ${API_KEY}`,
	//                },
	//            }
	//        );

	//        if (!response.ok) {
	//           throw new Error(`HTTP error! status: ${response.status}`);
	//       }

	//        const data = await response.json();
	//         return data.totalPoints || 0;
	//     } catch (error) {
	//         console.error(`Error fetching points for action ${action}:`, error);
	//         return 0;
	//     }
	//     },
	//     [sessionUsername]
	//  );

	// useEffect(() => {
	//     const actions = [
	//         "whitelist-1",
	//        "change_profile_picture",
	//        "twitter-status-update",
	//      "change_banner",
	//        "change_bio",
	//     ];
	//     let isMounted = true;

	//     const fetchAndUpdatePoints = async () => {
	//         try {
	//            const pointsArray = await Promise.all(
	//                actions.map((action) => fetchPointsForAction(action))
	//            );
	//            const total = pointsArray.reduce((acc, points) => acc + points, 0);

	//            if (isMounted) {
	//                setTotalPoints(total);
	//           }
	//       } catch (error) {
	//           console.error("Error fetching action points:", error);
	//       }
	//    };

	//    fetchAndUpdatePoints();

	//    const intervalId = setInterval(fetchAndUpdatePoints, 5000);

	//     return () => {
	//        isMounted = false;
	//         clearInterval(intervalId);
	//    };
	//   }, [fetchPointsForAction]);

	return (
		<div
			id="whitelist-preview"
			className="space-y-2 mx-auto rounded-2xl bg-black border border-green-500 bg-opacity-70 p-8 flex flex-col items-center justify-center w-full mb-6 backdrop-filter backdrop-blur text-center"
		>
			<h3 className="text-xl font-medium text-emerald-500">
				Connect SOLANA wallet for whitelist.
			</h3>
			{/* <p className="text-md pt-4 font-medium text-emerald-500">
                Earn additional points by performing actions
            </p>
             <p className="text-md pt-4 text-sm text-emerald-500">
                {`${totalPoints} / 300 points earned for VIP AIRDROP.`}
            </p>
          
            <Progress value={Math.min((totalPoints / 300) * 100, 100)} /> */}
			<p className="text-md pt-4 text-sm text-emerald-500">
				More actions coming soon...
			</p>
		</div>
	);
};
