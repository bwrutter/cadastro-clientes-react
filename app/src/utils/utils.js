export function validateDocument(document) {
    if (typeof document !== 'string' || !/^\d+$/.test(document)) {
        return "INVALIDO";
    }

    switch (document.length) {
        case 11:
            return "CPF";
        case 14:
            return "CNPJ";
        default:
            return "INVALIDO";
    }
}