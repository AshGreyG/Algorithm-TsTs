import Integer from "../Integer";
import String from "../String";

declare namespace BigInteger {

export type IsNegative<A extends number> = Integer.IsNegative<A>; // Non-template-literal method
export type IsPositive<A extends number> = Integer.IsPositive<A>;
export type IsZero<A extends number> = Integer.IsZero<A>;
export type Opposite<A extends number> = Integer.Opposite<A>;
export type Eq<A extends number, B extends number> = Integer.Eq<A, B>;

export type Lower<
  A extends number, 
  B extends number,
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
        ? Lower<Opposite<A>, Opposite<B>> extends true
          ? false
          : true
        : true
      : IsZero<A> extends true
        ? IsNegative<B> extends true
          ? false
          : true
        : never;
}

export default BigInteger;