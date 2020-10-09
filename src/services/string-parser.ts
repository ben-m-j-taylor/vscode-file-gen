import Config from '../types/config/config';
import {
    getBagOfWords,
    getCamelCaseString,
    getKebabCaseString,
    getPascalCaseString,
    getSnakeCaseString,
} from './string-parsing-service';

class StringParser {
    private bagOfWords: string[];

    constructor(parentDirName: string, config: Config) {
        this.bagOfWords = getBagOfWords(parentDirName, config);
    }

    public parse(input: string): string {
        let parsedString = input;

        parsedString = this.replaceCamelCaseTemplateString(parsedString);

        parsedString = this.replacePascalCaseTemplateString(parsedString);

        parsedString = this.replaceSnakeCaseTemplateString(parsedString);

        parsedString = this.replaceKebabCaseTemplateString(parsedString);

        return parsedString;
    }

    public replaceCamelCaseTemplateString(input: string): string {
        const regex = /&{CAMEL_CASE}&/g;

        const value = getCamelCaseString(this.bagOfWords);

        return input.replace(regex, value);
    }

    public replacePascalCaseTemplateString(input: string): string {
        const regex = /&{PASCAL_CASE}&/g;

        const value = getPascalCaseString(this.bagOfWords);

        return input.replace(regex, value);
    }

    public replaceSnakeCaseTemplateString(input: string): string {
        const regex = /&{SNAKE_CASE}&/g;

        const value = getSnakeCaseString(this.bagOfWords);

        return input.replace(regex, value);
    }

    public replaceKebabCaseTemplateString(input: string): string {
        const regex = /&{KEBAB_CASE}&/g;

        const value = getKebabCaseString(this.bagOfWords);

        return input.replace(regex, value);
    }
}

export default StringParser;
