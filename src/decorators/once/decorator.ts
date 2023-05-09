export function once<T extends Function>(_target: any, _propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> {
  const originalMethod = descriptor.value;
  let called = false;
  let result: any;

  descriptor.value = function (...args: any[]) {
    if (!called) {
      result = originalMethod.apply(this, args);
      called = true;
    }
    return result;
  } as any

  return descriptor;
}
