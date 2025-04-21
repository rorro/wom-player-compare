import { useState } from "react";
import SkillRow from "./SkillRow";
import BossRow from "./BossRow";
import ActivityRow from "./ActivityRow";
import ComputedRow from "./ComputedRow";

export default function PlayerContainer({
  fetchPlayerDetails,
  playerDetails,
  topMetrics,
}) {
  const [username, setUsername] = useState("");
  const [disabled, setDisabled] = useState(false);

  function isLeader(username, metric, category) {
    if (!topMetrics[category] || !topMetrics[category][metric]) return false;
    return topMetrics[category][metric].player === username;
  }

  return (
    <div className="m-3">
      <div className="flex bg-gray-800 h-10 items-center p-2">
        <input
          type="text"
          className="h-7 w-42 mr-3 rounded-md px-3 border border-gray-600 text-sm leading-7 shadow-inner placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-500 bg-gray-900 shadow-gray-950 focus-visible:bg-gray-950 disabled:opacity-50"
          placeholder="Username"
          autoComplete="off"
          name="username"
          maxLength={12}
          onChange={(e) => setUsername(e.target.value)}
          disabled={disabled}
        />

        <button
          className="font-medium disabled:opacity-50 disabled:pointer-events-none shadow-button bg-blue-600 hover:bg-blue-500 text-white active:opacity-80 text-sm h-7 px-3 rounded-md"
          onClick={async (e) => {
            setDisabled(true);
            try {
              const result = await fetchPlayerDetails(username);
              if (!result) {
                setDisabled(false);
              }
            } catch (err) {
              setDisabled(false);
            }
          }}
          disabled={disabled}
        >
          Search
        </button>
      </div>
      {playerDetails && playerDetails[username] && (
        <>
          <table className="w-full text-left text-sm bg-gray-800 overflow-hidden mb-2">
            <thead className="bg-gray-800 text-gray-100">
              <tr>
                <th className="p-2"></th>
                <th className="p-2">Metric</th>
                <th className="p-2">Rank</th>
                <th className="p-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {playerDetails &&
                playerDetails[username] &&
                Object.values(
                  playerDetails[username].latestSnapshot.data.computed
                ).map((computed) => {
                  return (
                    <ComputedRow
                      metric={computed}
                      top={isLeader(username, computed.metric, "computed")}
                      key={computed.metric}
                    />
                  );
                })}
            </tbody>
          </table>

          <table className="w-full text-left text-sm bg-gray-800 overflow-hidden mb-2">
            <thead className="bg-gray-800 text-gray-100">
              <tr>
                <th className="p-2"></th>
                <th className="p-2">Metric</th>
                <th className="p-2">Rank</th>
                <th className="p-2">Level</th>
                <th className="p-2">Experience</th>
              </tr>
            </thead>
            <tbody>
              {playerDetails &&
                playerDetails[username] &&
                Object.values(
                  playerDetails[username].latestSnapshot.data.skills
                ).map((skill) => {
                  return (
                    <SkillRow
                      metric={skill}
                      top={isLeader(username, skill.metric, "skills")}
                      key={skill.metric}
                    />
                  );
                })}
            </tbody>
          </table>

          <table className="w-full text-left text-sm bg-gray-800 overflow-hidden mb-2">
            <thead className="bg-gray-800 text-gray-100">
              <tr>
                <th className="p-2"></th>
                <th className="p-2">Metric</th>
                <th className="p-2">Rank</th>
                <th className="p-2">Kills</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(
                playerDetails[username].latestSnapshot.data.bosses
              ).map((boss) => {
                return (
                  <BossRow
                    metric={boss}
                    top={isLeader(username, boss.metric, "bosses")}
                    key={boss.metric}
                  />
                );
              })}
            </tbody>
          </table>

          <table className="w-full text-left text-sm bg-gray-800 overflow-hidden">
            <thead className="bg-gray-800 text-gray-100">
              <tr>
                <th className="p-2"></th>
                <th className="p-2">Metric</th>
                <th className="p-2">Rank</th>
                <th className="p-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(
                playerDetails[username].latestSnapshot.data.activities
              ).map((activity) => {
                return (
                  <ActivityRow
                    metric={activity}
                    top={isLeader(username, activity.metric, "activities")}
                    key={activity.metric}
                  />
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
