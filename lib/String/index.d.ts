import Integer from "../Integer";

declare namespace String {

export type Length<S extends string, Count extends number = 0>
  = S extends `${infer H}${infer Rest}`
    ? Length<Rest, Integer.Inc<Count>>
    : Count;

export type At<S extends string, N extends number, Count extends number = 0>
  = Integer.Lower<N, 0> extends true
    ? Integer.Add<N, Length<S>> extends number
      ? At<S, Integer.Add<N, Length<S>>, Count>
      : never
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

export type Concat<Strings extends string[], Result extends string = "">
  = Strings extends [infer First extends string, ...infer Rest extends string[]]
    ? Concat<Rest, `${Result}${First}`>
    : Result;

export type SubString<
  S extends string, 
  Start extends number = 0,
  End extends number = String.Length<S>,
  Count extends number = 0,
  Result extends string = ""
> = Integer.IsNegative<Start> extends true
  ? SubString<S, Integer.Add<String.Length<S>, Start>, End, Count, Result>
  : Integer.IsNegative<End> extends true
    ? SubString<S, Start, Integer.Add<String.Length<S>, End>, Count, Result>
    : Integer.GreaterEq<Count, Start> extends true
      ? Integer.Lower<Count, End> extends true
        ? SubString<S, Start, End, Integer.Inc<Count>, `${Result}${String.At<S, Count>}`>
        : Result
      : SubString<S, Start, End, Integer.Inc<Count>, Result>;

export type EndsWith<S extends string, T extends string, Index extends number = -1>
  = Index extends -1
    ? S extends `${infer Rest}${T}`
      ? true
      : false
    : T extends SubString<S, Index>
      ? true
      : false;

}

export default String;