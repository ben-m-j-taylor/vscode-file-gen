import Config from '../types/config/config';
import { getBagOfWords, getCamelCaseString } from './string-parsing-service';

class StringParser {
    private TEMPLATE_STRING_START_CHARS = '&{';
    private TEMPLATE_STRING_END_CHARS = '}&';

    private parentDirName: string;
    private config: Config;
    private bagOfWords: string[];

    constructor(parentDirName: string, config: Config) {
        this.parentDirName = parentDirName;
        this.config = config;
        this.bagOfWords = getBagOfWords(parentDirName, config);
    }

    public parse(input: string): string {
        let parsedString = input;

        // Parse camelCase
        const matchingString = `${this.TEMPLATE_STRING_START_CHARS}CAMEL_CASE${this.TEMPLATE_STRING_END_CHARS}`;

        const camelCaseValue = getCamelCaseString(this.bagOfWords);

        parsedString = parsedString.replace(matchingString, camelCaseValue);

        // Parse PascalCase

        // Parse snake_case

        // Parse kebab-case
        return parsedString;
    }
}

export default StringParser;
