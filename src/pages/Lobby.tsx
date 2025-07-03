import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PlayerList from "../components/PlayerList";
import { useSocket } from "../context/WebSocketContext";

const LobbyPage: React.FC = () => {
    const { roomCode } = useParams<{ roomCode?: string }>();

    const { socket, lobbyState } = useSocket();

    useEffect(() => {
        if (socket && roomCode) {
            if (lobbyState?.id === roomCode) {
                console.log("[LobbyPage] Ya estoy en este lobby.");
                return;
            }

            const playerName =
                sessionStorage.getItem("playerName") || "Invitado";
            console.log(`[LobbyPage] Uniéndose al lobby: ${roomCode}`);
            socket.emit("joinLobby", { lobbyId: roomCode, name: playerName });
        }
    }, [roomCode, socket, lobbyState]);

    const handlePlayerReadyToggle = () => {
        if (socket && lobbyState && socket.id) {
            const self = lobbyState.players[socket.id];
            if (self) {
                socket.emit("setReady", {
                    lobbyId: lobbyState.id,
                    isReady: !self.isReady,
                });
            }
        }
    };

    const handleStartGame = () => {
        if (socket && lobbyState && lobbyState.hostId === socket.id) {
            socket.emit("startGame", { lobbyId: lobbyState.id });
        }
    };

    if (!lobbyState || lobbyState.id !== roomCode) {
        return <div className="text-white text-2xl">Joinning to lobby...</div>;
    }

    const players = Object.values(lobbyState.players);
    const isHost = lobbyState.hostId === socket?.id;
    const selfPlayer = lobbyState.players[socket?.id ?? ""];

    return (
        <div className="text-white min-h-screen flex items-center justify-center font-sans">
            <div className="container-menu w-1/2 h-1/2 p-8">
                <div className="text-center mb-8 border-b border-[#090909] pb-6">
                    <h2 className="text-3xl font-bold tracking-wider">
                        LOBBY CODE
                    </h2>
                    <div className="mt-4 bg-[#090909] border border-[#402120] rounded-lg p-3 inline-block">
                        <span className="text-2xl font-mono font-bold text-emerald-400 tracking-widest">
                            {lobbyState.id}
                        </span>
                    </div>
                </div>

                <PlayerList
                    players={players}
                    onPlayerReadyToggle={function (): void {
                        throw new Error("Function not implemented.");
                    }}
                />

                <div className="mt-8 flex justify-center gap-4">
                    <button
                        onClick={handlePlayerReadyToggle}
                        className={`text-2xl cursor-pointer text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-200 ${
                            selfPlayer?.isReady
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-gray-600 hover:bg-gray-700"
                        }`}
                    >
                        {selfPlayer?.isReady ? "Ready ✅" : "Not Ready ❌"}
                    </button>
                    {isHost && (
                        <button
                            onClick={handleStartGame}
                            className="text-2xl cursor-pointer bg-[#863832] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-[#402120] transition-all duration-200"
                        >
                            Start Game
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LobbyPage;
