import { Route, Routes } from "react-router-dom";
import AddExpense from "./components/AddExpense";
import AppLayout from "./components/AppLayout";
import Expenses from "./components/Expenses";
import Home from "./components/Home";
import Notfound from "./components/Notfound";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/expenses/new" element={<AddExpense />} />
        </Route>
      </Route>

      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default App;
