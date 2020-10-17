import * as vscode from 'vscode';

import Config from '../types/config/config';

const getInputDataFromUI = async (config: Config): Promise<{ selectedGrouping: string; parentDirName: string }> => {
    const inputData = {
        selectedGrouping: '',
        parentDirName: '',
    };

    inputData.selectedGrouping = (await showGroupingSelect(config)) ?? '';

    inputData.parentDirName = (await showParentDirNameInput(config)) ?? '';

    return inputData;
};

const showGroupingSelect = async (config: Config): Promise<string | undefined> => {
    const quickPickItems: string[] = config.fileTemplateGroupings.map((x) => x.name);

    const selectedItem = await vscode.window.showQuickPick(quickPickItems, {
        placeHolder: 'Choose your template grouping.',
    });

    return selectedItem;
};

const showParentDirNameInput = async (config: Config): Promise<string | undefined> => {
    const value = await vscode.window.showInputBox({
        placeHolder: `Enter the parent directory name in ${config.directoryNameCasing}.`,
    });

    return value;
};

export { getInputDataFromUI };
