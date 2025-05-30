import Integer from "../Integer";
import String from "../String";

declare namespace BigInteger {

export type ToString<A extends bigint> = `${A}`;

export type IsNegative<A extends bigint>
  = `${A}` extends `-${infer OA extends bigint}` ? true : false;

export type IsPositive<A extends bigint>
  = IsNegative<A> extends false
    ? A extends 0n
      ? false
      : true
    : false;

export type IsZero<A extends bigint> = A extends 0n ? true : false;

export type Opposite<A extends bigint>
  = IsZero<A> extends true
    ? 0
    : `${A}` extends `-${infer OA extends bigint}`
      ? OA
      : `-${A}` extends `${infer OA extends bigint}`
        ? OA
        : never;

export type Eq<A extends bigint, B extends bigint> = A extends B ? true : false;

export type Lower<
  A extends bigint, 
  B extends bigint,
  AS extends string = `${A}`,
  BS extends string = `${B}`,
  Count extends number = 0,
> = Eq<A, B> extends true
  ? false
  : IsPositive<A> extends true
    ? IsPositive<B> extends true
      ? Integer.Lower<String.Length<AS>, String.Length<BS>> extends true
        ? true
        : Integer.Greater<String.Length<AS>, String.Length<BS>> extends true
          ? false
          : Count extends String.Length<AS>
            ? true
            : String.At<AS, Count> extends `${infer DigitA extends number}`
              ? String.At<BS, Count> extends `${infer DigitB extends number}`
                ? Integer.Greater<DigitA, DigitB> extends true
                  ? false
                  : Lower<A, B, AS, BS, Integer.Inc<Count>> // DigitA < DigitB
                : never
              : never
      : IsNegative<B> extends true
        ? false
        : IsZero<B> extends true
          ? false
          : never
    : IsNegative<A> extends true
      ? IsNegative<B> extends true
        ? Opposite<A> extends bigint
          ? Opposite<B> extends bigint
            ? Lower<Opposite<A>, Opposite<B>> extends true
              ? false
              : true
            : never
          : never
        : true
      : IsZero<A> extends true
        ? IsNegative<B> extends true
          ? false
          : true
        : never;
}

export default BigInteger;