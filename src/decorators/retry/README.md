## Retry

Retry method when the error occurs

### Signature

```ts
export function Retry(retryCount?: number , intervalTime?: number): MethodDecorator
```

### Usage

```ts
class Example {
  @Retry(3)
  async request(){
    // fetch
  }
}
```