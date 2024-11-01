import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Expenses from "./components/Expenses";
import Home from "./components/Home";
import Notfound from "./components/Notfound";
import AddExpense from "./components/AddExpense";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />

        <Route path="/expenses" element={<Expenses />} />
        <Route path="/expenses/new" element={<AddExpense />} />
      </Route>

      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default App;
