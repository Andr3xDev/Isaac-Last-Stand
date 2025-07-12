import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/container.css";
import { useSocket } from "../context/WebSocketContext";

function Home() {
    const navigate = useNavigate();
    const { socket, lobbyState } = useSocket();
    const [playerName, setPlayerName] = useState(
        sessionStorage.getItem("playerName") || "Guest"
    );

    useEffect(() => {
        if (lobbyState && lobbyState.id) {
            console.log(
                `[Home] Estado de lobby recibido. Navegando a /lobby/${lobbyState.id}`
            );
            sessionStorage.setItem("playerName", playerName);
            navigate(`/lobby/${lobbyState.id}`);
        }
    }, [lobbyState, navigate, playerName]);

    const handleCreateLobby = () => {
        if (!playerName) {
            alert("Por favor, introduce un nombre para crear el lobby.");
            return;
        }
        if (socket) {
            socket.emit("createLobby", { name: playerName });
        } else {
            alert(
                "Aún no se ha conectado al servidor. Inténtalo de nuevo en un momento."
            );
        }
    };

    return (
        <div className="w-screen h-screen flex justify-center items-start">
            <div className="w-1/2 flex flex-col items-center">
                <img
                    src="/src/assets/title.png"
                    alt="Logo game"
                    className="w-full my-6"
                />
                <div className="container-menu w-11/13 flex-col flex gap-8 justify-center ">
                    <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Introduce tu nombre"
                        className="text-2xl text-center p-2 rounded-md bg-[#090909] text-white border border-[#402120]"
                    />
                    <button
                        onClick={handleCreateLobby}
                        className="text-4xl cursor-pointer bg-[#863832] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-[#402120] transition-all duration-200"
                    >
                        Create Lobby
                    </button>
                    <button
                        onClick={() => navigate("/lobbyhub")}
                        className="text-4xl cursor-pointer bg-[#863832] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-[#402120] transition-all duration-200"
                    >
                        Join Lobby
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
