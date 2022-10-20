import { Navigate } from "react-router-dom";
import paths from "../../paths";

export default function HomePage() {
  return <Navigate to={paths.vaccine} />;
}
