import Array from "../Array";

declare namespace Integer {

/** 
 * The behavior of this method is same with JavaScript `Number.prototype.toString`, but this
 * method doesn't support an optional `radix` type parameter. Notice it doesn't support
 * hexadecimal, octal and binary.
 * 
 * @param {number} A The number to convert to string.
 * 
 * @example
 * type Num1 = Integer.ToString<3>;   // => "3"
 * type Num2 = Integer.ToString<0>;   // => "0"
 * type Num3 = Integer.ToString<-3>;  // => "-3"
 */
export type ToString<A extends number> = `${A}`;

/**
 * This method checks if a number is negative.
 * 
 * @param {number} A The number to check if is negative.
 * 
 * @example
 * type Is1 = Integer.IsNegative<1>;  // => false
 * type Is2 = Integer.IsNegative<0>;  // => false
 * type Is3 = Integer.IsNegative<-2>; // => true
 */
export type IsNegative<A extends number> = `${A}` extends `-${infer OA extends number}` ? true : false;

/**
 * This method checks if a number is positive.
 * 
 * @param {number} A The number to check if is positive.
 * 
 * @example
 * type Is1 = Integer.IsPositive<1>;  // => true
 * type Is2 = Integer.IsPositive<0>;  // => false
 * type Is3 = Integer.IsPositive<-2>; // => false
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
 * @param {number} A The number to check if is zero.
 * 
 * @example
 * type Is1 = Integer.IsZero<1>;  // => false
 * type Is2 = Integer.IsZero<0>;  // => true
 * type Is3 = Integer.IsZero<-2>; // => false
 */
export type IsZero<A extends number> = A extends 0 ? true : false;

/**
 * This method gets the opposite of a number.
 * 
 * @param {number} A The number to be got opposite.
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
 * @param {number} A `a` in `a - b` expression.
 * @param {number} B `b` in `a - b` expression.
 * @param {number[]} [Count] The middle status type variable to store the 
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

export type Greater<A extends number, B extends number>
  = A extends B
    ? false
    : Lower<A, B> extends true
      ? false
      : true;

export type Eq<A extends number, B extends number> = A extends B ? true : false;

export type Neq<A extends number, B extends number> = A extends B ? false : true;

export type LowerEq<A extends number, B extends number>
  = Lower<A, B> extends true
    ? true
    : Eq<A, B> extends true
      ? true
      : false

export type GreaterEq<A extends number, B extends number>
  = Greater<A, B> extends true
    ? true
    : Eq<A, B> extends true
      ? true
      : false;

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