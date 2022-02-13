import Casing from '../enums/casing';
import FileTemplateGroup from './fileTemplateGroupType';
import FileTemplate from './fileTemplateType';

type Config = {
  directoryNameCasing: Casing | null;
  fileTemplateGroups: FileTemplateGroup[] | null;
  fileTemplates: FileTemplate[] | null;
  onlyShowTemplateGroupsInPicker: boolean;
};

export default Config;
