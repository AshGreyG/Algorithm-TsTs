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

export type CharAt<S extends string, N extends number>
  = Integer.Lower<N, 0> extends true
    ? ""
    : Integer.GreaterEq<N, Length<S>> extends true
      ? ""
      : At<S, N>;

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

export type EndsWith<S extends string, T extends string, Index extends number | null = null>
  = Index extends null
    ? S extends `${infer Rest}${T}`
      ? true
      : false
    : Index extends number // TypeScript type system cannot infer that Index extends number
      ? Integer.Sub<Index, Length<T>> extends number
        ? T extends SubString<S, Integer.Sub<Index, Length<T>>>
          ? true
          : false
        : never
      : never;

export type IndexOf<
  S extends string, 
  Sub extends string, 
  Index extends number | null = null,
  Ptr extends number = 0,
> = Index extends null
  ? Integer.Add<Ptr, Length<Sub>> extends number
    ? SubString<S, Ptr, Integer.Add<Ptr, Length<Sub>>> extends Sub
      ? Ptr
      : IndexOf<S, Sub, null, Integer.Inc<Ptr>>
    : never
  : Index extends number
    ? Integer.IsNegative<Index> extends true
      ? Integer.Add<Index, Length<S>> extends number
        ? IndexOf<S, Sub, null, 0>
        : never
      : Index extends number
        ? Integer.Greater<Index, Integer.Sub<Length<S>, Length<Sub>>> extends true
          ? -1
          : IndexOf<S, Sub, null, Index>
        : never
    : never;

export type Includes<
  S extends string, 
  Sub extends string,
  Index extends number | null = null
> = Index extends null
  ? S extends `${infer F}${Sub}${infer E}`
    ? true
    : false
  : Index extends number
    ? Integer.IsNegative<Index> extends true
      ? S extends `${infer F}${Sub}${infer E}`
        ? true
        : false
      : SubString<S, Index> extends `${infer F}${Sub}${infer E}`
        ? true
        : false
    : never;

}

export default String;