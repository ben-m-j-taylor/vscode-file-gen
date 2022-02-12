import FileTemplate from './fileTemplateType';

type FileTemplateGroup = {
  name: string;
  description: string | null;
  fileTemplates: string[];
};

export default FileTemplateGroup;
