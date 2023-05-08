import { ActionOptions, ActionStandardState } from "./options"
import defaults, { defaultActionRun, defaultStateFactory } from "./defaults"
import { defineAutoInitProtoGetter } from "@/utils/define"

export function Action<T extends ActionStandardState>(options: ActionOptions<T>): MethodDecorator {
  return function actionDecorator(target, key, descriptor) {
    let method = descriptor.value

    if (typeof method !== 'function') return

    const { attach = `${key.toString()}States`, stateFactory = defaults.stateFactory || defaultStateFactory, run = defaults.run || defaultActionRun } = options
 
    defineAutoInitProtoGetter(target.constructor.prototype, attach, stateFactory)

    descriptor.value = async function (...args: any[]) {
      const states = this[attach]
      const fn = (method as Function).bind(this, ...args)

      return await run(states, fn)

    } as any

    return descriptor
  }
}

Action.defaults = defaults
Action.defaultRun = defaultActionRun
Action.defaultStateFactory = defaultStateFactory
