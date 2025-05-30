////////////////////////////////////////////////////////////////////
//                                                                //
// This String test file is auto-generated by "script/lib-gen.sh" //
//                                                                //
////////////////////////////////////////////////////////////////////

import String from "../lib/String";
import { Equal, Expect } from "../utils";

type CaseLibString = [
  // String.At
  Expect<Equal<String.At<"123456789", 0>, "1">>,
  Expect<Equal<String.At<"123456789", 2>, "3">>,
  Expect<Equal<String.At<"123456789", -3>, "7">>,
  Expect<Equal<String.At<"123456789", 100>, never>>,

  // String.Length
  Expect<Equal<String.Length<"abs">, 3>>,
  Expect<Equal<String.Length<"">, 0>>,
  Expect<Equal<String.Length<"2222_2222_2222_2222_2222">, 24>>,

  // String.Concat
  Expect<Equal<String.Concat<["12","ab"]>, "12ab">>,
  Expect<Equal<String.Concat<["love"]>, "love">>,
  Expect<Equal<String.Concat<[]>, "">>,

  // String.EndsWith
  Expect<Equal<String.EndsWith<"What?", "?">, true>>,
  Expect<Equal<String.EndsWith<"What?", "What?">, true>>,
  Expect<Equal<String.EndsWith<"What?", "SoWhat?">, false>>,
  Expect<Equal<String.EndsWith<"What?", "t?">, true>>,
  Expect<Equal<String.EndsWith<"What?", "W?">, false>>,
  Expect<Equal<String.EndsWith<"What?", "">, true>>,
  Expect<Equal<String.EndsWith<"", "test">, false>>,
  Expect<Equal<String.EndsWith<"", "">, true>>,
  Expect<Equal<String.EndsWith<"What?", "?", 5>, true>>,
  Expect<Equal<String.EndsWith<"What?", "t?", 3>, false>>,
  Expect<Equal<String.EndsWith<"", "", 2>, true>>,

  // String.SubString
  Expect<Equal<String.SubString<"LoveYouHuaier">, "LoveYouHuaier">>,
  Expect<Equal<String.SubString<"LoveYouHuaier", 4>, "YouHuaier">>,
  Expect<Equal<String.SubString<"LoveYouHuaier", 4, 9>, "YouHu">>,
  Expect<Equal<String.SubString<"LoveYouHuaier", 3, -2>, "eYouHuai">>,
  Expect<Equal<String.SubString<"LoveYouHuaier", -7, -2>, "uHuai">>,
  Expect<Equal<String.SubString<"LoveYouHuaier", 0, 0>, "">>,
  Expect<Equal<String.SubString<"LoveYouHuaier", -1, -1>, "">>,
  Expect<Equal<String.SubString<"LoveYouHuaier", 8, 7>, "">>,

  // String.Includes
  Expect<Equal<String.Includes<"AshGrey", "Ash">, true>>,
  Expect<Equal<String.Includes<"AshGrey", "A">, true>>,
  Expect<Equal<String.Includes<"AshGrey", "a">, false>>,
  Expect<Equal<String.Includes<"AshGrey", "">, true>>,
  Expect<Equal<String.Includes<"AshGrey", "Ash", 0>, true>>,
  Expect<Equal<String.Includes<"AshGrey", "Ash", 1>, false>>,
  Expect<Equal<String.Includes<"AshGrey", "Ash", -1>, true>>,

]
