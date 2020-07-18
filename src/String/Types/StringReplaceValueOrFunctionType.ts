type StringReplaceAsFunctionType = (substring: string, ...args: any[]) => string;

export type StringReplaceValueOrFunctionType = string | StringReplaceAsFunctionType;