export const formatDate = (date: string) => {
    const formattedDate = date.split("-");
    return `${formattedDate[2]}/${formattedDate[1]}/${formattedDate[0]}`;
};
