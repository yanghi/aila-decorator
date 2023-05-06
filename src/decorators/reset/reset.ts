import { deepCopy, isObject } from "@/utils/common";

export function getResetValue(value: any) {
  if (isObject(value)) {
    return deepCopy(value)
  }

  return value;
}