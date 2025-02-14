import { useRoutes } from "react-router-dom";
import { routes } from "./routes";

function AppRouter() {
    const element = useRoutes(routes);
    return <>{element}</>;
}
export default AppRouter;
