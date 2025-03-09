export const uppercaseFirstLetter = (value: string) => {
    return value.trim()[0].toUpperCase();
};

export const isNumber = (value: string): boolean => {
    return !isNaN(Number(value));
};

export const randomHexColor = () =>
    Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
