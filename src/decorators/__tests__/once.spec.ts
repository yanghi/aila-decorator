import { once } from '../once';

class TestClass {
  counter = 0;

  @once
  increment() {
    this.counter++;
  }
}

describe('once', () => {
  it('should only execute the method once', () => {
    const instance = new TestClass();
    instance.increment();
    expect(instance.counter).toBe(1);
    instance.increment();
    expect(instance.counter).toBe(1);
    instance.increment();
    expect(instance.counter).toBe(1);
  });
});
