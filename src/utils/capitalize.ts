export const capitalize = (str: string): string => {
    const capitalized = str.charAt(0).toLocaleUpperCase() + str.slice(1)
    return capitalized
}