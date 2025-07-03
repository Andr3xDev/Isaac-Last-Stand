import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lobby" element={<Lobby />} />{" "}
            {/* DOTO: eliminte this debugging */}
            <Route path="/lobby/:roomCode" element={<Lobby />} />
            <Route path="/" element={<Navigate to="/" />} />
        </Routes>
    );
};
