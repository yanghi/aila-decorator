import { Sort } from "../sort/decorator";

describe('Sort', () => {
  it('should sort array by property', () => {
    class TestClass {
      @Sort('age')
      public items = [{ age: 30 }, { age: 20 }, { age: 40 }];

      public get sortedItems() {
        return this.items;
      }
    }

    const testInstance = new TestClass();

    expect(testInstance.sortedItems).toEqual([{ age: 20 }, { age: 30 }, { age: 40 }]);
  });

  it('should sort array by custom compare function', () => {
    class TestClass {
      @Sort((a, b) => a.id - b.id)
      public items = [{ id: 3 }, { id: 1 }, { id: 2 }];

      public get sortedItems() {
        return this.items;
      }
    }

    const testInstance = new TestClass();

    expect(testInstance.sortedItems).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });

  it('should sort array by property with custom order', () => {
    class TestClass {
      @Sort({ by: 'age', order: 'desc' })
      public items = [{ age: 30 }, { age: 20 }, { age: 40 }];

      public get sortedItems() {
        return this.items;
      }
    }

    const testInstance = new TestClass();

    expect(testInstance.sortedItems).toEqual([{ age: 40 }, { age: 30 }, { age: 20 }]);
  });

  it('should sort array by property using dot notation', () => {
    class TestClass {
      @Sort({ by: 'address.country', order: 'asc' })
      public items = [
        { address: { country: 'USA' } },
        { address: { country: 'Canada' } },
        { address: { country: 'Brazil' } },
      ];

      public get sortedItems() {
        return this.items;
      }
    }

    const testInstance = new TestClass();

    expect(testInstance.sortedItems).toEqual([
      { address: { country: 'Brazil' } },
      { address: { country: 'Canada' } },
      { address: { country: 'USA' } },
    ]);
  });

  it('should set value to property as usual when not an array', () => {
    class TestClass {
      @Sort('age')
      public item = { age: 30 };

      public get sortedItem() {
        return this.item;
      }
    }

    const testInstance = new TestClass();

    expect(testInstance.sortedItem).toEqual({ age: 30 });

    testInstance.item = { age: 20 };

    expect(testInstance.sortedItem).toEqual({ age: 20 });
  });

  it('should handle setting value with dot notation', () => {
    class TestClass {
      @Sort({ by: 'address.country', order: 'desc' })
      public item = { address: { country: 'USA' } };

      public get sortedItem() {
        return this.item;
      }
    }

    const testInstance = new TestClass();

    expect(testInstance.sortedItem).toEqual({ address: { country: 'USA' } });

    testInstance.item = { address: { country: 'Brazil' } };

    expect(testInstance.sortedItem).toEqual({ address: { country: 'Brazil' } });
  });
});
