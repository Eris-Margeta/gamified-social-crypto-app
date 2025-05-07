import { codeManager } from "./code-generator";

export const validateCode = (code: string): boolean => {
	return codeManager.validateCode(code);
};

export const getValidationCode = (): string => {
	return codeManager.getCurrentCode();
};
