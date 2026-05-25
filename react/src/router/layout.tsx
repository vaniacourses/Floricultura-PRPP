import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/footer";

const Layout = () => {
  return (
    <>
      <NavBar />
      <div className="">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default Layout;
