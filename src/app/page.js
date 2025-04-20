"use client";

import PlayerContainer from "@/components/PlayerContainer";
import client from "@/services/wiseoldman";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [playerDetails, setPlayerDetails] = useState("");

  async function fetchPlayerDetails(username) {
    const playerDetails = await client.players.getPlayerDetails(username);
    if (!playerDetails) return;

    console.log(playerDetails);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex">
        <PlayerContainer fetchPlayerDetails={fetchPlayerDetails} />
        <PlayerContainer />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://wiseoldman.net"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="wom-logo.svg"
            alt="wise old man logo"
            width={150}
            height={100}
          />
        </a>
      </footer>
    </div>
  );
}
