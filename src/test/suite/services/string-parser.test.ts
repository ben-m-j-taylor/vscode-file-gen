import * as assert from 'assert';

import Config from '../../../types/config/config';
import CasingType from '../../../enums/casing-type-enum';

import StringParser from '../../../services/string-parser';

suite('String Parser Tests', () => {
    const defaultConfig: Config = {
        workspaceRoot: '/',
        rootDir: '/',
        directoryNameCasing: CasingType.camelCase,
        fileTemplateGroupings: [],
        fileTemplates: [],
    };

    test('replaceCamelCaseTemplateString replaces the &{CAMEL_CASE}& template strings', () => {
        const stringParser = new StringParser('someTestString', defaultConfig);

        const parsedString = stringParser.replaceCamelCaseTemplateString(
            'testing &{CAMEL_CASE}& is parsed correctly - &{CAMEL_CASE}&',
        );

        assert.strictEqual(parsedString, 'testing someTestString is parsed correctly - someTestString');
    });

    test('replacePascalCaseTemplateString replaces the &{PASCAL_CASE}& template strings', () => {
        const stringParser = new StringParser('someTestString', defaultConfig);

        const parsedString = stringParser.replacePascalCaseTemplateString(
            'testing &{PASCAL_CASE}& is parsed correctly - &{PASCAL_CASE}&',
        );

        assert.strictEqual(parsedString, 'testing SomeTestString is parsed correctly - SomeTestString');
    });

    test('replaceSnakeCaseTemplateString replaces the &{SNAKE_CASE}& template strings', () => {
        const stringParser = new StringParser('someTestString', defaultConfig);

        const parsedString = stringParser.replaceSnakeCaseTemplateString(
            'testing &{SNAKE_CASE}& is parsed correctly - &{SNAKE_CASE}&',
        );

        assert.strictEqual(parsedString, 'testing some_test_string is parsed correctly - some_test_string');
    });

    test('replaceKebabCaseTemplateString replaces the &{KEBAB_CASE}& template strings', () => {
        const stringParser = new StringParser('someTestString', defaultConfig);

        const parsedString = stringParser.replaceKebabCaseTemplateString(
            'testing &{KEBAB_CASE}& is parsed correctly - &{KEBAB_CASE}&',
        );

        assert.strictEqual(parsedString, 'testing some-test-string is parsed correctly - some-test-string');
    });
});
