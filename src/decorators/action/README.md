## Action

```ts
class MyStates implements ActionStandardState {
  loading: boolean;
  success: boolean;
  error?: any;
  data: { extra: number };
  extraProp: number;
}

class Test {
  // 你也可以手动初始化替代 `stateFactory`
  // myActionStates = new MyStates()
  myActionStates!: MyStates;

  @Action({
    attach: "myActionStates",
    stateFactory: () => new MyStates(),
    async run(states, fn) {
      try {
        states.loading = true;
        states.data = (await fn()).myData;
        states.extraProp = states.data.extra;
      } catch (error) {
        states.error = error;
        states.success = false;
      } finally {
        states.loading = false;
      }
    },
  })
  async myAction() {
    // do stuff
  }
}

var ins = new Test();
ins.myAction();

// access action states
ins.myActionStates.loading;
```
