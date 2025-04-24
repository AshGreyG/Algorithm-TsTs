import Integer from "../Integer";

declare namespace BigInteger {

export type IsNegative<A extends number> = Integer.IsNegative<A>;

}