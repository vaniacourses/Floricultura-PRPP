import React from "react";
import { Outlet } from "react-router-dom";
import SidebarCliente from "./SidebarCliente";

const ClientePage = () => {
  return (
    <div className="flex min-h-screen bg-rosa-claro font-menu">
      <SidebarCliente />   {/* agora sem props */}
      <main className="flex-1 p-12 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default ClientePage;