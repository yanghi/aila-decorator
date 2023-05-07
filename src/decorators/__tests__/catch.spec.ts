import { Catch } from '../catch';
import { CatchHandler } from '../catch/options';

describe('Catch', () => {
  let mockHandler: CatchHandler;

  beforeEach(() => {
    Catch.defaults.handler = mockHandler = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should catch an error thrown by the decorated method', () => {
    class TestClass {
      @Catch()
      throwError() {
        throw new Error('Something went wrong');
      }
    }

    const testInstance = new TestClass();

    expect(() => {
      testInstance.throwError();
    }).not.toThrow();

    expect(mockHandler).toHaveBeenCalledTimes(1);
    expect(mockHandler).toHaveBeenCalledWith(new Error('Something went wrong'));
  });

  it('should not catch an error if the decorated method does not throw', () => {
    class TestClass {
      @Catch()
      doSomething() {
        // do nothing
      }
    }

    const testInstance = new TestClass();

    expect(() => {
      testInstance.doSomething();
    }).not.toThrow();

    expect(mockHandler).not.toHaveBeenCalled();
  });

  it('should use the provided error handler', () => {
    class TestClass {
      @Catch(mockHandler)
      throwError() {
        throw new Error('Something went wrong');
      }
    }

    const testInstance = new TestClass();

    expect(() => {
      testInstance.throwError();
    }).not.toThrow();

    expect(mockHandler).toHaveBeenCalledTimes(1);
    expect(mockHandler).toHaveBeenCalledWith(new Error('Something went wrong'));
  });
});
