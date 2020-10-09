import CasingType from '../enums/casing-type-enum';
import Config from '../types/config/config';

/**
 * getBagOfWords takes a string as input and returns an array of it's parts
 * e.g. "someInputString" -> ["some", "input", "string"]
 * @param string
 */
export const getBagOfWords = (input: string, config: Config): string[] => {
    let splitter: RegExp | string = '';

    switch (config.directoryNameCasing) {
        case CasingType.camelCase:
        case CasingType.pascalCase:
            splitter = /(?<=[a-z])(?=[A-Z])+/g;
            break;
        case CasingType.snakeCase:
            splitter = '_';
            break;
        case CasingType.kebabCase:
            splitter = '-';
            break;
        default:
            break;
    }

    return input.split(splitter).map((s) => s.toLowerCase());
};

/**
 * getCamelCaseString takes a "bag of words" and returns them as a camelCase string
 * @param bagOfWords The "bag of words" to convert to camelCase
 * @returns A camelCase formatted string
 */
export const getCamelCaseString = (bagOfWords: string[]): string => {
    return bagOfWords.map((s, i) => (i > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : s)).join('');
};

/**
 * getPascalCaseString takes a "bag of words" and returns them as a PascalCase string
 * @param bagOfWords The "bag of words" to convert to PascalCase
 * @returns A PascalCase formatted string
 */
export const getPascalCaseString = (bagOfWords: string[]): string => {
    return bagOfWords.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('');
};

/**
 * getSnakeCaseString takes a "bag of words" and returns them as a snake_case string
 * @param bagOfWords The "bag of words" to convert to snake_case
 * @returns A snake_case formatted string
 */
export const getSnakeCaseString = (bagOfWords: string[]): string => {
    return bagOfWords.join('_');
};

/**
 * getKebabCaseString takes a "bag of words" and returns them as a kebab-case string
 * @param bagOfWords The "bag of words" to convert to kebab-case
 * @returns A kebab-case formatted string
 */
export const getKebabCaseString = (bagOfWords: string[]): string => {
    return bagOfWords.join('-');
};
