import { useState } from "react";

type Props = {
    items: string[];
    onChange: (value: string) => void;
};

const CustomRadio = ({ items, onChange }: Props) => {
    const [selected, setSelected] = useState<string>("");

    return (
        <>
            <div className="">
                <ul className="flex items-center gap-3">
                    {items.map((item: string) => {
                        return (
                            <li
                                className={`cursor-pointer ${selected === item ? "underline text-primary-purple" : ""}`}
                                onClick={() => {
                                    setSelected(item);
                                    onChange(item);
                                }}
                            >
                                {item}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export default CustomRadio;
