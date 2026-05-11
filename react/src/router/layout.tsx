import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";

const Layout = () => {
  return (
    
    <>
      <NavBar />
      <div className="">
        <Outlet />
      </div>
    </>
  );
};
export default Layout;