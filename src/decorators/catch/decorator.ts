import { defaults } from "./defaults";
import { CatchHandler } from "./options";

export function Catch(handler: CatchHandler = defaults.handler): MethodDecorator {
  return function catchDecorator(target, propertyKey, descriptor) {
    const method = descriptor.value;

    if (typeof method =='function') {
      descriptor.value = function (...args: any[]) {
        console.log('called')
        try {
          const result = method.apply(this, args);
        return result;
        } catch (error) {
          handler?.(error)
        }
      } as any
    }

    return descriptor
  };
}

Catch.defaults = defaults;
