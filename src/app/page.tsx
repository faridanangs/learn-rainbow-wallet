import { YourApp } from "@/components/ConnectBTn.custom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      {/* <YourApp/> */}
      <ConnectButton/>
    </main>
  );
}
