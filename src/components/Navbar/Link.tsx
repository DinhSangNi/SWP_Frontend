import AnchorLink from "react-anchor-link-smooth-scroll";
import { SelectedPage } from "@/shared/types";

type Props = {
    page: string;
    selectedPage: string;
    setSelectedPage: (value: SelectedPage) => void;
};

function Link({ page, selectedPage, setSelectedPage }: Props) {
    const lowerCasePage = page.toLocaleLowerCase().replace(/ /g, "");
    // console.log("selected page: ", selectedPage);
    console.log("lowercase page: ", lowerCasePage);
    return (
        <AnchorLink
            className={`${selectedPage === lowerCasePage ? "text-primary-500" : ""} transition duration-500 hover:text-primary-300`}
            href={`#${lowerCasePage}`}
            onClick={() => setSelectedPage(lowerCasePage as SelectedPage)}
        >
            {page}
        </AnchorLink>
    );
}

export default Link;
