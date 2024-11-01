import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex gap-2 mb-2">
      <Link to={"/"}>Home</Link>
      <Link to={"/expenses"}>Expenses</Link>
    </nav>
  );
};
export default Navbar;
