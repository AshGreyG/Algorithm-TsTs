import Integer from "../Integer";
import String from "../String";

declare namespace BigInteger {

export type IsNegative<A extends number> = Integer.IsNegative<A>; // Non-template-literal method
export type IsPositive<A extends number> = Integer.IsPositive<A>;
export type IsZero<A extends number> = Integer.IsZero<A>;
export type Opposite<A extends number> = Integer.Opposite<A>;

export type Lower<
  A extends number, 
  B extends number,
  AS extends string = `${A}`,
  BS extends string = `${B}`,
  Count extends number = 0,
  EqCount extends number = 0
> = Integer.Lower<String.Length<AS>, String.Length<BS>> extends true
  ? true
  : Integer.Greater<String.Length<AS>, String.Length<BS>> extends true
    ? false
    : String.At<AS, Count> extends `${infer DigitA extends number}`
      ? String.At<BS, Count> extends `${infer DigitB extends number}`
        ? Integer.Greater<DigitA, DigitB> extends true
          ? false
          : Integer.Eq<DigitA, DigitB> extends true
            ? Lower<A, B, AS, BS, Integer.Inc<Count>, Integer.Inc<EqCount>>
            : Lower<A, B, AS, BS, Integer.Inc<Count>, EqCount> // DigitA < DigitB
        : Integer.Eq<EqCount, String.Length<AS>> extends true
          ? false
          : true
      : Integer.Eq<EqCount, String.Length<AS>> extends true
        ? false
        : true;
}

export default BigInteger;