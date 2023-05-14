## Sort

sort decorator

### Options

```ts
interface SortOptions {
  /**
   * Property name of the array to be sorted
   * Support dot property.
   */
  prop?: string;
  /**
   * The property by which the array is sorted.
   * Support dot property.
   */
  by?: string;
  /**
   * The compare function used to sort the array.
   */
  compare?: Parameters<Array<any>['sort']>[0]
  /**
   * The order of the array sort.
   * @default "asc"
   */
  order?: 'asc' | 'desc'
}

```
### Signature

`Sort()` has 3 overload signatures

```ts
export function Sort(by: string, options?: SortOptions): PropertyDecorator
export function Sort(options?: SortOptions): PropertyDecorator
export function Sort(compare: SortOptions['compare'], options?: SortOptions): PropertyDecorator
```

### Usage

``` ts
class Example {
  @Sort()
  ids = [2,1,4,5]

  @Sort({by: 'level'})
  list = [{level: 1}, {level: 3}]

  @Sort({prop: 'ids', order: 'desc'})
  // sort property ids
  obj = {ids: [2,1,4,5]}

  @Sort((a, b)=> a.length - b.length)
  // custom sort
  items = ['ga', 'b', 'cds']
}
```