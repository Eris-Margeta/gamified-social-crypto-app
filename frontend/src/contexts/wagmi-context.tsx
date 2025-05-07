import { ReactNode } from "react";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

const metadata = {
	name: "Web3Modal",
	description: "Web3Modal Example",
	url: "https://app.midnightapes.com",
	icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet] as const;

const config = defaultWagmiConfig({
	chains,
	projectId,
	metadata,
	enableWalletConnect: true,
	enableInjected: true,
	enableEIP6963: true,
	enableCoinbase: true,
	//enableEmail: true,
});

createWeb3Modal({
	wagmiConfig: config,
	projectId,
	enableAnalytics: true,
});

interface ContextProviderProps {
	children: ReactNode;
}

export function ContextProvider({ children }: ContextProviderProps) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</WagmiProvider>
	);
}
