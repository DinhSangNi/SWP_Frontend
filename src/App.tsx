import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { Provider } from "react-redux";
import store from "./stores/store";
import AuthInitializer from "./stores/AuthInitializer";


const App = () => {
    return (
        <Provider store={store}>
            <AuthInitializer/>  {/* Đảm bảo AuthInitializer chạy bên trong Provider */}
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </Provider>
    );
};

export default App;
