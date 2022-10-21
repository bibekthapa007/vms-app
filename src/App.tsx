import { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import UserRoute from "./components/UserRoute";
import { fetchUserData } from "./features/auth/AuthSlice";

import SignInPage from "./features/auth/SignInPage";
import SignUpPage from "./features/auth/SignUpPage";
import HomePage from "./features/home/HomePage";
import CreateVaccinePage from "./features/vaccine/CreateVaccine";
import EditVaccinePage from "./features/vaccine/EditVaccinePage";
import VaccinePage from "./features/vaccine/VaccinePage";
import paths from "./paths";
import { useAppDispatch, useAppSelector } from "./store/hook";

function App() {
  const dispatch = useAppDispatch();
  const { initialLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  if (initialLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Routes>
      <Route path={paths.signin} element={<SignInPage />} />
      <Route path={paths.signup} element={<SignUpPage />} />
      <Route
        path={paths.home}
        element={
          <UserRoute>
            <HomePage />
          </UserRoute>
        }
      />
      <Route path={"/"} element={<VaccineRoute />}>
        <Route
          path={paths.vaccine}
          element={
            <UserRoute>
              <VaccinePage />
            </UserRoute>
          }
        />
        <Route
          path={paths.createVaccine}
          element={
            <UserRoute>
              <CreateVaccinePage />
            </UserRoute>
          }
        />
        <Route
          path={"/vaccine/edit/:vaccine_id"}
          element={
            <UserRoute>
              <EditVaccinePage />
            </UserRoute>
          }
        />
      </Route>
    </Routes>
  );
}

function VaccineRoute() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
