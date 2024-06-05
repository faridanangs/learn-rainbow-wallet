'use client';
import "@rainbow-me/rainbowkit/styles.css"

import {RainbowKitProvider, getDefaultConfig, darkTheme, connectorsForWallets} from "@rainbow-me/rainbowkit";
import {WagmiProvider, createConfig, http} from "wagmi";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import { ReactNode } from "react";
import {mainnet, sepolia, localhost} from "wagmi/chains"
import { argentWallet, bifrostWallet, bitgetWallet, bitskiWallet, bloomWallet, bybitWallet, metaMaskWallet, rainbowWallet } from "@rainbow-me/rainbowkit/wallets";

type props = {
    children: ReactNode,
}

const connectors = connectorsForWallets(
    [
        {
            groupName: "Recomended",
            wallets: [rainbowWallet, bitgetWallet, argentWallet, bifrostWallet, bitskiWallet, bloomWallet, bybitWallet]
        }
    ],{
        appName: "My Rainbow App",
        projectId: "ce6ac5e8ab546d26a66333c40be4c701"
    }
)

const queryClient = new QueryClient();

export const config = createConfig({
    // appName: "My Walets",
    // projectId: "ce6ac5e8ab546d26a66333c40be4c701",
    connectors,
    chains: [{
        ...mainnet,
        iconBackground: "#f1f2f1",
        iconUrl: "https://cdn.iconscout.com/icon/free/png-512/free-ethereum-1-283135.png?f=webp&w=256"
    },{
        ...sepolia,
        iconBackground: "#f1f2f1",
        iconUrl: "https://cdn.iconscout.com/icon/free/png-512/free-ethereum-1-283135.png?f=webp&w=256"
    },{
        ...localhost,
        iconBackground: "#f1f1f2",
        iconUrl: "https://logowik.com/content/uploads/images/ganache-blockchain5516.logowik.com.webp"
    }],
    ssr: true,
    transports: {
        [sepolia.id]: http(),
        [localhost.id]: http("http://127.0.0.1:7545"),
        [mainnet.id]: http(),

    }
})

export function Providers({children}: props){
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider modalSize="wide" theme={darkTheme()}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}

declare module 'wagmi' {
    interface Register{
        config: typeof config
    }
}
