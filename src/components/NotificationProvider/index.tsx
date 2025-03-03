import { createContext, ReactNode, useState } from "react";

type Props = {
    children: ReactNode;
};

type NotificationContextType = {
    message: string | null;
    setMessage: (message: string | null) => void;
};

export const NotifaicationContext = createContext<
    NotificationContextType | undefined
>(undefined);

const NotificationProvider = ({ children }: Props) => {
    const [message, setMessage] = useState<string | null>(null);
    return (
        <>
            <NotifaicationContext.Provider value={{ message, setMessage }}>
                {children}
            </NotifaicationContext.Provider>
        </>
    );
};

export default NotificationProvider;
