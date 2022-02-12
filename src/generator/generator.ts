import * as vscode from 'vscode';

import Casing from '../enums/casing';
import type FileTemplate from '../types/fileTemplateType';

import { getConfig, validateConfig } from './config';
import { readFile } from './fileSystem';
import parseName from './nameParser';

const generate = async (location: string, newDirectory: boolean) => {
  const config = getConfig();

  console.log(`vscode-file-gen: generate: config`, config);

  let { valid, validationErrors } = validateConfig(config);

  if (!valid) {
    vscode.window.showErrorMessage(`vscode-file-gen: Unable to generate files, config has the following errors: ${validationErrors?.map(e => ` ${e}`)}`);
    return;
  }

  if (!newDirectory) {
    vscode.window.showInformationMessage('vscode-file-gen: Generating files in directory!');
  } else {
    vscode.window.showInformationMessage('vscode-file-gen: Generating new directory with files!');
  }

  const specifiedName = await vscode.window.showInputBox({
    title: `Enter the name you would like to use in ${config.directoryNameCasing}`,
    placeHolder: config.directoryNameCasing || ''
  });

  if (!specifiedName) {
    return;
  }

  const templateGroupPickOptions = config.fileTemplateGroups?.map(tg => ({ label: tg.name, detail: tg.description || '' })) || [];

  const templatePickOptions = config.fileTemplates?.map(t => ({ label: t.name, detail: t.description || '' })) || [];

  const quickPickValues = [
    { label: 'File Template Groups', kind: -1 },
    ...templateGroupPickOptions,
    { label: 'File Templates', kind: -1 },
    ...templatePickOptions
  ];

  const templateOrTemplateGroup = await vscode.window.showQuickPick(quickPickValues);

  if (!templateOrTemplateGroup) {
    return;
  }

  const { camelCaseName, pascalCaseName, snakeCaseName, kebabCaseName } = parseName(specifiedName, (config.directoryNameCasing as Casing));

  console.log('vscode-file-gen: generate: camelCaseName', camelCaseName);
  console.log('vscode-file-gen: generate: pascalCaseName', pascalCaseName);
  console.log('vscode-file-gen: generate: snakeCaseName', snakeCaseName);
  console.log('vscode-file-gen: generate: kebabCaseName', kebabCaseName);

  const templateGroupDefinition = config.fileTemplateGroups?.find(tg => tg.name === templateOrTemplateGroup.label);
  const templateDefinition = config.fileTemplates?.find(t => t.name === templateOrTemplateGroup.label);

  const templatesToGenerate: FileTemplate[] = [];

  if (typeof templateGroupDefinition !== 'undefined' && templateGroupDefinition?.fileTemplates) {
    for (const templateName of templateGroupDefinition.fileTemplates) {
      const template = config.fileTemplates?.find(t => t.name === templateName);

      if (!template) {
        continue;
      }

      templatesToGenerate.push(template);
    }
  } else if (typeof templateDefinition !== 'undefined') {
      templatesToGenerate.push(templateDefinition);
  }

  if (templatesToGenerate.length === 0) {
    vscode.window.showErrorMessage(`vscode-file-gen: Unable to generate files based on template/template group with name "${templateOrTemplateGroup.label}",
      either the template/template group with that name does not exist or it has no fileTemplates assigned to it.`);
    return;
  }

  const workspaceRootPath = vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri.fsPath;

  if (!workspaceRootPath) {
    vscode.window.showErrorMessage(`vscode-file-gen: This extension can only be used when a workspace is open.`);
    return;
  }

  for (const template of templatesToGenerate) {
    const filePath = `${workspaceRootPath}/${template.templateFilePath}`;

    const { data, error } = await readFile(vscode.Uri.file(filePath));

    console.log('vscode-file-gen: generate: data', data);

    if (error) {
      vscode.window.showErrorMessage(`vscode-file-gen: Unable to read template file at "${filePath}"`);
      continue;
    }


  }
};

export default generate;
