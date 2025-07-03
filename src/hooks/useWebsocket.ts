import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

import type { Lobby } from "../services/lobbbySocket";

export const useWebSocket = (serverUrl: string) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [lobbyState, setLobbyState] = useState<Lobby | null>(null);

    useEffect(() => {
        const newSocket = io(serverUrl, {
            transports: ["websocket"],
        });

        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log(
                "🔌 Conectado al servidor de WebSockets. ID:",
                newSocket.id
            );
        });

        newSocket.on("lobbyState", (data: Lobby) => {
            console.log("✅ Estado del lobby recibido:", data);
            setLobbyState(data);
        });

        newSocket.on("error", (error) => {
            console.error("❌ Error del servidor:", error);
        });

        newSocket.on("disconnect", () => {
            console.log("🔌 Desconectado del servidor de WebSockets");
            setLobbyState(null);
        });

        return () => {
            console.log("Limpiando y desconectando el socket.");
            newSocket.disconnect();
        };
    }, [serverUrl]);

    return { socket, lobbyState };
};
