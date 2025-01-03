import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { ModeToggle } from "./ModeToggle";
import { useUser } from "@/api/hooks/user";

const Navbar = () => {
  const { data: user, isLoading } = useUser();

  return (
    <nav>
      <div className="flex gap-4 mb-2 justify-center items-center p-4">
        <Link to={"/"} className="hover:underline">
          Home
        </Link>

        <Link to={"/expenses"} className="hover:underline">
          Expenses
        </Link>

        {!isLoading && user?.id && (
          <a href={"/api/auth/logout"} className="hover:underline">
            Logout
          </a>
        )}

        {!isLoading && !user?.id && (
          <a href={"/api/auth/login"} className="hover:underline">
            Login
          </a>
        )}

        <ModeToggle />
      </div>

      <Separator />
    </nav>
  );
};
export default Navbar;
