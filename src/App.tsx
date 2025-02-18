import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/stores/store";
// import AuthInitializer from "./stores/AuthInitializer";

const App = () => {
    return (
        <Provider store={store}>
            {/* <AuthInitializer />{" "} */}
            {/* Đảm bảo AuthInitializer chạy bên trong Provider */}
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
};

export default App;
