import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/admin/SidebarAdmin";

const AdministradorPage = () => {
  return (
    /* h-[calc(100vh-125px)] garante que não passe da tela por causa da sua Navbar dupla */
    <div className="flex h-[calc(100vh-125px)] w-full overflow-hidden bg-white">
      {/* Sidebar Vertical */}
      <SidebarAdmin />

      {/* Área de Conteúdo */}
      <main className="flex-1 h-full overflow-y-auto bg-gray-50/30 p-8">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdministradorPage;
