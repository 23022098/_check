
import { Polynomial } from '../types';

export const addPolynomials = (p1: Polynomial, p2: Polynomial): Polynomial => {
    var result: Polynomial = { ...p1 };
    for (var power in p2) {
        var p = parseInt(power);
        result[p] = (result[p] || 0) + p2[p];
    }
    return result;
};

export const subtractPolynomials = (p1: Polynomial, p2: Polynomial): Polynomial => {
    var result: Polynomial = { ...p1 };
    for (var power in p2) {
        var p = parseInt(power);
        result[p] = (result[p] || 0) - p2[p];
    }
    return result;
};

export const evaluatePolynomial = (poly: Polynomial, k: number): number => {
    let result = 0;
    for (const power in poly) {
        result += poly[power] * Math.pow(k, parseInt(power));
    }
    return result;
};

export const formatPolynomial = (poly: Polynomial): string => {
    if (Object.keys(poly).length === 0) return '0';

    const terms = Object.keys(poly)
        .map(p => parseInt(p))
        .filter(p => poly[p] !== 0)
        .sort((a, b) => b - a);

    let resultString = '';
    for (const power of terms) {
        const coeff = poly[power];
        
        // This will produce things like "+ -5k" or "+ 1k"
        if (coeff > 0) {
            resultString += ` + ${coeff}`;
        } else {
            resultString += ` - ${Math.abs(coeff)}`;
        }

        if (power > 0) {
            resultString += 'k';
            if (power > 1) {
                resultString += `^${power}`;
            }
        }
    }
    
    // Naively remove leading " + "
    if (resultString.startsWith(' + ')) {
        resultString = resultString.substring(3);
    } else if (resultString.startsWith(' - ')) {
        // This handles leading negative correctly by making it "- 5" instead of "-5"
        resultString = '-' + resultString.substring(2);
    }

    return resultString.trim() ? resultString.trim() : '0';
};
