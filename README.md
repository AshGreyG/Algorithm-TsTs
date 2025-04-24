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