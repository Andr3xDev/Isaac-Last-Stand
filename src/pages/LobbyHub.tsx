import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PublicRoomItem, { type Room } from "../components/PublicRoomItem";
import { useSocket } from "../context/WebSocketContext";

const LobbyHub: React.FC = () => {
    const navigate = useNavigate();
    const { socket, lobbyState } = useSocket();
    const [roomCode, setRoomCode] = useState("");
    const [publicRooms, setPublicRooms] = useState<Room[]>([]);

    useEffect(() => {
        if (lobbyState && lobbyState.id) {
            navigate(`/lobby/${lobbyState.id}`);
        }
    }, [lobbyState, navigate]);

    const handleJoinWithCode = () => {
        if (!roomCode) {
            alert("El código de la sala no puede estar vacío.");
            return;
        }
        if (socket) {
            socket.emit("joinLobby", { lobbyId: roomCode.toUpperCase() });
        }
    };

    const handleJoinPublicRoom = (lobbyId: string) => {
        if (socket) {
            socket.emit("joinLobby", { lobbyId });
        }
    };

    useEffect(() => {
        if (socket) {
            socket.emit("getPublicLobbies");
            socket.on("publicLobbiesList", (rooms: Room[]) =>
                setPublicRooms(rooms)
            );
            return () => {
                socket.off("publicLobbiesList");
            };
        }
    }, [socket]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 text-white">
            <div className="container-menu w-1/2 space-y-6">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Lobby Hub</h1>
                </div>

                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        placeholder="LOBBY CODE"
                        className="flex-grow bg-[#090909] border border-[#402120] rounded-lg p-3 text-center font-mono tracking-widest text-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition"
                    />
                    <button
                        onClick={handleJoinWithCode}
                        className="bg-red-700 font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                    >
                        JOIN
                    </button>
                </div>

                <div className="flex items-center text-gray-400">
                    <div className="flex-grow border-t border-gray-600"></div>
                    <span className="px-4">O</span>
                    <div className="flex-grow border-t border-gray-600"></div>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-center">
                        Public lobbies
                    </h2>
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                        {publicRooms.length > 0 ? (
                            publicRooms.map((room) => (
                                <PublicRoomItem
                                    key={room.id}
                                    room={room}
                                    onJoin={() => handleJoinPublicRoom(room.id)}
                                />
                            ))
                        ) : (
                            <p className="text-center text-gray-400">
                                There are not public lobbies.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LobbyHub;
