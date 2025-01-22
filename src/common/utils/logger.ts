import { styleText } from 'node:util';

function logWarning(message: string, ...optionalParams: any[]) {
  console.log(styleText('yellow', message), ...optionalParams);
}

function logError(message: string, ...optionalParams: any[]) {
  console.error(styleText('red', message), ...optionalParams);
}

function logInfo(message: string, ...optionalParams: any[]) {
  console.info(styleText('blue', message), ...optionalParams);
}

function logSuccess(message: string, ...optionalParams: any[]) {
  console.log(styleText('green', message), ...optionalParams);
}

export { logError, logInfo, logWarning, logSuccess };
