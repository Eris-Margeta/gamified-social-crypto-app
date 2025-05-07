import  { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSession } from "@/hooks/use-session";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/utilities/logout";

export const Header = () => {
	const { username: sessionUsername } = useSession();
	const [displayUsername, setDisplayUsername] = useState("");

	useEffect(() => {

		setDisplayUsername(sessionUsername || Cookies.get("username") || "Guest");
	}, [sessionUsername]);

	return (
		<div className="sticky top-0 z-50 w-full h-min overflow-hidden">
		<div className="flex justify-center h-full">
		<header className="max-w-screen-2xl mx-auto sticky top-0 h-full w-full rounded-b-xl flex justify-between text-white bg-zinc-900 shadow-sm forced-colors:outline z-50">
			<h1 className="py-2 px-4 text-zinc-400 text-[1.1rem] min-w-max"> 🌑 midnight.</h1>
            <div className="text-right flex relative align-middle justify-end pr-6 md:pr-10 pl-10 items-center">
			<span className="text-emerald-500  font-semibold mr-4">{displayUsername}</span>

				<DropdownMenu>
					<DropdownMenuTrigger>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
							/>
						</svg>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => {
								/* Handle Get Help Action */
							}}
						>
							<span className="text-yellow-200 flex align-middle items-center group">
								Get Help
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="transition-opacity duration-500 ease-in-out opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 mr-[0.4rem] ml-[0.4rem] w-4 h-4"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
									/>
								</svg>
							</span>
						</DropdownMenuItem>
						<DropdownMenuItem>Instructions</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => {
								/* Handle My Points Action */
							}}
						>
							<span className="text-green-300 flex align-middle items-center group">
								My Points
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="transition-opacity duration-500 ease-in-out opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 mr-[0.4rem] ml-[0.4rem] w-4 h-4"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
									/>
								</svg>
							</span>
						</DropdownMenuItem>
						<DropdownMenuItem onClick={logout}>
							<span className="text-red-500 cursor-pointer flex align-middle items-center group">
								Log Out
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="ml-2 w-4 h-4"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3-3h-9m9 0l-3-3m3 3l-3 3"
									/>
								</svg>
							</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
		</div>
		</div>
	);
};
