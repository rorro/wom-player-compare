"use client";

import PlayerContainer from "@/components/PlayerContainer";
import client from "@/services/wiseoldman";
import { useState } from "react";

export default function Home() {
  const [playerDetails, setPlayerDetails] = useState({});

  async function fetchPlayerDetails(username) {
    const playerStats = await client.players.getPlayerDetails(username);
    if (!playerStats) return;

    setPlayerDetails((prev) => ({
      ...prev,
      [username]: playerStats,
    }));
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex">
        <PlayerContainer
          fetchPlayerDetails={fetchPlayerDetails}
          playerDetails={playerDetails}
        />
        <PlayerContainer
          fetchPlayerDetails={fetchPlayerDetails}
          playerDetails={playerDetails}
        />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://wiseoldman.net"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="wom-logo.svg"
            alt="wise old man logo"
            className="h-7 w-auto"
          />
        </a>
      </footer>
    </div>
  );
}
