export const strNormalizer = (str) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
