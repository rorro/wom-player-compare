import { useState } from "react";
import SkillRow from "./SkillRow";
import BossRow from "./BossRow";
import ActivityRow from "./ActivityRow";

export default function PlayerContainer({ fetchPlayerDetails, playerDetails }) {
  const [username, setUsername] = useState("");

  return (
    <div className="m-3">
      <div className="flex bg-gray-800 h-10 items-center p-2">
        <input
          type="text"
          className="h-7 w-42 mr-3 rounded-md px-3 border border-gray-600 text-sm leading-7 shadow-inner placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-500 bg-gray-900 shadow-gray-950 focus-visible:bg-gray-950"
          placeholder="Username"
          autoComplete="off"
          name="username"
          maxLength={12}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          className="font-medium disabled:opacity-50 disabled:pointer-events-none shadow-button bg-blue-600 hover:bg-blue-500 text-white active:opacity-80 text-sm h-7 px-3 rounded-md"
          onClick={async (e) => await fetchPlayerDetails(username)}
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
                <th className="p-2">Level</th>
                <th className="p-2">Experience</th>
              </tr>
            </thead>
            <tbody>
              {playerDetails &&
                playerDetails[username] &&
                Object.values(
                  playerDetails[username]["latestSnapshot"]["data"]["skills"]
                ).map((skill) => {
                  return <SkillRow metric={skill} key={skill["metric"]} />;
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
                playerDetails[username]["latestSnapshot"]["data"]["bosses"]
              ).map((boss) => {
                return <BossRow metric={boss} key={boss["metric"]} />;
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
                playerDetails[username]["latestSnapshot"]["data"]["activities"]
              ).map((activity) => {
                return (
                  <ActivityRow metric={activity} key={activity["metric"]} />
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
