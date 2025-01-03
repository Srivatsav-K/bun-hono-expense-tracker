import { useUser } from "@/api/hooks/user";
import { Outlet } from "react-router-dom";
import Loader from "./Loader";

const ProtectedRoute = () => {
  const { data: user, isLoading, error } = useUser();

  if (isLoading) {
    return <Loader />;
  }

  if (error?.status === 401 || !user?.id) {
    window.location.href = `/api/auth/login`; //TODO ?redirect=${location.pathname}`;
    return <Loader />;
  }

  if (error) {
    //TODO Error page
    console.log("🚀 ~ ProtectedRoute ~ error:", error);
    return <div>Error...</div>;
  }

  return <Outlet />;
};
export default ProtectedRoute;
