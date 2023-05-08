import { defaults } from "./defaults";

/**
 * Decorator to retry a function if it throws an error
 * @param retryCount number of times to retry the function before failing
 * @param intervalTime time in milliseconds to wait between retries
 */
export function Retry(retryCount: number = defaults.count, intervalTime: number = defaults.interval): MethodDecorator {
  return function retry(_target, _propertyKey, descriptor) {

    if (!retryCount) return

    const originalMethod = descriptor.value;

    if (typeof originalMethod !== 'function') return descriptor

    descriptor.value = async function (...args: any[]) {
      let retry = 0;
      let result;
      while (retry < retryCount) {
        try {
          result = await originalMethod.apply(this, args);
          break;
        } catch (error) {
          if (retry === retryCount - 1) {
            throw error;
          }
          retry++;
          await new Promise((resolve) => setTimeout(resolve, intervalTime));
        }
      }
      return result;
    } as any;
  };
}

Retry.defaults = defaults;

/**
 * same as `Retry()`
 */
export const retry = Retry()
