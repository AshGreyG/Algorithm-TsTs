// Auto-generated tests for Integer

import Integer from "../lib/Integer";
import { Equal, Expect } from "../utils";

type CaseLibInteger = [
  // Integer.IsPositive
  Expect<Equal<Integer.IsPositive<-2>, false>>,
  Expect<Equal<Integer.IsPositive<0>, false>>,
  Expect<Equal<Integer.IsPositive<9>, true>>,

  // Integer.IsNegative
  Expect<Equal<Integer.IsNegative<-2>, true>>,
  Expect<Equal<Integer.IsNegative<0>, false>>,
  Expect<Equal<Integer.IsNegative<9>, false>>,

  // Integer.IsZero
  Expect<Equal<Integer.IsZero<-2>, false>>,
  Expect<Equal<Integer.IsZero<0>, true>>,
  Expect<Equal<Integer.IsZero<9>, false>>,

  // Integer.Less
  Expect<Equal<Integer.Less<2, 1>, false>>,
  Expect<Equal<Integer.Less<-1, 2>, true>>,
  Expect<Equal<Integer.Less<-1, 0>, true>>,
  Expect<Equal<Integer.Less<2, 0>, false>>,
  Expect<Equal<Integer.Less<0, 3>, true>>,
  Expect<Equal<Integer.Less<0, 0>, false>>,
  Expect<Equal<Integer.Less<2, 2>, false>>,
  Expect<Equal<Integer.Less<-2, -2>, false>>,

  // Integer.Opposite
  Expect<Equal<Integer.Opposite<-2>, 2>>,
  Expect<Equal<Integer.Opposite<0>, 0>>,
  Expect<Equal<Integer.Opposite<20>, -20>>,

]
