import Config from '../types/config/config';
import { getBagOfWords } from './string-parsing-service';

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
        console.log('StringParser - parse() - this.bagOfWords', this.bagOfWords);

        return input;
    }
}

export default StringParser;
