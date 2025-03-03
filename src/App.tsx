import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/stores/store";
import { ToastContainer } from "react-toastify";

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <ToastContainer />
                    <AppRouter />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
};

export default App;
