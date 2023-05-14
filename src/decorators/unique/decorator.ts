import { defineMetadata, getMetadata, getOwnMetadata } from "../../utils/metadata";
import { UniqueOptions } from "./options";
import { dotProp } from "../../utils/dotProp";
import { uniqueDottedElement, uniqueElement } from "../../utils/unique";

const metadata = 'unique:parameters';

type Meta = {
  index: number
  options: UniqueOptions
}
function uniqueParams(target: any, propertyKey: string | symbol, index: number, options: UniqueOptions) {
  const uniqueParamtersMeta: Meta[] = getOwnMetadata(metadata, target, propertyKey)

  defineMetadata(metadata, (uniqueParamtersMeta || []).concat({
    index,
    options
  }), target, propertyKey)
}

function uniqueValue(value: any, options: UniqueOptions) {
  if (!value) return value

  const uni = options.unique
  const unifn = typeof uni == 'string' ? (item) => dotProp(item, uni) : uni

  if (options.prop) {
    value = uniqueDottedElement(value, options.prop, unifn)
  } else {
    if (Array.isArray(value)) {
      value = uniqueElement(value, unifn)
    }
  }

  return value
}

/**
* A decorator function that can be used to make sure that there are no duplicate values in the given property or function argument.

* @param unique - The property or function argument to make unique
* @param options - The options object
*/
export function Unique(unique?: UniqueOptions['unique'], options?: UniqueOptions): PropertyDecorator & ParameterDecorator
/**
 * A decorator function that can be used to make sure that there are no duplicate values in the given property or function argument.
 * 
 *@param options - The options object
*/
export function Unique(options?: UniqueOptions): PropertyDecorator & ParameterDecorator
export function Unique(keyOrOptions: UniqueOptions['unique'] | UniqueOptions, mayOptions?: UniqueOptions): PropertyDecorator & ParameterDecorator {
  let options: UniqueOptions = mayOptions || {}

  if (typeof keyOrOptions === 'string' || typeof keyOrOptions === 'function') {
    options.unique = keyOrOptions
  } else if (keyOrOptions) {
    options = keyOrOptions
  }

  return function unique(target: any, propertyKey: string | symbol, index?: number) {
    if (index === undefined) {
      const attchSymobl = Symbol(process.env.NODE_ENV !== 'production' ? propertyKey.toString() : undefined)

      Object.defineProperty(target, propertyKey, {
        get() {
          return this[attchSymobl]
        },
        set(value: any) {
          this[attchSymobl] = uniqueValue(value, options)
        }
      })
    } else {
      uniqueParams(target, propertyKey, index, options)
    }
  }
}


function uniqueMethodDecorator<T extends Function>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> {
  const method = descriptor.value!

  descriptor.value = function (...args: any[]) {
    const uniqueParamtersMeta: Meta[] = getMetadata(metadata, target, propertyKey)
    if (uniqueParamtersMeta) {

      uniqueParamtersMeta.forEach(({ index, options }) => {
        args[index] = uniqueValue(args[index], options)
      })
    }

    return method.apply(this, args)
  } as any

  return descriptor
}

Unique.fn = uniqueMethodDecorator
