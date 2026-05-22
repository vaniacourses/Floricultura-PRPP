import { Outlet } from "react-router-dom";
import SidebarAdmin from "../../components/admin/SidebarAdmin";

const AdministradorPage = () => {
  return (

    <div className="flex h-[calc(100vh-125px)] w-full overflow-hidden bg-white">

      <SidebarAdmin />

      <main className="flex-1 h-full overflow-y-auto bg-gray-50/30 p-8">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdministradorPage;
