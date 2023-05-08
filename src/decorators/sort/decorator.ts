import { dotProp } from "@/utils/doProp";
import defaults from "./defaults";
import { SortOptions } from "./options";

const compareVal = (a: any, b: any) => a > b ? 1 : a < b ? -1 : 0

/**
 * Sort decorator.
 * Sorts an array according to the given options.
 * 
 * @param by - The property by which the array is sorted. support dot property.
 * @param options - The sort options.
 */
export function Sort(by: string, options?: SortOptions): PropertyDecorator
/**
 * Sort decorator.
 * Sorts an array according to the given options.
 * 
 * @param options - The sort options.
 */
export function Sort(options?: SortOptions): PropertyDecorator
/**
 * Sort decorator.
 * Sorts an array according to the given options.
 * 
 * @param compare - The compare function used to sort the array.
 * @param options - The sort options.
 */
export function Sort(compare: SortOptions['compare'], options?: SortOptions): PropertyDecorator
export function Sort(a: SortOptions['compare'] | string | SortOptions, mayOptions?: SortOptions) {

  let options: SortOptions = { ...defaults, ...mayOptions }

  if (typeof a === 'string') {
    options.by = a
  } else if (typeof a === 'function') {
    options.compare = a
  } else {
    options = a
  }

  return function sortDecorator(target, propertyKey) {
    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);

    // for developers
    const getSymobl = Symbol(process.env.NODE_ENV !== 'production' ? propertyKey : undefined)

    Object.defineProperty(target, propertyKey, {
      get: descriptor?.get || function () {
        return this[getSymobl]
      },
      ...descriptor,
      set(val: unknown) {
        const target = options.prop ? dotProp(val, options.prop) : val
        const set = descriptor?.set || function set(val) { this[getSymobl] = val }

        if (Array.isArray(target) && target.length) {
          let compareFn = options.compare

          if (compareFn) {
            if (options.by) {
              compareFn = function (a, b) {
                return compareFn(dotProp(a, options.by), dotProp(b, options.by))
              }
            }
          } else if (options.by) {
            compareFn = options.order == 'asc' ? (a, b) => compareVal(dotProp(a, options.by), dotProp(b, options.by)) : (a, b) => compareVal(dotProp(b, options.by), dotProp(a, options.by))
          }

          if (compareFn) {
            target.sort(compareFn)
          }
        }
        set.call(this, val)
      }
    })
  };
}

Sort.defaults = defaults;
