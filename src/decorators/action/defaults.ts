import { ActionOptions, StateFactory } from "./options";

export const defaultStateFactory: StateFactory = () => ({
  loading: false,
  success: false,
  data: null
});

export const defaultActionRun: ActionOptions['run'] = async (states, fn) => {
  try {
    states.loading = true
    const res = await fn()
    states.success = true
    res.data = res
    return res
  } catch (error) {
    states.success = false
    states.error = error
  } finally {
    states.loading = false
  }
}

const defaults: ActionOptions = {
  stateFactory: defaultStateFactory,
  run: defaultActionRun
}

export default defaults