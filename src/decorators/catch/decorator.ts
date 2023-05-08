import { defaults } from "./defaults";
import { CatchHandler } from "./options";

/**
 * The decorator function that catches errors.
 * 
 * @param handler error handler function
 */
export function Catch(handler: CatchHandler = defaults.handler): MethodDecorator {
  return function catchDecorator(_target, _propertyKey, descriptor) {
    const method = descriptor.value;

    if (typeof method =='function') {
      descriptor.value = function (...args: any[]) {
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
