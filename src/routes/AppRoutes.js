import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import Home from "@/components/pages/Home";
import Compressor from "@/components/pages/compressor";
import About from "@/components/pages/About"; // <-- ajout de la page À propos
export default function AppRoutes() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/compressor", element: _jsx(Compressor, {}) }), _jsx(Route, { path: "/about", element: _jsx(About, {}) }), " "] }));
}
