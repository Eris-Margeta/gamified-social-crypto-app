import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/layouts/main-layout";
import { AuthProvider } from "@/contexts/auth-context";
import { SessionProvider } from "@/contexts/session-context";
import { AlertProvider } from "@/contexts/alert-context";
import { LocalStorageProvider } from "@/contexts/state-local-storage-context";
import { inject } from "@vercel/analytics"


import { Verify } from "@/components/helpers/verify-route-handler";
import { HomePage } from "@/pages/homepage";

import { ContextProvider } from "@/contexts/wagmi-context";

inject();

export const App = () => {

	return (
		<AuthProvider>
			<SessionProvider>
				<Router>
					<ContextProvider>
					<MainLayout>
						<LocalStorageProvider>
							<AlertProvider>
								<Routes>
									<Route path="/" element={<HomePage />} />
									<Route path="/verify" element={<Verify />} />
								</Routes>
							</AlertProvider>
						</LocalStorageProvider>
					</MainLayout>
					</ContextProvider>
				</Router>
			</SessionProvider>
		</AuthProvider>
	);
};
