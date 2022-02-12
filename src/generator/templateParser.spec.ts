import parseTemplate from './templateParser';

const RAW_TEMPLATE = `
  import React from 'react';
  import type { FC } from 'react';
  
  import './&{{KEBAB_CASE}}&.scss';
  
  type &{{PASCAL_CASE}}&Props = {
  
  };
  
  // I'm trying to find a use for snake_case so here: &{{SNAKE_CASE}}&
  // And for camelCase so here: &{{CAMEL_CASE}}&
  const &{{PASCAL_CASE}}&: FC<&{{PASCAL_CASE}}&Props> = () => (
      <div className="&{{KEBAB_CASE}}&"></div>
  );
  
  export default &{{PASCAL_CASE}}&;
`;

const EXPECTED_TEMPLATE = `
  import React from 'react';
  import type { FC } from 'react';
  
  import './text-input.scss';
  
  type TextInputProps = {
  
  };
  
  // I'm trying to find a use for snake_case so here: text_input
  // And for camelCase so here: textInput
  const TextInput: FC<TextInputProps> = () => (
      <div className="text-input"></div>
  );
  
  export default TextInput;
`;

describe('tamplateParser', () => {
  it('Should parse the template correctly', () => {
    const parsedTemplate = parseTemplate(RAW_TEMPLATE, 'textInput', 'TextInput', 'text_input', 'text-input');

    expect(parsedTemplate).toStrictEqual(EXPECTED_TEMPLATE);
  });
});
