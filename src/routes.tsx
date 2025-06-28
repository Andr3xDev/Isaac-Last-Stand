import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route>{/* Futuras rutas protegidas aquí */}</Route>

            <Route path="/" element={<Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};
