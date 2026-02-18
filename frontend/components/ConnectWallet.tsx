"use client";

import { useEffect, useState } from "react";
import { userSession, authenticate } from "../lib/stacks-wallet";

export default function ConnectWallet() {
    const [mounted, setMounted] = useState(false);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        setMounted(true);
        if (userSession.isUserSignedIn()) {
            setUserData(userSession.loadUserData());
        }
    }, []);

    if (!mounted) return null;

    if (userData) {
        return (
            <div className="flex flex-col items-center gap-2">
                <p className="text-zinc-600 dark:text-zinc-400">
                    Connected: {userData.profile.stxAddress.testnet}
                </p>
                <button
                    onClick={() => {
                        userSession.signUserOut("/");
                        setUserData(null);
                    }}
                    className="rounded-full bg-red-500 px-5 py-2 text-white hover:bg-red-600"
                >
                    Disconnect
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={() => authenticate()}
            className="rounded-full bg-orange-500 px-5 py-2 text-white hover:bg-orange-600 transition-colors"
        >
            Connect Stacks Wallet
        </button>
    );
}
