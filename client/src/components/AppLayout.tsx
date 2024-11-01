import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <>
      <Navbar />

      <main className="container p-4 mx-auto">
        <Outlet />
      </main>
    </>
  );
};
export default AppLayout;
