import { ResetProp, ResetableClassImpl, makeGroupResetPropDecorator, makeResetable } from "../reset"

class MyClass implements ResetableClassImpl {
  constructor() {
    makeResetable(this)
  }

  @ResetProp()
  age = 18

  resetProperties() { }
}

describe('reset decorator', () => {
  describe('ResetProp', () => {
    it('basic reset', () => {
      var a = new MyClass()
      a.age = 3

      expect(a.age).toBe(3)
      a.resetProperties()

      expect(a.age).toBe(18)
    })

    it('group', () => {
      // reset properties by group
      const basicReset = ResetProp('basicInfo')
      const OtherGroupReset = makeGroupResetPropDecorator('otherInfo')

      class MyInfo implements ResetableClassImpl {
        constructor() {
          makeResetable(this)
        }
        resetProperties(groupOrProp?: string | string[], isProp?: boolean): void {
          // if (isProp) {
          //   console.log('reset properties', groupOrProp)
          // } else {
          //   console.log('reset group properties', groupOrProp)
          // }
        }

        @ResetProp('basicInfo')
        name = ''

        @basicReset
        age = 18

        @basicReset
        sex = 1

        @OtherGroupReset('Beijing')
        city?: string

        resetBasicInfo() {
          this.resetProperties('basicInfo')
        }
        resetAll() {
          this.resetProperties()
        }
        resetSpecify() {
          // specified properties
          this.resetProperties(['name', 'age'], true)

          // specified group, also support array
          this.resetProperties('otherInfo')
        }
      }

      var info = new MyInfo()

      function set(){
         info.name = 'hi'
          info.age = 100
          info.sex = 2
          info.city = 'NewYork'
      }
     
      set()

      info.resetAll()

      expect(info.age).toBe(18)
      expect(info.sex).toBe(1)
      expect(info.name).toBe("")
      expect(info.city).toBe("Beijing")

      set()
      expect(info.city).toBe("NewYork")
      info.resetBasicInfo()
      expect(info.age).toBe(18)
      expect(info.sex).toBe(1)
      expect(info.name).toBe("")
      expect(info.city).toBe("NewYork")
    })
  })
})