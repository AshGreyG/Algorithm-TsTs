import Integer from "../Integer";

declare namespace Array {

/**
 * Type function to generate the array whose length equals to the identified length.
 * 
 * @param L The length of created array type.
 * @param T The type element of created array type.
 * @param Count The type to accumulate the type `T` as its element to generate
 * the returned array type.
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
 * return the final result when the length of `Count` is equal to `N`
 * 
 * @example
 * type At1 = Array.At<[1, 2, 3], 1>;   // 2
 * type At2 = Array.At<[1, 2, 3], 0>;   // 1
 * type At1 = Array.At<[1, 2, 3], -1>;  // 3
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

}

export default Array;