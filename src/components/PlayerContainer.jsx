"use client";

import { useState } from "react";

export default function PlayerContainer({ fetchPlayerDetails }) {
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
          onClick={(e) => fetchPlayerDetails(username)}
        >
          Search
        </button>
      </div>
      <div className="bg-gray-800">stats be here</div>
    </div>
  );
}
