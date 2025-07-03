import React, { createContext, useContext, useMemo } from "react";
import { Socket } from "socket.io-client";
import { useWebSocket } from "../hooks/useWebsocket";
import type { Lobby } from "../services/lobbbySocket";

interface WebSocketContextType {
    socket: Socket | null;
    lobbyState: Lobby | null;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
    undefined
);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { socket, lobbyState } = useWebSocket("http://localhost:3000");

    const value = useMemo(() => ({ socket, lobbyState }), [socket, lobbyState]);

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(WebSocketContext);
    if (context === undefined) {
        throw new Error(
            "useSocket debe ser usado dentro de un WebSocketProvider"
        );
    }
    return context;
};
