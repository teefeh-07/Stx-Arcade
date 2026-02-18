import Image from "next/image";
import ConnectWallet from "../components/ConnectWallet";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center gap-8 py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white">
          Stx Arcade
        </h1>
        <p className="text-center text-lg text-zinc-600 dark:text-zinc-400">
          Play decentralized games on the Stacks blockchain.
        </p>

        <div className="p-8 border rounded-2xl border-zinc-200 dark:border-zinc-800">
          <ConnectWallet />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 w-full">
          <div className="p-6 rounded-xl bg-zinc-100 dark:bg-zinc-900">
            <h3 className="font-semibold mb-2">Wallet Connect</h3>
            <p className="text-sm text-zinc-500">Integrated via @stacks/connect</p>
          </div>
          <div className="p-6 rounded-xl bg-zinc-100 dark:bg-zinc-900">
            <h3 className="font-semibold mb-2">Transactions</h3>
            <p className="text-sm text-zinc-500">Ready via @stacks/transactions</p>
          </div>
        </div>
      </main>
    </div>
  );
}
