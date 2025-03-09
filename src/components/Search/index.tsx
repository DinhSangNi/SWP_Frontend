import { AutoComplete, Input } from "antd";
import type { AutoCompleteProps } from "antd";
import { IoMdSearch } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { searchCourse } from "@/services/courseService";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

type Props = {
    placeHolder?: string;
    autoComplete?: boolean;
};

const SearchForm = ({ placeHolder, autoComplete = true }: Props) => {
    const [query, setQuery] = useState("");
    const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);

    const navigate = useNavigate();

    const handleSelect = (value: string) => {
        setOptions([]);
        setQuery(value);
        console.log("value: ", value);
        navigate(`/search/?query=${encodeURIComponent(value)}`);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleEnter = () => {
        if (query.length !== 0) {
            navigate(`/search/?query=${encodeURIComponent(query)}`);
            console.log(encodeURIComponent(query));
        }
    };

    useEffect(() => {
        if (query.length === 0) {
            setOptions([]);
            return;
        }

        const fetchDataOnSearch = async () => {
            try {
                const response = await searchCourse(encodeURIComponent(query));
                if (response) {
                    const searchOptions = response.$values.map(
                        (course: any) => {
                            return {
                                value: course.courseName,
                                label: (
                                    <div className="flex justify-start items-center gap-2 font-bold">
                                        <MagnifyingGlassIcon className="h-4 w-4" />
                                        <p>{course.courseName}</p>
                                    </div>
                                ),
                            };
                        }
                    );

                    setOptions(searchOptions);
                }
            } catch (error) {
                console.log("error: ", error);
                setOptions([]);
            }
        };

        const debounceTimout = setTimeout(fetchDataOnSearch, 500);

        return () => {
            clearTimeout(debounceTimout);
        };
    }, [query]);

    return (
        <div className="w-full">
            {autoComplete ? (
                <AutoComplete
                    className="w-full"
                    size="large"
                    options={options}
                    onSelect={handleSelect}
                >
                    <Input
                        allowClear
                        className="w-full rounded-3xl hover:border-[#6d28d2] focus-within:border-[#6d28d2]"
                        prefix={<IoMdSearch className="text-[1.5rem]" />}
                        onChange={handleSearch}
                        value={query}
                        onPressEnter={handleEnter}
                        placeholder={placeHolder}
                        size="large"
                    />
                </AutoComplete>
            ) : (
                <Input
                    allowClear
                    className="w-full rounded-3xl hover:border-[#6d28d2] focus-within:border-[#6d28d2]"
                    prefix={<IoMdSearch className="text-[1.5rem]" />}
                    onChange={handleSearch}
                    value={query}
                    onPressEnter={handleEnter}
                    placeholder={placeHolder}
                    size="large"
                />
            )}
        </div>
    );
};

export default SearchForm;
