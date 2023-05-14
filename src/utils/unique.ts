import { dotProp } from "./dotProp"

export type UniqueElementFunction<T> = (item: T, index: number, arr: T[]) => any


export function uniqueElement<T>(arr: T[], uniqueKey?: UniqueElementFunction<T>) {
  let fn: UniqueElementFunction<T> = uniqueKey || ((i) => i)
  let set = new Set()

  let res: T[] = []

  arr.forEach((it, index, arr) => {
    let key = fn(it, index, arr)
    if (set.has(key)) return

    res.push(it)
    set.add(key)
  })

  return res
}

export function uniqueDottedElement<T>(target: T, dotKey: string, uniqueKey?: UniqueElementFunction<any>):T {
  const dots = dotKey.split('.')

  const child = dots.pop()
  const parent = dotProp(target, dots)

  if (Array.isArray(parent[child])) {
    parent[child] = uniqueElement(parent[child], uniqueKey)
    Object.defineProperty(parent, child, uniqueElement(parent[child], uniqueKey))
  }

  return target
}