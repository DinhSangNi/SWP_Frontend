import { Howl } from "howler";
import applauseSoundEffect from "@/assets/sounds/applause-01.mp3";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const TestTailwind = () => {
    const [isMute, setIsMute] = useState<boolean>(false);
    const [applauseSound, setApplauseSound] = useState<Howl | null>();

    const location = useLocation();
    const [isAllowed, setIsAllowed] = useState(false);

    useEffect(() => {
        if (applauseSound) {
            applauseSound.mute(isMute);
        }
    }, [isMute, applauseSound]);

    const handlePlaySound = () => {
        applauseSound?.play();
    };

    const handleMute = () => {
        setIsMute(!isMute);
    };

    useEffect(() => {
        const sound = new Howl({
            src: [applauseSoundEffect],
            volume: 1.0,
        });
        setApplauseSound(sound);
    }, []);

    useEffect(() => {}, []);

    useEffect(() => {
        const allowSound = localStorage.getItem("allowSound");
        if (allowSound === "true") {
            setIsAllowed(true);
            localStorage.removeItem("allowSound"); // Xóa trạng thái sau khi dùng
        }
    }, []);

    useEffect(() => {
        if (
            location.pathname === "/test-tailwind" &&
            isAllowed &&
            applauseSound
        ) {
            applauseSound.play();
        }

        return () => {
            applauseSound?.stop();
        };
    }, [location.pathname, isAllowed, applauseSound]);

    console.log("isMute: ", isMute);

    return (
        <div>
            {/* <button onClick={handlePlaySound}>Play Sound</button> */}
            <button onClick={handleMute}>Mute</button>
        </div>
    );
};

export default TestTailwind;
