import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer";
import AppRoutes from "@/routes/AppRoutes";

function App() {
  return (
   <BrowserRouter>
  <Navbar />

  <div className="pt-0">
    <main className="flex-1">
      <AppRoutes />
    </main>
  </div>

  <Footer />
</BrowserRouter>
  );
}
export default App;
