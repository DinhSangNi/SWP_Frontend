import { NotifaicationContext } from "@/components/NotificationProvider";
import { useContext } from "react";

export const useNotification = () => {
    const context = useContext(NotifaicationContext);

    if (!context) {
        throw new Error(
            "useNotification must be used within a NotificationProvider"
        );
    }

    return context;
};
