export interface SortOptions {
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
