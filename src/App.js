import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter } from "react-router-dom";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer";
import AppRoutes from "@/routes/AppRoutes";
function App() {
    return (_jsxs(BrowserRouter, { children: [_jsx(Navbar, {}), _jsx("div", { className: "pt-0", children: _jsx("main", { className: "flex-1", children: _jsx(AppRoutes, {}) }) }), _jsx(Footer, {})] }));
}
export default App;
