import { isObject, hasOwnProp } from "./common"

function _getProp<T = Record<any, any>>(obj: T, prop: string | string[]) {
  let keys = typeof prop == 'string' ? prop.split('.') : prop

  let cur: any = obj
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (!isObject(cur) || !hasOwnProp(cur, key as string)) return [undefined, false]
    cur = cur[key as string]
  }
  return [cur, true]
}


export function dotProp<T = Record<any, any>>(obj: T, prop: string | string[]) {
  if (!isObject(obj)) return undefined

  if (typeof prop == 'string' && hasOwnProp(obj, prop)) {
    return obj[prop]
  }

  return _getProp(obj, prop)[0]
}