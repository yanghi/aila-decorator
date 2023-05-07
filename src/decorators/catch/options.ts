export type CatchHandler = (error: any) => void;

export interface CatchOptions {
  handler?: CatchHandler
}