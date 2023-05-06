

const contructorSymbol = Symbol('resetProperties');
const insSymbol = Symbol('ins');

type ResetOptions = {
  prop: string | symbol
  defaultValue?: any
  group?: string
}

type ResetInstanceInitProperties = {
  [x: string | symbol]: any
}

class ResetClass {
  resets: ResetOptions[] = []
  constructor(private target: any) {
    Object.defineProperty(target, contructorSymbol, {
      value: this,
      writable: false,
      enumerable: false
    })

  }
  add(prop: string | symbol, group?: string, value?: any) {

    if (!this.resets.find(o => o.prop === prop)) {
      const opts: ResetOptions = {
        prop,
        group
      }

      if (value !== undefined) {
        opts.defaultValue = value;
      }

      this.resets.push(opts)
    }
  }
  resetProperties(inst: any, groupOrProps?: string, isProps?: boolean) {
    if (!inst.__rinit) return

    const specs = groupOrProps ? typeof groupOrProps == 'string' ? [groupOrProps] : groupOrProps : undefined

    this.resets.forEach(o => {
      if (specs && ((isProps && specs.includes(o.prop.toString())) || specs.includes(o.group))) {
        return
      }

      if (o.defaultValue) {
        inst[o.prop] = o.defaultValue
      } else {
        const v = inst[insSymbol][o.prop]
        inst[o.prop] = v
      }
    })

  }
  setupInstance(inst: any) {
    if (inst.__rinit) return

    inst.__rinit = true

    var defaults: ResetInstanceInitProperties = {}
    Object.defineProperty(inst, insSymbol, {
      value: defaults,
      writable: false,
      enumerable: false
    })

    this.resets.forEach(o => {
      defaults[o.prop] = inst[o.prop]
    })

    const original = inst['resetProperties']

    const that = this

    function resetProperties(this: any) {
      that.resetProperties(this)
      if (typeof original === 'function') {
        return original.apply(this, arguments)
      }
    }

    inst.resetProperties = resetProperties

  }
}

function setupResets(target: any): ResetClass {
  if (!target[contructorSymbol]) {
    new ResetClass(target)
  }

  return target[contructorSymbol]
}


export function resetProperties(target: any) {
  const resetInst = target.constructor[contructorSymbol] as ResetClass | undefined

  if (resetInst) {
    resetInst.resetProperties(target)
  }
}

export function ResetProp(group?: string, defaultValue?: any): PropertyDecorator {
  return function resetProp(target, property) {
    const resetinst = setupResets(target.constructor)
    resetinst.add(property, group, defaultValue)
  }
}

export function makeGroupResetPropDecorator(group: string) {
  return function GroupResetProp(defaultValue?: any) {
    return ResetProp(group, defaultValue)
  }
}

export function makeResetable(instance: any) {
  if (!instance || !instance.constructor) return;
  const resetInst = setupResets(instance.constructor)
  resetInst.setupInstance(instance)
}

export interface ResetableClassImpl {
  resetProperties(groupOrProp?: string | string[], isProp?: boolean): void
}

