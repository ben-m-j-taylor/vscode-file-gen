import * as assert from 'assert';

import Config from '../../../types/config/config';
import CasingType from '../../../enums/casing-type-enum';

import { getBagOfWords, getCamelCaseString } from '../../../services/string-parsing-service';

suite('String Parsing Service Tests', () => {
    const defaultConfig: Config = {
        workspaceRoot: '/',
        directoryNameCasing: CasingType.camelCase,
        fileTemplateGroupings: [],
        fileTemplates: [],
    };

    test('getBagOfWords returns the correct "bag of words" for a camelCase input', () => {
        const bagOfWords = getBagOfWords('someTestString', {
            ...defaultConfig,
            directoryNameCasing: CasingType.camelCase,
        });

        assert.deepStrictEqual(bagOfWords, ['some', 'test', 'string']);
    });

    test('getBagOfWords returns the correct "bag of words" for a PascalCase input', () => {
        const bagOfWords = getBagOfWords('SomeTestString', {
            ...defaultConfig,
            directoryNameCasing: CasingType.pascalCase,
        });

        assert.deepStrictEqual(bagOfWords, ['some', 'test', 'string']);
    });

    test('getBagOfWords returns the correct "bag of words" for a snake_case input', () => {
        const bagOfWords = getBagOfWords('some_test_string', {
            ...defaultConfig,
            directoryNameCasing: CasingType.snakeCase,
        });

        assert.deepStrictEqual(bagOfWords, ['some', 'test', 'string']);
    });

    test('getBagOfWords returns the correct "bag of words" for a kebab-case input', () => {
        const bagOfWords = getBagOfWords('some-test-string', {
            ...defaultConfig,
            directoryNameCasing: CasingType.kebabCase,
        });

        assert.deepStrictEqual(bagOfWords, ['some', 'test', 'string']);
    });

    test('getCamelCaseString return a camelCase formatted string when given a "bag of words"', () => {
        const camelCaseString = getCamelCaseString(['some', 'test', 'string']);

        assert.strictEqual(camelCaseString, 'someTestString');
    });
});
