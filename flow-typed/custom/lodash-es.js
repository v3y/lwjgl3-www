declare module 'lodash-es/debounce' {
  declare type DebounceOptions = {
    leading?: boolean,
    maxWait?: number,
    trailing?: boolean,
  };

  declare export default function debounce<F: Function>(func: F, wait?: number, options?: DebounceOptions): F;
}

declare module 'lodash-es/uniqueId' {
  declare export default function uniqueId(prefix?: string): string;
}
