import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import LobbyHub from "./pages/LobbyHub";
import { WebSocketProvider } from "./context/WebSocketContext";

export const AppRoutes = () => {
    return (
        <WebSocketProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/lobby" element={<Lobby />} />{" "}
                {/* DOTO: eliminte this debugging */}
                <Route path="/lobby/:roomCode" element={<Lobby />} />
                <Route path="/lobbyhub" element={<LobbyHub />} />{" "}
            </Routes>
        </WebSocketProvider>
    );
};
