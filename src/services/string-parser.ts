import Config from '../types/config/config';
import {
    getBagOfWords,
    getCamelCaseString,
    getKebabCaseString,
    getPascalCaseString,
    getSnakeCaseString,
} from './string-parsing-service';

class StringParser {
    private START_CHARS = '&{';
    private END_CHARS = '}&';

    private bagOfWords: string[];

    constructor(parentDirName: string, config: Config) {
        this.bagOfWords = getBagOfWords(parentDirName, config);
    }

    public parse(input: string): string {
        let parsedString = input;

        // Parse camelCase
        const camelCaseMatchingString = `${this.START_CHARS}CAMEL_CASE${this.END_CHARS}`;

        const camelCaseValue = getCamelCaseString(this.bagOfWords);

        parsedString = parsedString.replace(camelCaseMatchingString, camelCaseValue);

        // Parse PascalCase
        const pascalCaseMatchingString = `${this.START_CHARS}PASCAL_CASE${this.END_CHARS}`;

        const pascalCaseValue = getPascalCaseString(this.bagOfWords);

        parsedString = parsedString.replace(pascalCaseMatchingString, pascalCaseValue);

        // Parse snake_case
        const snakeCaseMatchingString = `${this.START_CHARS}SNAKE_CASE${this.END_CHARS}`;

        const snakeCaseValue = getSnakeCaseString(this.bagOfWords);

        parsedString = parsedString.replace(snakeCaseMatchingString, snakeCaseValue);

        // Parse kebab-case
        const kebabCaseMatchingString = `${this.START_CHARS}KEBAB_CASE${this.END_CHARS}`;

        const kebabCaseValue = getKebabCaseString(this.bagOfWords);

        parsedString = parsedString.replace(kebabCaseMatchingString, kebabCaseValue);

        return parsedString;
    }
}

export default StringParser;
