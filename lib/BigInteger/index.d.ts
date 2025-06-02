import Integer from "../Integer";
import String from "../String";

declare namespace BigInteger {

/**
 * The behavior of this method is same with JavaScript `BigInt.prototype.toString`,
 * this method will delete the `n` at the end of BigInteger.
 * 
 * @param A The bigint to convert to string
 * 
 * @example
 * type BigInt1 = BigInteger.ToString<8n>;    // "8"
 * type BigInt2 = BigInteger.ToString<-128n>; // "-128"
 * type BigInt3 = BigInteger.ToString<0n>;    // "0"
 */
export type ToString<A extends bigint> = `${A}`;

/**
 * This method checks if a bigint is negative.
 * 
 * @param A The bigint to check if is negative.
 * 
 * @example
 * type Is1 = BigInteger.IsNegative<1n>;  // false
 * type Is2 = BigInteger.IsNegative<0n>;  // false
 * type Is3 = BigInteger.IsNegative<-2n>; // true
 */
export type IsNegative<A extends bigint>
  = `${A}` extends `-${infer OA extends bigint}` ? true : false;

/**
 * This method checks if a bigint is positive.
 * 
 * @param A The bigint to check if is positive.
 * 
 * @example
 * type Is1 = BigInteger.IsPositive<1n>;  // true
 * type Is2 = BigInteger.IsPositive<0n>;  // false
 * type Is3 = BigInteger.IsPositive<-2n>; // false
 */
export type IsPositive<A extends bigint>
  = IsNegative<A> extends false
    ? A extends 0n
      ? false
      : true
    : false;

/**
 * This method checks if a bigint is zero.
 * 
 * @param A The bigint to check if is zero.
 * 
 * @example
 * type Is1 = BigInteger.IsZero<1n>;  // false
 * type Is2 = BigInteger.IsZero<0n>;  // true
 * type Is3 = BigInteger.IsZero<-2n>; // false
 */
export type IsZero<A extends bigint> = A extends 0n ? true : false;

/**
 * This method gets the opposite of a bigint.
 * 
 * @param A The bigint to be got opposite.
 * 
 * @example
 * type Opposite1 = BigInteger.Opposite<3n>;  // -3n
 * type Opposite2 = BigInteger.Opposite<0n>;  // 0n
 * type Opposite3 = BigInteger.Opposite<-2n>; // 2n
 */
export type Opposite<A extends bigint>
  = IsZero<A> extends true
    ? 0n
    : `${A}` extends `-${infer OA extends bigint}`
      ? OA
      : `-${A}` extends `${infer OA extends bigint}`
        ? OA
        : never;

/**
 * This method checks if a bigint is equal to another.
 * 
 * @param A `a` in `a == b` expression.
 * @param B `b` in `a == b` expression.
 * 
 * @example
 * type Eq1 = BigInteger.Eq<3n, 3n>;    // true
 * type Eq2 = BigInteger.Eq<0n, 1n>;    // false
 * type Eq3 = BigInteger.Eq<-2n, -2n>;  // true
 */
export type Eq<A extends bigint, B extends bigint> = A extends B ? true : false;

/**
 * This method checks if a bigint is lower than another.
 * 
 * @param A `a` in `if a < b` expression.
 * @param B `b` in `if a < b` expression.
 * 
 * @example
 * type Lower1 = BigInteger.Lower<-34n, 2n>;   // true
 * type Lower2 = BigInteger.Lower<0n, 2n>;     // true
 * type Lower3 = BigInteger.Lower<23n, 2n>;    // false
 * type Lower4 = BigInteger.Lower<-34n, -4n>;  // true
 * type Lower5 = BigInteger.Lower<-4n, -4n>;   // false
 * type Lower6 = BigInteger.Lower<4n, 4n>;     // false
 * type Lower7 = BigInteger.Lower<0n, 0n>;     // false
 */
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