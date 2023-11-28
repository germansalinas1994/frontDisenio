import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Logout from "../components/Logout";
import ListadoIniciativaInvestigacion from "../pages/IniciativaInvestigacion/ListadoIniciativaInvestigacion";
import ListadoPid from "../pages/Pid/ListadoPid";

const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pid" element={<ListadoPid />} />
        <Route
          path="/iniciativadeinvestigacion"
          element={<ListadoIniciativaInvestigacion />}
        />
        <Route path="/logout" element={<Logout />} />

        {/* <Route path="*" element={ <Navigate to={"/home"}/> } /> */}
      </Routes>
    </div>
  );
};

export default AppRouter;
