import * as vscode from 'vscode';
import { platform } from 'process';

import Config from '../types/configType';
import Casing from '../enums/casing';

const getConfig = (): Config => {
  const rawConfig = vscode.workspace.getConfiguration('vscode-file-gen');
  const rawVscodeEolSetting = vscode.workspace.getConfiguration().files.eol;

  let eol: string;

  if (rawVscodeEolSetting === 'auto') {
    eol = platform === 'win32' ? '\r\n' : '\n';
  } else {
    eol = rawVscodeEolSetting;
  }

  return {
    directoryNameCasing: rawConfig['directory-name-casing'],
    fileTemplateGroups: rawConfig['file-template-groups'],
    fileTemplates: rawConfig['file-templates'],
    onlyShowTemplateGroupsInPicker: rawConfig['only-show-template-groups-in-picker'],
    eol: eol
  };
};

const validateConfig = (config: Config): { valid: boolean, validationErrors?: string[] } => {
  if (!config) {
    return { valid: false, validationErrors: ['No config provided.'] };
  }

  let validationErrors: string[] = [];

  if (!config.directoryNameCasing) {
    validationErrors.push('directory-name-casing not set');
  } else if (!Object.values(Casing).includes(config.directoryNameCasing)) {
    validationErrors
      .push(`unrecognised value of ${config.directoryNameCasing} set for directory-name-casing, expected value to be one of (${Object.values(Casing).join(', ')})`);
  }

  if (typeof config.fileTemplateGroups === 'undefined') {
    validationErrors.push('file-template-groups not set');
  }

  if (typeof config.fileTemplates === 'undefined') {
    validationErrors.push('file-template-groups not set');
  }

  if (typeof config.onlyShowTemplateGroupsInPicker === 'undefined') {
    validationErrors.push('only-show-template-groups-in-picker not set');
  }

  if (typeof config.eol === 'undefined') {
    validationErrors.push('eol not set');
  }

  return {
    valid: validationErrors.length === 0,
    validationErrors: validationErrors.length > 0 ? validationErrors : undefined
  };
};

export { getConfig, validateConfig };
