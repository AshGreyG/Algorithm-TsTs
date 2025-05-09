<div align="center">
  <h1>&lt;?:&gt;</h1>
</div>

# 👾 What is TsTs

TsTs (TypeScript Type System) is a turing-complete ~~language~~ that can do anything other 
normal languages do. For example, TsTs can emulate the operations between integers like:

``` ts
type Opposite<A extends number>
  = IsZero<A> extends true
    ? 0
    : `${A}` extends `-${infer OA extends number}`
      ? OA
      : `-${A}` extends `${infer OA extends number}`
        ? OA
        : never;
```

Recurse lets TsTs become a turing-complete language.

# 🚨 Notice

The `Integer` module of TsTs hasn't implemented methods of exponential numbers, hexadecimal
, octal, and binary. It's only served for decimals. It's different from JavaScript number
system, please be careful. Dealing with these numbers is **complicated** and **NOT worthful**.
You only need them as string format.

``` ts
type A = Integer.ToString<12>;    // "12"
type B = Integer.ToString<0x12>;  // "18", expected as "0x12" for me.
type C = Integer.ToString<1e+10>; // "10000000000"
```