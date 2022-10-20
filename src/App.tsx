import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRoute from "./components/UserRoute";

import SignInPage from "./features/auth/SignInPage";
import SignUpPage from "./features/auth/SignUpPage";
import HomePage from "./features/home/HomePage";
import CreateVaccinePage from "./features/vaccine/CreateVaccine";
import EditVaccinePage from "./features/vaccine/EditVaccinePage";
import VaccinePage from "./features/vaccine/VaccinePage";
import paths from "./paths";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={paths.home}
          element={
            <UserRoute>
              <HomePage />
            </UserRoute>
          }
        />
        <Route path={paths.signin} element={<SignInPage />} />
        <Route path={paths.signup} element={<SignUpPage />} />
        <Route
          path={paths.vaccine}
          element={
            <UserRoute>
              <VaccinePage />
            </UserRoute>
          }
        />
        <Route path={paths.createVaccine} element={<CreateVaccinePage />} />
        <Route
          path={"/vaccine/edit/:vaccine_id"}
          element={
            <UserRoute>
              <EditVaccinePage />
            </UserRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
