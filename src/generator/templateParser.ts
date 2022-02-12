const parseTemplate = (template: string, camelCaseName: string, pascalCaseName: string, snakeCaseName: string, kebabCaseName: string): string => {
  return template
    .replace(/&{{CAMEL_CASE}}&/g, camelCaseName)
    .replace(/&{{PASCAL_CASE}}&/g, pascalCaseName)
    .replace(/&{{SNAKE_CASE}}&/g, snakeCaseName)
    .replace(/&{{KEBAB_CASE}}&/g, kebabCaseName);
};

export default parseTemplate;