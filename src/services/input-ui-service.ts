import * as vscode from 'vscode';

import Config from '../types/config/config';

const getInputDataFromUI = async (config: Config): Promise<{ selectedGrouping: string; parentDirName: string }> => {
    const inputData = {
        selectedGrouping: '',
        parentDirName: '',
    };

    inputData.selectedGrouping = (await showGroupingSelect(config)) ?? '';

    inputData.parentDirName = (await showParentDirNameInput()) ?? '';

    return inputData;
};

const showGroupingSelect = async (config: Config): Promise<string | undefined> => {
    const quickPickItems: string[] = config.fileTemplateGroupings.map((x) => x.name);

    const selectedItem = await vscode.window.showQuickPick(quickPickItems);

    return selectedItem;
};

const showParentDirNameInput = async (): Promise<string | undefined> => {
    const value = await vscode.window.showInputBox();

    return value;
};

export { getInputDataFromUI };
