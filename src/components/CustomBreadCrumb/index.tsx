import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { isNumber } from "@/utils/formatUtils";

type Props = {};

const CustomBreadCrumb = () => {
    const location = useLocation();
    const pathNames = location.pathname
        .split("/")
        .filter((name) => name !== "");

    console.log("pathNames: ", pathNames);
    return (
        <>
            <Breadcrumb>
                {/* <Breadcrumb.Item>
                    <Link to={"/"}>Home</Link>
                </Breadcrumb.Item> */}
                {pathNames.map((name, index) => {
                    console.log("type of: ", typeof name);
                    const url = `/${pathNames.slice(0, index + 1).join("/")}`;
                    return (
                        <>
                            {!isNumber(name as string) &&
                                name !== "dashboard" && (
                                    <Breadcrumb.Item key={url}>
                                        <Link
                                            to={
                                                index === pathNames.length - 1
                                                    ? ""
                                                    : url
                                            }
                                        >
                                            {name !== "dashboard"
                                                ? name.charAt(0).toUpperCase() +
                                                  name.slice(1)
                                                : "Admin Panel"}
                                        </Link>
                                    </Breadcrumb.Item>
                                )}
                        </>
                    );
                })}
            </Breadcrumb>
        </>
    );
};

export default CustomBreadCrumb;

// <Breadcrumb.Item key={url}>
//                             <Link
//                                 to={index === pathNames.length - 1 ? "" : url}
//                             >
//                                 {name !== "dashboard"
//                                     ? name.charAt(0).toUpperCase() +
//                                       name.slice(1)
//                                     : "Admin Panel"}
//                             </Link>
//                         </Breadcrumb.Item>
