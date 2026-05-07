import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";

const Layout = () => {
  return (
    
    <>
      <NavBar />
      <div className="mx-3 lg:mx-10 xl:20">
        <Outlet />
      </div>
    </>
  );
};
export default Layout;