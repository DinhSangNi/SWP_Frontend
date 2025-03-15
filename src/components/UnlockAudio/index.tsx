import { useEffect } from "react";
import { Howler } from "howler";

const UnlockAudio: React.FC = () => {
    useEffect(() => {
        const resumeAudio = () => {
            Howler.ctx.resume().then(() => {
                console.log("🔊 AudioContext unlocked!");
                document.removeEventListener("click", resumeAudio);
            });
        };

        document.addEventListener("click", resumeAudio);
        return () => document.removeEventListener("click", resumeAudio);
    }, []);

    return null;
};

export default UnlockAudio;
