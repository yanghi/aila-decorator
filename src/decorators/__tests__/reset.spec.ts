import { ResetProp, ResetableClassImpl, makeResetable } from "../reset"

class MyClass implements ResetableClassImpl {
  constructor() {
    makeResetable(this)
  }

  @ResetProp()
  age = 18

  resetProperties() {}
}

describe('reset decorator', () => {
  it('ResetProp', () => {
    var a = new MyClass()
    a.age = 3

    expect(a.age).toBe(3)
    a.resetProperties()

    expect(a.age).toBe(18)
  })
})