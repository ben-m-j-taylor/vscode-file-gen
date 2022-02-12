import FileTemplate from './fileTemplateType';

type FileTemplateGroup = {
  name: string;
  description: string | null;
  fileTemplates: FileTemplate[];
};

export default FileTemplateGroup;
