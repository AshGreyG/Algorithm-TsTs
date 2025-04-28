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
 * type A = CreateArrayFromLength<3>; // A: [number, number, number]
 * 
 * // Identify the type element
 * type B = CreateArrayFromLength<3, string>; // B: [string, string, string]
 */
export type CreateArrayFromLength<
  L extends number, 
  T extends any = number, 
  Count extends T[] = []
>
  = Integer.IsNegative<L> extends true
    ? []
    : Count["length"] extends L
      ? Count
      : CreateArrayFromLength<L, T, [...Count, T]>;

}

export default Array;