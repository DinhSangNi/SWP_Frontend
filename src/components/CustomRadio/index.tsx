type Props = {
    items: string[];
};

const CustomRadio = ({ items }: Props) => {
    return (
        <>
            <div className="">
                <ul className="flex items-center gap-3">
                    {items.map((item: string) => {
                        return <li className="cursor-pointer">{item}</li>;
                    })}
                </ul>
            </div>
        </>
    );
};

export default CustomRadio;
