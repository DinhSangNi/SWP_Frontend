export const uppercaseFirstLetter = (value: string) => {
    return value.trim()[0].toUpperCase();
};

export const isNumber = (value: string): boolean => {
    return !isNaN(Number(value));
};
