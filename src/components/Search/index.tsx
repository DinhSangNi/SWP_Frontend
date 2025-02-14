import { Input } from "antd";
import type { AutoCompleteProps } from "antd";
import { IoMdSearch } from "react-icons/io";
import { useState } from "react";

type Props = {};

// FAKE SEARCH APIS
const getRandomInt = (max: number, min = 0) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const searchResult = (query: string) =>
    new Array(getRandomInt(5))
        .join(".")
        .split(".")
        .map((_, idx) => {
            const category = `${query}${idx}`;
            return {
                value: category,
                label: (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <span>
                            Found {query} on{" "}
                            <a
                                href={`https://s.taobao.com/search?q=${query}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {category}
                            </a>
                        </span>
                        <span>{getRandomInt(200, 100)} results</span>
                    </div>
                ),
            };
        });

const SearchForm = () => {
    const handleSearch = (e: any) => {};

    return (
        <div className="w-full">
            <Input
                className="w-full rounded-3xl py-3 hover:border-[#6d28d2] focus-within:border-[#6d28d2]"
                prefix={<IoMdSearch className="text-[1.5rem]" />}
                onPressEnter={handleSearch}
            ></Input>
        </div>
    );
};

export default SearchForm;
