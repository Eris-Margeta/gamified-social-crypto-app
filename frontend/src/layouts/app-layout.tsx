import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/layouts/main-layout-components/header";
import { Footer } from "@/layouts/main-layout-components/footer";
import { LoadingIndicator } from "@/components/loading-indicator";

type AppLayoutProps = {
	children: React.ReactNode;
};

export const App = ({ children }: AppLayoutProps) => {
	return (
		<div className="flex flex-col min-h-screen h-screen w-screen mx-auto bg-transparent">
			<Header />
			<LoadingIndicator />
			<main className=" h-full w-full  mx-auto px-2 ">{children}</main>
			<Toaster />

			<Footer />
		</div>
	);
};
