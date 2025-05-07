// import { useEffect, useState } from "react";
// import { useSession } from "@/hooks/use-session";
import { useFetchPoints } from "@/hooks/use-fetch-points";

export const DailyActionStatusCard = () => {
    // const { username: sessionUsername } = useSession();
    const {  isLoading } = useFetchPoints();
    // Assuming useFetchPoints hook is adjusted to fetch total user points
    // and does not depend on specific actions like "whitelist"

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="space-y-8 mx-auto rounded-2xl bg-black border border-green-500 bg-opacity-70 p-12 flex flex-col items-center justify-center w-full mb-6 backdrop-filter backdrop-blur text-center">
            <h3 className="text-xl font-medium text-emerald-500">
                My Daily Points: (coming-soon)
            </h3>
        </div>
    );
};
