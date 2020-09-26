import * as vscode from 'vscode';

import Config from '../types/config/config';

const getConfig = (): Config => {
    console.log('');
    console.log('======== CONFIG - START ========');

    const rawConfig = vscode.workspace.getConfiguration('vscode-file-gen');

    console.log('Raw configuration:', rawConfig);

    const config: Config = {
        fileTemplateGroupings: rawConfig['file-template-groupings'],
        fileTemplates: rawConfig['file-templates']
    };

    console.log('config.fileTemplateGroupings:', config.fileTemplateGroupings);
    console.log('config.fileTemplates:', config.fileTemplates);

    console.log('======== CONFIG - END ========');
    console.log('');

    return config;
};

export { getConfig };
