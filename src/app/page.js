"use client";

import PlayerContainer from "@/components/PlayerContainer";
import client from "@/services/wiseoldman";
import { useState, useEffect } from "react";

export default function Home() {
  const [playerDetails, setPlayerDetails] = useState({});
  const [topMetrics, setTopMetrics] = useState({
    skills: {},
    bosses: {},
    activities: {},
    computed: {},
  });

  async function fetchPlayerDetails(username) {
    const playerStats = await client.players.getPlayerDetails(username);
    if (!playerStats) return null;

    setPlayerDetails((prev) => ({
      ...prev,
      [username]: playerStats,
    }));

    return playerStats;
  }

  function findLeader() {
    const skillLeader = {};
    const bossLeader = {};
    const activityLeader = {};
    const computedLeader = {};

    for (const [username, player] of Object.entries(playerDetails)) {
      const snapshot = player.latestSnapshot.data;

      // Skills
      for (const [skill, details] of Object.entries(snapshot.skills)) {
        if (
          !skillLeader[skill] ||
          details.experience > skillLeader[skill].value
        ) {
          skillLeader[skill] = {
            player: username,
            value: details.experience,
          };
        }
      }

      // Bosses
      for (const [boss, details] of Object.entries(snapshot.bosses)) {
        if (details.kills < 0) continue;

        if (!bossLeader[boss] || details.kills > bossLeader[boss].value) {
          bossLeader[boss] = {
            player: username,
            value: details.kills,
          };
        }
      }

      // Activities
      for (const [activity, details] of Object.entries(snapshot.activities)) {
        if (details.score < 0) continue;

        if (
          !activityLeader[activity] ||
          details.score > activityLeader[activity].value
        ) {
          activityLeader[activity] = {
            player: username,
            value: details.score,
          };
        }
      }

      // Computed
      for (const [computed, details] of Object.entries(snapshot.computed)) {
        if (details.score < 0) continue;

        if (
          !computedLeader[computed] ||
          details.value > computedLeader[computed].value
        ) {
          computedLeader[computed] = {
            player: username,
            value: details.value,
          };
        }
      }
    }

    return {
      skills: skillLeader,
      bosses: bossLeader,
      activities: activityLeader,
      computed: computedLeader,
    };
  }

  useEffect(() => {
    if (Object.keys(playerDetails).length === 0) return;

    const result = findLeader();
    setTopMetrics(result);
  }, [playerDetails]);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex">
        <PlayerContainer
          fetchPlayerDetails={fetchPlayerDetails}
          playerDetails={playerDetails}
          topMetrics={topMetrics}
        />
        <PlayerContainer
          fetchPlayerDetails={fetchPlayerDetails}
          playerDetails={playerDetails}
          topMetrics={topMetrics}
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
