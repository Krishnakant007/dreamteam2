

// components/PlayerList.tsx

import { Team } from "../../types/match";

interface PlayerListProps {
  team: Team;
}

export default function PlayerList({ team }: PlayerListProps) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">{team.name} Players</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {team.playerDetails.map((player) => (
          <div
            key={player.id}
            className="bg-gray-700 p-4 rounded-lg flex items-center space-x-4"
          >
            <img
              src={player.imgURL || "/fallback.png"}
              alt={player.name}
              className="w-12 h-12 object-cover rounded-full"
            />
            <span
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: player.substitute ? "blue" : "green",
              }}
            ></span>
            <p className="text-white">{player.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
