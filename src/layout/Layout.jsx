import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className=" min-h-full w-full ">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
