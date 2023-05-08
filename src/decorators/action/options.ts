export interface ActionStandardState<Data = any> {
  loading: boolean;
  success: boolean;
  error?: any
  data: Data | null
}

export type StateFactory <T extends ActionStandardState<any> = ActionStandardState<any>> =()=> T

// export type ActionStateAttathFunction<T extends ActionStandardState> = (target: Object, key: string | symbol)=> T

export interface ActionOptions<States extends ActionStandardState<any> = ActionStandardState<any>> {
  /**
   * @default `${propertyKey}State`
   */
  attach?: string
  stateFactory?: StateFactory<States>
  run?: (states: States, fn: ()=> Promise<any>)=> any
}
