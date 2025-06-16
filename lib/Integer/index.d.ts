import Array from "../Array";

/**
 * For stable using, please do not pass the number literal type greater than
 * or equal to 1000 to the argument of type function defined in `Integer`
 * namespace. If you want to use literal type greater than or equal to 1000,
 * please use `BigInteger` namespace, whose methods will first convert big
 * integer to string.
 */
declare namespace Integer {

/** 
 * The behavior of this method is same with JavaScript `Number.prototype.toString`, but this
 * method doesn't support an optional `radix` type parameter. Notice it doesn't support
 * hexadecimal, octal and binary.
 * 
 * @param A The number to convert to string.
 * 
 * @example
 * type Num1 = Integer.ToString<3>;   // "3"
 * type Num2 = Integer.ToString<0>;   // "0"
 * type Num3 = Integer.ToString<-3>;  // "-3"
 */
export type ToString<A extends number> = `${A}`;

/**
 * This method checks if a number is negative.
 * 
 * @param A The number to check if is negative.
 * 
 * @example
 * type Is1 = Integer.IsNegative<1>;  // false
 * type Is2 = Integer.IsNegative<0>;  // false
 * type Is3 = Integer.IsNegative<-2>; // true
 */
export type IsNegative<A extends number> = `${A}` extends `-${infer OA extends number}` ? true : false;

/**
 * This method checks if a number is positive.
 * 
 * @param A The number to check if is positive.
 * 
 * @example
 * type Is1 = Integer.IsPositive<1>;  // true
 * type Is2 = Integer.IsPositive<0>;  // false
 * type Is3 = Integer.IsPositive<-2>; // false
 */
export type IsPositive<A extends number>
  = IsNegative<A> extends false
    ? A extends 0
      ? false
      : true
    : false;

/**
 * This method checks if a number is zero.
 * 
 * @param A The number to check if is zero.
 * 
 * @example
 * type Is1 = Integer.IsZero<1>;  // false
 * type Is2 = Integer.IsZero<0>;  // true
 * type Is3 = Integer.IsZero<-2>; // false
 */
export type IsZero<A extends number> = A extends 0 ? true : false;

/**
 * This method gets the opposite of a number.
 * 
 * @param A The number to be got opposite.
 * 
 * @example
 * type Opposite1 = Integer.Opposite<3>;  // -3
 * type Opposite2 = Integer.Opposite<0>;  // 0
 * type Opposite3 = Integer.Opposite<-2>; // 2
 */
export type Opposite<A extends number>
  = IsZero<A> extends true
    ? 0
    : `${A}` extends `-${infer OA extends number}`
      ? OA
      : `-${A}` extends `${infer OA extends number}`
        ? OA
        : never;

/**
 * This method is a internal helper to define the sub function `a - b`, but
 * `a` cannot be less than `b`. It uses the tuple type in TsTs.
 * 
 * @param A `a` in `a - b` expression.
 * @param B `b` in `a - b` expression.
 * @param Count The middle status type variable to store the 
 * middle result, when `A extends B` is true, this method will return the
 * `Count["length"]`, and that's the answer.
 * 
 * @example
 * // Notice that this type is not exported, it's an internal helper method.
 * // So the code below is just to show the function of this method.
 * type Res1 = Integer._PositiveSub<3, 2>;  // 1
 * type Res2 = Integer._PositiveSub<2, 2>;  // 0
 * type Res3 = Integer._PositiveSub<1, 2>;  // "A is lower than B"
 */
type _PositiveSub<A extends number, B extends number, Count extends number[] = []>
  = A extends B
    ? Count["length"]
    : Array.CreateArrayFromLength<A> extends [...infer Rest, infer E]
      ? _PositiveSub<Rest["length"], B, [...Count, Rest["length"]]>
      : "A is lower than B";

/**
 * This method checks if a number is lower than another.
 * 
 * @param A `a` in `if a < b` expression.
 * @param B `b` in `if a < b` expression.
 * 
 * @example
 * type Lower1 = Integer.Lower<-34, 2>;   // true
 * type Lower2 = Integer.Lower<0, 2>;     // true
 * type Lower3 = Integer.Lower<23, 2>;    // false
 * type Lower4 = Integer.Lower<-34, -4>;  // true
 * type Lower5 = Integer.Lower<-4, -4>;   // false
 * type Lower6 = Integer.Lower<4, 4>;     // false
 * type Lower7 = Integer.Lower<0, 0>;     // false
 */
export type Lower<A extends number, B extends number>
  = A extends B
    ? false
    : IsNegative<A> extends true
      ? IsPositive<B> extends true
        ? true
        : IsZero<B> extends true
          ? true
          : Lower<Opposite<A>, Opposite<B>> extends true
            ? false
            : true
      : IsPositive<A> extends true
        ? IsNegative<B> extends true
          ? false
          : IsZero<B> extends true
            ? false
            : _PositiveSub<A, B> extends "A is lower than B"
              ? true
              : false
        : IsZero<A> extends true
          ? IsNegative<B> extends true
            ? false
            : true
          : never;

/**
 * This method checks if a number is greater than another.
 * 
 * @param A `a` in `if a > b` expression.
 * @param B `b` in `if a > b` expression.
 * 
 * @example
 * type Greater1 = Integer.Greater<-34, 2>;   // false
 * type Greater2 = Integer.Greater<0, 2>;     // false
 * type Greater3 = Integer.Greater<23, 2>;    // true
 * type Greater4 = Integer.Greater<-34, -4>;  // false
 * type Greater5 = Integer.Greater<-4, -4>;   // false
 * type Greater6 = Integer.Greater<4, 4>;     // false
 * type Greater7 = Integer.Greater<0, 0>;     // false
 */
export type Greater<A extends number, B extends number>
  = A extends B
    ? false
    : Lower<A, B> extends true
      ? false
      : true;

/**
 * This method checks if a number is equal to another.
 * 
 * @param A `a` in `if a == b` expression.
 * @param B `b` in `if a == b` expression.
 * 
 * @example
 * type Eq1 = Integer.Eq<-34, 2>;   // false
 * type Eq2 = Integer.Eq<0, 2>;     // false
 * type Eq3 = Integer.Eq<23, 2>;    // false
 * type Eq4 = Integer.Eq<-34, -4>;  // false
 * type Eq5 = Integer.Eq<-4, -4>;   // true
 * type Eq6 = Integer.Eq<4, 4>;     // true
 * type Eq7 = Integer.Eq<0, 0>;     // true
 */
export type Eq<A extends number, B extends number> = A extends B ? true : false;

/**
 * This method checks if a number is not equal to another.
 * 
 * @param A `a` in `if a != b` expression.
 * @param B `b` in `if a != b` expression.
 * 
 * @example
 * type Neq1 = Integer.Neq<-34, 2>;   // true
 * type Neq2 = Integer.Neq<0, 2>;     // true
 * type Neq3 = Integer.Neq<23, 2>;    // true
 * type Neq4 = Integer.Neq<-34, -4>;  // true
 * type Neq5 = Integer.Neq<-4, -4>;   // false
 * type Neq6 = Integer.Neq<4, 4>;     // false
 * type Neq7 = Integer.Neq<0, 0>;     // false
 */
export type Neq<A extends number, B extends number> = A extends B ? false : true;

/**
 * This method checks if a number is lower than or equal to another.
 * 
 * @param A `a` in `if a <= b` expression.
 * @param B `b` in `if a <= b` expression.
 * 
 * @example
 * type LowerEq1 = Integer.LowerEq<-34, 2>;   // true
 * type LowerEq2 = Integer.LowerEq<0, 2>;     // true
 * type LowerEq3 = Integer.LowerEq<23, 2>;    // false
 * type LowerEq4 = Integer.LowerEq<-34, -4>;  // true
 * type LowerEq5 = Integer.LowerEq<-4, -4>;   // true
 * type LowerEq6 = Integer.LowerEq<4, 4>;     // true
 * type LowerEq7 = Integer.LowerEq<0, 0>;     // true
 */
export type LowerEq<A extends number, B extends number>
  = Lower<A, B> extends true
    ? true
    : Eq<A, B> extends true
      ? true
      : false

/**
 * This method checks if a number is greater than or equal to another.
 * 
 * @param A `a` in `if a >= b` expression.
 * @param B `b` in `if a >= b` expression.
 * 
 * @example
 * type GreaterEq1 = Integer.GreaterEq<-34, 2>;   // false
 * type GreaterEq2 = Integer.GreaterEq<0, 2>;     // false
 * type GreaterEq3 = Integer.GreaterEq<23, 2>;    // true
 * type GreaterEq4 = Integer.GreaterEq<-34, -4>;  // false
 * type GreaterEq5 = Integer.GreaterEq<-4, -4>;   // true
 * type GreaterEq6 = Integer.GreaterEq<4, 4>;     // true
 * type GreaterEq7 = Integer.GreaterEq<0, 0>;     // true
 */
export type GreaterEq<A extends number, B extends number>
  = Greater<A, B> extends true
    ? true
    : Eq<A, B> extends true
      ? true
      : false;

/**
 * This method adds two number.
 * 
 * @param A `a` in `a + b` expression
 * @param B `b` in `a + b` expression
 * 
 * @example
 * type Add1 = Integer.Add<1, 2>;   // 3
 * type Add2 = Integer.Add<1, -1>;  // 0
 * type Add3 = Integer.Add<1, 0>;   // 1
 * type Add4 = Integer.Add<-3, 2>;  // -1
 * type Add5 = Integer.Add<-9, 9>;  // 0
 * type Add6 = Integer.Add<-6, 0>;  // -6
 */
export type Add<A extends number, B extends number>
  = A extends Opposite<B>
    ? 0
    : IsPositive<A> extends true
      ? IsPositive<B> extends true
        ? [...Array.CreateArrayFromLength<A>, ...Array.CreateArrayFromLength<B>]["length"]
        : IsNegative<B> extends true
          ? Greater<A, Opposite<B>> extends true
            ? _PositiveSub<A, Opposite<B>>
            : _PositiveSub<Opposite<B>, A> extends number
              ? Opposite<_PositiveSub<Opposite<B>, A>>
              : never // Impossible
          : A
      : IsNegative<A> extends true
        ? IsNegative<B> extends true
          ? [...Array.CreateArrayFromLength<Opposite<A>>, ...Array.CreateArrayFromLength<Opposite<B>>]["length"] extends number
            ? Opposite<[...Array.CreateArrayFromLength<Opposite<A>>, ...Array.CreateArrayFromLength<Opposite<B>>]["length"]>
            : never
          : IsPositive<B> extends true
            ? Lower<Opposite<A>, B> extends true
              ? _PositiveSub<B, Opposite<A>>
              : _PositiveSub<Opposite<A>, B> extends number
                ? Opposite<_PositiveSub<Opposite<A>, B>>
                : never // Impossible
            : A
        : B;

/**
 * This method returns the successor of current number.
 * 
 * @param A The number to take successor.
 * @returns The successor of current number.
 * 
 * @example
 * type Inc1 = Integer.Inc<-23>;  // -22
 * type Inc2 = Integer.Inc<-1>;   // 0
 * type Inc3 = Integer.Inc<3>;    // 4
 */
export type Inc<A extends number> = Add<A, 1>;

export type Sub<A extends number, B extends number, Count extends number[] = []>
  = A extends B
    ? Count["length"]
    : IsPositive<A> extends true
      ? IsPositive<B> extends true
        ? Greater<A, B> extends true
          ? _PositiveSub<A, B>
          : _PositiveSub<B, A> extends number
            ? Opposite<_PositiveSub<B, A>>
            : never
        : IsNegative<B> extends true
          ? Add<A, Opposite<B>>
          : A
      : IsNegative<A> extends true
        ? IsNegative<B> extends true
          ? Greater<A, B> extends true
            ? _PositiveSub<Opposite<B>, Opposite<A>>
            : _PositiveSub<Opposite<A>, Opposite<B>> extends number
              ? Opposite<_PositiveSub<Opposite<A>, Opposite<B>>>
              : never
          : IsPositive<B> extends true
            ? Add<A, Opposite<B>>
            : A
        : Opposite<B>;

export type Dec<A extends number> = Sub<A, 1>;

export type Multiply<A extends number, B extends number, Count extends number = 0>
  = IsPositive<A> extends true
    ? IsPositive<B> extends true
      ? IsZero<A> extends true
        ? Count
        : Add<Count, B> extends number
          ? Multiply<Dec<A>, B, Add<Count, B>>
          : never
      : IsNegative<B> extends true
        ? Opposite<Multiply<A, Opposite<B>>>
        : IsZero<B> extends true
          ? 0
          : never
    : IsNegative<A> extends true
      ? IsNegative<B> extends true
        ? Multiply<Opposite<A>, Opposite<B>>
        : IsPositive<B> extends true
          ? Opposite<Multiply<Opposite<A>, B>>
          : IsZero<B> extends true
            ? 0
            : never
      : IsZero<A> extends true
        ? 0
        : never;

export type Divide<
  A extends number, 
  B extends number, 
  Count extends number = 0, 
  Accumulate extends number = 0
>
  = IsPositive<A> extends true
    ? IsPositive<B> extends true
      ? Add<B, Accumulate> extends number
        ? Greater<Add<B, Accumulate>, A> extends true
          ? Count
          : Divide<A, B, Inc<Count>, Add<B, Accumulate>>
        : never // Impossible
      : IsNegative<B> extends true
        ? Opposite<Divide<A, Opposite<B>>>
        : IsZero<B> extends true
          ? never
          : never
    : IsNegative<A> extends true
      ? IsNegative<B> extends true
        ? Divide<Opposite<A>, Opposite<B>>
        : IsPositive<B> extends true
          ? Opposite<Divide<Opposite<A>, B>>
          : IsZero<B> extends true
            ? never
            : never
      : IsZero<A> extends true
        ? 0
        : never;

export type Mod<
  A extends number, 
  B extends number, 
  Count extends number = 0, 
  Accumulate extends number = 0
>
  = IsPositive<A> extends true
    ? IsPositive<B> extends true
      ? Add<B, Accumulate> extends number
        ? Greater<Add<B, Accumulate>, A> extends true
          ? Sub<A, Accumulate>
          : Mod<A, B, Inc<Count>, Add<B, Accumulate>>
        : never // Impossible
      : IsNegative<B> extends true
        ? Opposite<Divide<A, Opposite<B>>>
        : never
    : IsNegative<A> extends true
      ? IsNegative<B> extends true
        ? Divide<Opposite<A>, Opposite<B>>
        : IsPositive<B> extends true
          ? Opposite<Divide<Opposite<A>, B>>
          : never
      : IsZero<A> extends true
        ? 0
        : never;

export type IsOdd<A extends number> 
  = `${A}` extends `${infer Rest}${"1" | "3" | "5" | "7" | "9"}`
    ? true
    : false;

export type IsEven<A extends number>
  = `${A}` extends `${infer Rest}${"0" | "2" | "4" | "6" | "8"}`
    ? true
    : false;

}

export default Integer;