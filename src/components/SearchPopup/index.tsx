import { ReactNode } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

type Props = {
    children: ReactNode;
    options: ReactNode[];
};

const SearchPopup = ({ children, options }: Props) => {
    return (
        <div className="max-h-[300px]">
            {children}
            <div>
                {options.map((option) => {
                    return (
                        <div className="w-full">
                            {/* PREFIX */}
                            <div>
                                <MagnifyingGlassIcon />
                            </div>
                            <div>
                                <p>{option!.courseName}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SearchPopup;
