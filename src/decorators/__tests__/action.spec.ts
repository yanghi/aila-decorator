import { Action} from '../action/decorator'

describe('Action', () => {

  interface TestState {
    loading: boolean;
    success: boolean;
    error?: any
    data: string | null
  }

  const testStateFactory = (): TestState => ({
    loading: false,
    success: false,
    error: undefined,
    data: null
  })

  const testActionRun = async (states: TestState, fn: () => Promise<any>): Promise<any> => {
    try {
      states.loading = true
      const res = await fn()
      states.success = true
      states.data = res
      return res
    } catch (error) {
      states.success = false
      states.error = error
    } finally {
      states.loading = false
    }
  }

  class TestClass {
    testState!: TestState
    @Action({
      attach: 'testState',
      stateFactory: testStateFactory,
      run: testActionRun
    })
    async testMethod(): Promise<string> {
      return 'test'
    }
  }

  it('should attach state property to target object with provided attach string', () => {
    const obj = new TestClass()
    expect(obj).toHaveProperty('testState')
    expect(obj.testState).toEqual(testStateFactory())
  })

  it('should use default stateFactory if none is provided', () => {
    const obj = new TestClass()

    expect(obj.testState.loading).toBe(false)
    obj.testMethod()
    expect(obj.testState.loading).toBe(true)
    expect(obj.testState.success).toBe(false)
    expect(obj.testState.data).toBe(null)
  })

  it('should use default run function if none is provided', async () => {
    const obj = new TestClass()
    const result = await obj.testMethod()
    expect(result).toBe('test')
    expect(obj.testState.loading).toBe(false)
    expect(obj.testState.success).toBe(true)
    expect(obj.testState.data).toBe('test')
  })

  it('should use provided run function', async () => {
    const obj = new TestClass()
    const result = await obj.testMethod()
    expect(result).toBe('test')
    expect(obj.testState.loading).toBe(false)
    expect(obj.testState.success).toBe(true)
    expect(obj.testState.data).toBe('test')
  })

})
