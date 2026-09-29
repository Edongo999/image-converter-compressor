import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
const Layout = ({ children }) => {
    return (_jsxs("div", { className: "bg-gray-950 text-white", children: [_jsx(Navbar, {}), _jsx("main", { children: children }), _jsx(Footer, {})] }));
};
export default Layout;
