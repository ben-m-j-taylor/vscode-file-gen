import Casing from '../enums/casing';

const parseName = (name: string, nameCasing: Casing): { camelCaseName: string, pascalCaseName: string, snakeCaseName: string, kebabCaseName: string } => {
  const parts = splitName(name, nameCasing);

  return {
    camelCaseName: formatAsCamelCase(parts),
    pascalCaseName: formatAsPascalCase(parts),
    snakeCaseName: formatAsSnakeCase(parts),
    kebabCaseName: formatAsKebabCase(parts)
  };
};

const splitName = (name: string, nameCasing: Casing): string[] => {
  switch (nameCasing) {
    case Casing.camelCase:
    case Casing.pascalCase:
      return name.split(new RegExp('(?<=[a-z])(?=[A-Z])')).map(s => s.toLocaleLowerCase());;

    case Casing.snakeCase:
      return name.split('_').map(s => s.toLocaleLowerCase());

    case Casing.kebabCase:
      return name.split('-').map(s => s.toLocaleLowerCase());
  
    default:
      return [];
  }
};

const formatAsCamelCase = (parts: string[]): string => {
  return parts.map((s, i) => i > 0 ? s.charAt(0).toUpperCase() + s.substring(1) : s).join('');
};

const formatAsPascalCase = (parts: string[]): string => {
  return parts.map(s => s.charAt(0).toUpperCase() + s.substring(1)).join('');
};

const formatAsSnakeCase = (parts: string[]): string => {
  return parts.join('_');
};

const formatAsKebabCase = (parts: string[]): string => {
  return parts.join('-');
};

export default parseName;
export { splitName, formatAsCamelCase, formatAsPascalCase, formatAsSnakeCase, formatAsKebabCase };
