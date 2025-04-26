import Integer from "../Integer";

declare namespace String {

export type Length<S extends string, Count extends number = 0>
  = S extends `${infer H}${infer Rest}`
    ? Length<Rest, Integer.Inc<Count>>
    : Count;

export type At<S extends string, N extends number, Count extends number = 0>
  = Integer.Lower<N, 0> extends true
    ? never
    : Count extends 0
      ? Integer.GreaterEq<N, Length<S>> extends true
        ? never
        : S extends `${infer H}${infer Rest}`
          ? Count extends N
            ? H
            : At<Rest, N, Integer.Inc<Count>>
          : never
      : S extends `${infer H}${infer Rest}`
        ? Count extends N
          ? H
          : At<Rest, N, Integer.Inc<Count>>
        : never;

}

export default String;