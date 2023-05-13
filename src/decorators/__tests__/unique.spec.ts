import { Unique } from '../unique'

describe('Unique', () => {
  it('should make property values unique', () => {
    class TestClass {
      @Unique()
      val = [1, 2, 3, 2, 1];

      @Unique({ prop: 'arr' })
      val_2 = { arr: [1, 2, 3, 2, 1] };

      @Unique((item) => item % 2)
      val_3 = [1, 2, 3, 4]

      @Unique('id')
      objItems = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 1, name: 'c' }];
    }

    const instance = new TestClass();
    expect(instance.val).toEqual([1, 2, 3]);
    expect(instance.val_2).toEqual({ arr: [1, 2, 3] });
    expect(instance.val_3).toEqual([1, 2]);

    expect(instance.objItems).toEqual([{ id: 1, name: 'a' }, { id: 2, name: 'b' }]);
  });

  it('should make parameter unique', () => {
    class TestClass {
      @Unique.fn
      counts(@Unique() counts: number[]) {
        return counts
      }

      unwrap(@Unique() counts: number[]) {
        return counts
      }

      @Unique.fn
      obj(@Unique('arr') o: { arr: number[] }) {
        return o
      }

      @Unique.fn
      obj_2(@Unique({ prop: 'arr.list', unique: 'id' }) o: { arr: { list: { id: number }[] } }) {
        return o
      }
      @Unique.fn
      multi(@Unique() a: number[], @Unique() b: number[]) {
        return [a, b]
      }
    }

    const testObj = new TestClass()

    expect(testObj.counts([1, 2, 3, 2, 1])).toEqual([1, 2, 3])

    // do nothing
    expect(testObj.unwrap([1, 2, 3, 2, 1])).toEqual([1, 2, 3, 2, 1])

    expect(testObj.obj({ arr: [1, 2, 3] })).toEqual({ arr: [1, 2, 3] })
    expect(testObj.obj_2({ arr: { list: [{ id: 1 }, { id: 1 }, { id: 2 }] } })).toEqual({ arr: { list: [{ id: 1 }, { id: 2 }] } })

    expect(testObj.multi([1, 1, 1, 2, 2, 2], [3, 3, 4, 4])).toEqual([[1, 2], [3, 4]])
  })
});
