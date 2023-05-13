import { UniqueElementFunction } from "@/utils/unique";

export interface UniqueOptions {
  prop?: string;
  unique?: string | UniqueElementFunction<any>
}