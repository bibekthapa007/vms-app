import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignInPage from "./features/auth/SignInPage";
import SignUpPage from "./features/auth/SignUpPage";
import CreateVaccinePage from "./features/vaccine/CreateVaccine";
import EditVaccinePage from "./features/vaccine/EditVaccinePage";
import VaccinePage from "./features/vaccine/VaccinePage";
import paths from "./paths";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.home} element={<App />} />
        <Route path={paths.signin} element={<SignInPage />} />
        <Route path={paths.signup} element={<SignUpPage />} />
        <Route path={paths.vaccine} element={<VaccinePage />} />
        <Route path={paths.createVaccine} element={<CreateVaccinePage />} />
        <Route
          path={"/vaccine/edit/:vaccine_id"}
          element={<EditVaccinePage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
