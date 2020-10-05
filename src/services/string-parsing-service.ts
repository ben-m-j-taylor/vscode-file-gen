import CasingType from '../enums/casing-type-enum';
import Config from '../types/config/config';

const TEMPLATE_STRING_START_CHARS = '&{';
const TEMPLATE_STRING_END_CHARS = '}&';

const parseTemplateStrings = (input: string, parentDirName: string, config: Config): string => {
    const parsedInput = input;

    const bagOfWords = getBagOfWords(parentDirName, config);

    return parsedInput;
};

/**
 * getBagOfWords takes a string as input and returns an array of it's parts
 * e.g. "someInputString" -> ["some", "input", "string"]
 * @param string
 */
const getBagOfWords = (input: string, config: Config): string[] => {
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

export { parseTemplateStrings, getBagOfWords };
