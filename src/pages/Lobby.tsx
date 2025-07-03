import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlayerList from "../components/PlayerList";
import { useWebSocket } from "../hooks/useWebsocket";

interface Player {
    id: string;
    name: string;
    isReady: boolean;
}

const LobbyPage: React.FC = () => {
    const { roomCode } = useParams<{ roomCode: string }>();
    const { sendMessage } = useWebSocket();

    const [players, setPlayers] = useState<Player[]>([
        { id: "host", name: "Tú (Host)", isReady: true },
    ]);

    useEffect(() => {
        if (roomCode) {
            sendMessage({
                type: "JOIN_ROOM",
                roomCode: roomCode,
            });
        }
    }, [roomCode, sendMessage]);

    const handlePlayerReadyToggle = (playerId: string) => {};

    return (
        <div className="text-white min-h-screen flex items-center justify-center font-sans">
            <div className="container-menu w-1/2 h-1/2">
                <div className="text-center mb-8 border-b border-[#090909] pb-6">
                    <h2 className="text-3xl font-bold tracking-wider">
                        LOBBY CODE
                    </h2>
                    <div className="mt-4 bg-[#090909] border border-[#402120] rounded-lg p-3 inline-block">
                        <span className="text-2xl font-mono font-bold text-emerald-400 tracking-widest">
                            {roomCode}
                        </span>
                    </div>
                </div>

                <PlayerList
                    players={players}
                    onPlayerReadyToggle={handlePlayerReadyToggle}
                />
            </div>
        </div>
    );
};

export default LobbyPage;
