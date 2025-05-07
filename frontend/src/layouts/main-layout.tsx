import { useAuth } from "@/hooks/use-auth";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/layouts/main-layout-components/header";
// import { Footer } from "@/layouts/main-layout-components/footer";
import { LoadingIndicator } from "@/components/loading-indicator";


type MainLayoutProps = {
	children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
	const { isAuthenticated, isLoading } = useAuth();

	return (
		<div className="flex flex-col h-screen w-screen mx-auto bg-transparent  ">
    {!isLoading && isAuthenticated && <Header />}
    <LoadingIndicator />
    <main className="flex flex-col w-full h-full overflow-auto">
      {children}</main>
    <Toaster />
    
</div>

	);
};
