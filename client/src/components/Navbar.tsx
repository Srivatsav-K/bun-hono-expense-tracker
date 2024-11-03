import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  return (
    <nav>
      <div className="flex gap-4 mb-2 justify-center items-center p-4">
        <Link to={"/"} className="hover:underline">
          Home
        </Link>
        <Link to={"/expenses"} className="hover:underline">
          Expenses
        </Link>

        <ModeToggle />
      </div>

      <Separator />
    </nav>
  );
};
export default Navbar;
