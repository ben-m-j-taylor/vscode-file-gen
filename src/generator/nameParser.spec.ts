import Casing from '../enums/casing';

import parseName, { splitName, formatAsCamelCase, formatAsPascalCase, formatAsSnakeCase, formatAsKebabCase } from './nameParser';

const CAMEL_CASE_NAME = 'textInputWithValidation';
const PASCAL_CASE_NAME = 'TextInputWithValidation';
const SNAKE_CASE_NAME = 'text_input_with_validation';
const KEBAB_CASE_NAME = 'text-input-with-validation';
const PARTS = ['text', 'input', 'with', 'validation'];

describe('nameParser: parseName', () => {
  it('When given a camelCase name and a nameCasing of Casing.camelCase it returns a correctly formatted set of names', () => {
    const { camelCaseName, pascalCaseName, snakeCaseName, kebabCaseName } = parseName(CAMEL_CASE_NAME, Casing.camelCase);

    expect(camelCaseName).toEqual(CAMEL_CASE_NAME);
    expect(pascalCaseName).toEqual(PASCAL_CASE_NAME);
    expect(snakeCaseName).toEqual(SNAKE_CASE_NAME);
    expect(kebabCaseName).toEqual(KEBAB_CASE_NAME);
  });

  it('When given a PascalCase name and a nameCasing of Casing.pascalCase it returns a correctly formatted set of names', () => {
    const { camelCaseName, pascalCaseName, snakeCaseName, kebabCaseName } = parseName(PASCAL_CASE_NAME, Casing.pascalCase);

    expect(camelCaseName).toEqual(CAMEL_CASE_NAME);
    expect(pascalCaseName).toEqual(PASCAL_CASE_NAME);
    expect(snakeCaseName).toEqual(SNAKE_CASE_NAME);
    expect(kebabCaseName).toEqual(KEBAB_CASE_NAME);
  });

  it('When given a snake_case name and a nameCasing of Casing.snakeCase it returns a correctly formatted set of names', () => {
    const { camelCaseName, pascalCaseName, snakeCaseName, kebabCaseName } = parseName(SNAKE_CASE_NAME, Casing.snakeCase);

    expect(camelCaseName).toEqual(CAMEL_CASE_NAME);
    expect(pascalCaseName).toEqual(PASCAL_CASE_NAME);
    expect(snakeCaseName).toEqual(SNAKE_CASE_NAME);
    expect(kebabCaseName).toEqual(KEBAB_CASE_NAME);
  });

  it('When given a kebab-case name and a nameCasing of Casing.kebabCase it returns a correctly formatted set of names', () => {
    const { camelCaseName, pascalCaseName, snakeCaseName, kebabCaseName } = parseName(KEBAB_CASE_NAME, Casing.kebabCase);

    expect(camelCaseName).toEqual(CAMEL_CASE_NAME);
    expect(pascalCaseName).toEqual(PASCAL_CASE_NAME);
    expect(snakeCaseName).toEqual(SNAKE_CASE_NAME);
    expect(kebabCaseName).toEqual(KEBAB_CASE_NAME);
  });
});

describe('nameParser: splitName', () => {
  it('When given a camelCase name and a nameCasing of Casing.camelCase it returns a correctly split substring array', () => {
    const result = splitName(CAMEL_CASE_NAME, Casing.camelCase);

    expect(result).toEqual(PARTS);
  });

  it('When given a PascalCase name and a nameCasing of Casing.pascalCase it returns a correctly split substring array', () => {
    const result = splitName(PASCAL_CASE_NAME, Casing.pascalCase);

    expect(result).toEqual(PARTS);
  });

  it('When given a snake_case name and a nameCasing of Casing.snakeCase it returns a correctly split substring array', () => {
    const result = splitName(SNAKE_CASE_NAME, Casing.snakeCase);

    expect(result).toEqual(PARTS);
  });

  it('When given a kebab-case name and a nameCasing of Casing.kebabCase it returns a correctly split substring array', () => {
    const result = splitName(KEBAB_CASE_NAME, Casing.kebabCase);

    expect(result).toEqual(PARTS);
  });
});

describe('nameParser: formatAsCamelCase', () => {
  it('When given an array of parts it should return a camelCase string', () => {
    const result = formatAsCamelCase(PARTS);

    expect(result).toEqual(CAMEL_CASE_NAME);
  });
});

describe('nameParser: formatAsPascalCase', () => {
  it('When given an array of parts it should return a PascalCase string', () => {
    const result = formatAsPascalCase(PARTS);

    expect(result).toEqual(PASCAL_CASE_NAME);
  });
});

describe('nameParser: formatAsSnakeCase', () => {
  it('When given an array of parts it should return a snake_case string', () => {
    const result = formatAsSnakeCase(PARTS);

    expect(result).toEqual(SNAKE_CASE_NAME);
  });
});

describe('nameParser: formatAsKebabCase', () => {
  it('When given an array of parts it should return a kebab-case string', () => {
    const result = formatAsKebabCase(PARTS);

    expect(result).toEqual(KEBAB_CASE_NAME);
  });
});
