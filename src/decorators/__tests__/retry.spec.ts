import { Retry } from '../retry/decorator'

describe('Retry', () => {
  it('should retry the function when it throws an error', async () => {
    let retryCount = 0;
    const originalFunction = vi.fn(async (_n: number) => {
      retryCount++;

      if (retryCount < 3) {
        throw new Error('Network error');
      }
      return 'Success';
    });

    class TestClass {
      @Retry(3, 1000)
      async testMethod(n: number) {
        return await originalFunction(n);
      }
    }

    const testObject = new TestClass();
    const result = await testObject.testMethod(1);
    expect(result).toEqual('Success');

    expect(originalFunction).toBeCalledTimes(3)
    expect(originalFunction).lastCalledWith(1)
    expect(retryCount).toEqual(3);
  });

  it('should throw an error when Retry count is exceeded', async () => {
    const originalFunction = async () => {
      throw new Error('Network error');
    };

    class TestClass {
      @Retry(3, 1000)
      async testMethod() {
        return await originalFunction();
      }
    }

    const testObject = new TestClass();

    await expect(testObject.testMethod()).rejects.toThrow('Network error');
  });
});
