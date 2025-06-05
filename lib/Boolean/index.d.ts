declare namespace Boolean {

/**
 * This is a boolean type function to return the value of expression
 * like `a && b`.
 * 
 * @param A `a` in expression `a && b`.
 * @param B `b` in expression `a && b`.
 * @returns The result of expression `a && b` in JavaScript.
 * 
 * @example
 * type And1 = Boolean.And<true, false>;                            // false
 * type And2 = Boolean.And<Integer.Eq<Integer.Add<1, 2>, 3>, true>; // true
 * type And3 = Boolean.And<Integer.Lower<-3, -9>, false>;           // false
 */
export type And<A extends boolean, B extends boolean>
  = A extends true
    ? B extends true
      ? true
      : false
    : false;

/**
 * This is a boolean type function to return the value of expression
 * like `a || b`.
 * 
 * @param A `a` in expression `a || b`.
 * @param B `b` in expression `a || b`.
 * @returns The result of expression `a || b` in JavaScript.
 * 
 * @example
 * type Or1 = Boolean.Or<true, false>;                            // true
 * type Or2 = Boolean.Or<Integer.Eq<Integer.Add<1, 2>, 3>, true>; // true
 * type Or3 = Boolean.Or<Integer.Lower<-3, -9>, false>;           // false
 */
export type Or<A extends boolean, B extends boolean>
  = A extends true
    ? true
    : B extends true
      ? true
      : false;

}