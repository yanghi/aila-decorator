export function isObject(obj: unknown): obj is object {
  return obj!=null && typeof obj === 'object' 
}

export function deepCopy<T>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  
  const result: any = Array.isArray(obj) ? [] : {};
  
  Object.keys(obj).forEach((key) => {
    result[key] = deepCopy(obj[key]);
  });
  
  return result;
}
