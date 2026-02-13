type ClassDictionary = Record<string, unknown>
type ClassArray = ClassValue[];

export type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassDictionary
  | ClassArray;
