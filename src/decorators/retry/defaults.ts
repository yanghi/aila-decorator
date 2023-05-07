import { RetryOptions } from "./options";

export const defaults: Required<RetryOptions> = {
  count: 5,
  interval: 1000
}