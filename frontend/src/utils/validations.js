export const required = (value) => !!value || 'Ovo polje je obavezno.';

export const email = (value) =>
    /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) ||
    'Neispravna email adresa.';

export const minLength = (min) => (value) =>
    value.length >= min || `Tekst mora biti duži od ${min} znakova.`;

export const maxLength = (max) => (value) =>
    value.length <= max || `Tekst ne može biti duži od ${max} znakova.`;

export const noWhitespace = (value) =>
    !/\s/.test(value) || 'Tekst ne smije imati razmak.';

export const containsUppercase = (value) =>
    /[A-Z]/.test(value) || 'Tekst mora imati barem jedno veliko slovo.';

export const containsSpecialCharacter = (value) =>
    /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
    'Tekst mora imati barem jedan poseban znak.';

export const regex = (pattern) => (value) =>
    pattern.test(value) || `Neispravna vrijednost.`;

export const password = (value) => {
    return required(value) !== true
        ? 'Lozinka je obavezna'
        : minLength(8)(value) !== true
        ? 'Lozinka mora imati barem 8 znakova'
        : containsUppercase(value) !== true
        ? 'Lozinka mora imati barem jedno veliko slovo'
        : true;
};
