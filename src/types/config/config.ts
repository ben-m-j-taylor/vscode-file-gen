import FileTemplateGrouping from './file-template-grouping';
import FileTemplate from './file-template';
import CasingType from '../../enums/casing-type-enum';

type Config = {
    workspaceRoot: string;
    directoryNameCasing: CasingType;
    fileTemplateGroupings: FileTemplateGrouping[];
    fileTemplates: FileTemplate[];
};

export default Config;
