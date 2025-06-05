import Integer from "../Integer";

declare namespace Array {

/**
 * Type function to generate the array whose length equals to the identified length.
 * 
 * @param L The length of created array type.
 * @param T The type element of created array type.
 * @param Count The type to accumulate the type `T` as its element to generate
 * the returned array type.
 * @returns If `T` is not defined, then it will create an array containing `L`
 * `undefined`s. If `T` is defined, then it will create an array containing `L`
 * `T`s.
 * 
 * @example
 * // Normal usage
 * type A = CreateArrayFromLength<3>; // A: [undefined, undefined, undefined]
 * 
 * // Identify the type element
 * type B = CreateArrayFromLength<3, string>; // B: [string, string, string]
 */
export type CreateArrayFromLength<
  L extends number, 
  T extends unknown = undefined, 
  Count extends T[] = []
> = Integer.IsNegative<L> extends true
  ? []
  : Count["length"] extends L
    ? Count
    : CreateArrayFromLength<L, T, [...Count, T]>;

/**
 * Type function to get the `N`th type element of array type `Arr`. When the index
 * is negative, it will come back from the tail of the array.
 * 
 * @param Arr The array to be got element.
 * @param N The index of element.
 * @param Count The type to accumulate the type of element of `Array` as its element to
 * return the final result when the length of `Count` is equal to `N`.
 * @returns Returns the element of `Arr` at index `N`, if the index is negative, it will
 * come back from the end of the array. If the index is greater than the length of `Arr`,
 * then it will return `never`.
 * 
 * @example
 * type At1 = Array.At<[1, 2, 3], 1>;   // 2
 * type At2 = Array.At<[1, 2, 3], 0>;   // 1
 * type At3 = Array.At<[1, 2, 3], -1>;  // 3
 * type At4 = Array.At<[1, 2, 3], 4>;   // never
 */
export type At<
  Arr extends unknown[],
  N extends number, 
  Count extends unknown[] = []
> = Integer.IsNegative<N> extends true
  ? Integer.Add<N, Arr["length"]> extends number
    ? At<Arr, Integer.Add<N, Arr["length"]>, Count>
    : never
  : Count["length"] extends N
    ? Arr extends [infer F, ...infer Rest]
      ? F
      : never
    : Arr extends [infer F, ...infer Rest]
      ? At<Rest, N, [...Count, F]>
      : never;

/**
 * Unlike `Array.prototype.concat` method, it cannot receive unlimited type
 * parameters, it can only concat two arrays together.
 * 
 * @param A The first array to concat, the elements of it will show at the front.
 * @param B The second array to concat, the elements of it will show at the behind.
 * @returns Return the array `[a0, a1, ..., an, b0, b1, ...bm]`, where `a0,...an` are
 * the elements of array `A`, `b0,...,bm` are the elements of array `B`.
 * 
 * @example
 * type Concat1 = Concat<[1, 2, 3], [1]>;           // [1, 2, 3, 1]
 * type Concat2 = Concat<["🐒", 2, 9n], [true, 0]>; // ["🐒", 2, 9n, true, 0]
 */
export type Concat<A extends unknown[], B extends unknown[]> = [...A, ...B];

export type Fill<
  Arr extends unknown[],
  V extends unknown,
  Start extends number = 0,
  End extends number = Arr["length"],
  Count extends unknown[] = [],
  Result extends unknown[] = []
> = Integer.Lower<Start, Arr["length"]> extends true
  ? Fill<Arr, V, 0, End, Count, Result>
  : Integer.



}

export default Array;