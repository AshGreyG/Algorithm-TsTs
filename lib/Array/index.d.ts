import { Equal, Primitive } from "../../utils";
import Integer from "../Integer";
import Boolean from "../Boolean";

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
> = Integer.Eq<Arr["length"], 0> extends true
  ? never
  : Integer.IsNegative<N> extends true
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

/**
 * This method simulates the JavaScript spread syntax using tuple type.
 * 
 * @param Arr This array is a type wrapper for arrays to concat.
 * @returns Return the array `[arr0_0, arr0_1, ...arr0_n, ..., arrM_0, arrM_1, ..., arrM_n]`,
 * where `arr0, arr1, ..., arrM` are the elements of `Arr` and also the arrays to
 * concat.
 * 
 * @example
 * type MC1 = MultipleConcat<[[1, 2], ["t"], [true, false]]>; // [1, 2, "t", true, false]
 * type MC2 = MultipleConcat<[[], [], [], []]>;               // []
 */
export type MultipleConcat<Arr extends unknown[][], Result extends unknown[] = []>
  = Arr extends [infer F, ...infer Rest extends unknown[][]]
    ? F extends unknown[]
      ? MultipleConcat<Rest, [...Result, ...F]>
      : never
    : Result;

/**
 * This method is like `Array.prototype.fill`, its behavior of over-bound indexes
 * is same with it (see [MDN docs about the details](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)).
 * It fills the array from index `Start` to `End - 1` using new value `V`.
 * 
 * @param Arr The original array to fill.
 * @param V The new value to fill with.
 * @param Start Filling starting index, when `Count` array counts to `Start`, `Result`
 * begins to store new value to it.
 * @param End Filling ending index, when `Count` array counts to `End`, `Result`
 * finally ends to store new value to it.
 * @param Count An array to record where the recursive procedures are now.
 * @param Result An array to store original elements outside `[Start, End)` and
 * store new values inside `[Start, End)`.
 * @returns This method returns the final `Result`, whose `[Start, End)` part
 * has been replaced by new value `V`.
 * 
 * @example
 * // Basic usage
 * type Fill1 = Array.Fill<[1, 2, 3], "3">;           // ["3", "3", "3"]
 * type Fill2 = Array.Fill<[0, 9, 1], "1", 1, 2>;     // [0, "1", 1]
 * type Fill3 = Array.Fill<["head", 9, 1], true, 1>;  // ["head", true, true]
 * 
 * // Out-bound usage
 * type Fill4 = Array.Fill<[1, 2, 3], "3", 2, 1>;     // [1, 2, 3]
 * type Fill5 = Array.Fill<[1, 2, 3], "3", -4, 2>;    // ["3", "3", 3]
 * type Fill6 = Array.Fill<[1, 2, 3], "3", -2, 3>;    // [1, "3", "3"]
 * type Fill7 = Array.Fill<[1, 2, 3], "3", 7, 2>;     // [1, 2, 3]
 * type Fill8 = Array.Fill<[1, 2, 3], "3", 1, -1>;    // [1, "3", 3]
 */
export type Fill<
  Arr extends unknown[],
  V extends unknown,
  Start extends number = 0,
  End extends number = Arr["length"],
  Count extends 0[] = [],
  Result extends unknown[] = []
> = Integer.Lower<Start, Integer.Opposite<Arr["length"]>> extends true
  ? Fill<Arr, V, 0, End, Count, Result>
  : Boolean.And<
    Integer.GreaterEq<Start, Integer.Opposite<Arr["length"]>>,
    Integer.IsNegative<Start>
  > extends true
    ? Integer.Add<Start, Arr["length"]> extends number
      ? Fill<Arr, V, Integer.Add<Start, Arr["length"]>, End, Count, Result>
      : never
    : Integer.GreaterEq<Start, Arr["length"]> extends true
      ? Arr
      /** @remark `Start` is in [0, Arr["length"] - 1) */
      : Integer.Lower<End, Integer.Opposite<Arr["length"]>> extends true
        ? Fill<Arr, V, Start, 0, Count, Result>
        : Boolean.And<
          Integer.GreaterEq<End, Integer.Opposite<Arr["length"]>>,
          Integer.IsNegative<End>
        > extends true
          ? Integer.Add<End, Arr["length"]> extends number
            ? Fill<Arr, V, Start, Integer.Add<End, Arr["length"]>, Count, Result>
            : never
          : Integer.Greater<End, Arr["length"]> extends true
            ? Fill<Arr, V, Start, Arr["length"], Count, Result>
            /** @remark `End` is in [0, Arr["length"] - 1) */
            : Integer.LowerEq<End, Start> extends true
              /** @remark When `Start` >= `End`, there is no position for new value */
              ? Arr
              /** @remark Normal case */
              : Integer.Eq<Arr["length"], Count["length"]> extends true
                ? Result
                : Integer.Greater<Start, Count["length"]> extends true
                  ? Fill<Arr, V, Start, End, [...Count, 0], [...Result, At<Arr, Count["length"]>]>
                  : Boolean.And<
                    Integer.GreaterEq<Count["length"], Start>,
                    Integer.Lower<Count["length"], End>
                  > extends true
                    ? Fill<Arr, V, Start, End, [...Count, 0], [...Result, V]>
                    : Fill<Arr, V, Start, End, [...Count, 0], [...Result, At<Arr, Count["length"]>]>;

/**
 * This method checks if an array is flatten, in other words, it does't contain
 * a nested array as its element.
 * 
 * @param Arr The array to be checked.
 * @returns If `Arr` has a nested array as its element, then this method returns
 * `false` type, otherwise `true` type.
 * 
 * @example
 * type Is1 = Array.IsFlatten<[]>;              // true
 * type Is2 = Array.IsFlatten<[[]]>;            // false
 * type Is3 = Array.IsFlatten<[1, 2, 3]>;       // true
 * type Is4 = Array.IsFlatten<[1, [2], 3]>;     // false
 * type Is5 = Array.IsFlatten<[[], 1, 2>];      // false
 * type Is6 = Array.IsFlatten<[1, [1, 2, []]]>; // false
 */
export type IsFlatten<Arr extends unknown[]>
  = Arr extends [infer F, ...infer Rest]
    ? F extends unknown[]
      ? false
      : IsFlatten<Rest>
    : true;

/**
 * This method flattens a nested array.
 * 
 * @param Arr The nested array (or not nested, then it will return as origin).
 * @param Result The array to store the final result during the process procedure.
 * @returns The flattened `Arr`.
 * 
 * @example
 * type Flat1 = Flat<[1, 2, 3]>;              // [1, 2, 3]
 * type Flat2 = Flat<[1, [2, 3, [2]], [2]]>;  // [1, 2, 3, 2, 2]
 */
export type Flat<Arr extends unknown[], Result extends unknown[] = []> 
  = Arr extends [infer F, ...infer Rest]
    ? F extends unknown[]
      ? Flat<[...F, ...Rest], Result>
      : Flat<Rest, [...Result, F]>
    : Result;

/**
 * This method checks if an element is in an array. It uses `Equal` in utils.
 * 
 * @param Arr The array to check if have an element.
 * @param T The element to check if is in an array.
 * 
 * @example
 * type Includes1 = Array.Includes<[1, 2, 3], 1>;     // true
 * type Includes2 = Array.Includes<[1, 2, 3], never>; // false
 * type Includes3 = Array.Includes<[true], true>;     // true
 */
export type Includes<Arr extends unknown[], T extends unknown>
  = Arr extends [infer F, ...infer Rest]
    ? Equal<F, T> extends true
      ? true
      : Includes<Rest, T>
    : false;

/**
 * This method returns the first encounter index of element `T` in array `Arr`.
 * 
 * @param Arr The array to be checked.
 * @param T The element to check the first encounter index.
 * @param Count Middle variable to store the scanning state.
 * @returns The first encounter index of element `T` in array `Arr`.
 * 
 * @example
 * type Index1 = Array.IndexOf<[1, 2, 3], 1>; // 0
 * type Index2 = Array.IndexOf<[1, 2, 3], 3>; // 2
 * type Index3 = Array.IndexOf<[1, 2, 3], 0>; // -1
 */
export type IndexOf<
  Arr extends unknown[], 
  T extends unknown,
  Count extends 0[] = []
> = Arr extends [infer F, ...infer Rest]
  ? Equal<F, T> extends true
    ? Count["length"]
    : IndexOf<Rest, T, [...Count, 0]>
  : -1;

/**
 * This method is like `Array.prototype.join`, it creates and returns a new string by 
 * concatenating all of the elements in this array, separated by commas or a specified 
 * separator string.
 * 
 * @param Arr The array containing elements to be joined.
 * @param Sep The specified separator, default to `","`.
 * @param Result A string to store the final joined result.
 * @param Count Middle variable to store the scanning state.
 */
export type Join<
  Arr extends Primitive[], 
  Sep extends string = ",",
  Result extends string = "",
  Count extends 0[] = [],
> = Arr extends [infer F extends Primitive, ...infer Rest extends Primitive[]]
  ? Integer.Eq<Count["length"], 0> extends true
    ? Join<Rest, Sep, `${F}`, [...Count, 0]>
    : Join<Rest, Sep, `${Result}${Sep}${F}`, [...Count, 0]>
  : Result;

}

export default Array;