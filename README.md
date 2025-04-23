<div style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
  <p style="font-weight: bold; font-size: 40pt; color: #ea999c">&lt;</p>
  <p style="font-weight: bold; font-size: 40pt; color: #ca9ee6">?</p>
  <p style="font-weight: bold; font-size: 40pt; color: #81c8be">:</p>
  <p style="font-weight: bold; font-size: 40pt; color: #8caaee">&gt;</p>
</div>

# 👾 What is TsTs

TsTs (TypeScript Type System) is a turing-complete ~~language~~ that can do anything other 
normal languages do. For example, TsTs can emulate the operations between integers like:

``` ts
export type Add<A extends number, B extends number>
  = A extends Opposite<B>
    ? 0
    : IsPositive<A> extends true
      ? IsPositive<B> extends true
        ? [...Array.CreateArrayFromLength<A>, ...Array.CreateArrayFromLength<B>]["length"]
        : IsNegative<B> extends true
          ? Great<A, Opposite<B>> extends true
            ? PositiveMinus<A, Opposite<B>>
            : PositiveMinus<Opposite<B>, A> extends number
              ? Opposite<PositiveMinus<Opposite<B>, A>>
              : never
          : A
      : IsNegative<A> extends true
        ? IsNegative<B> extends true
          ? [...Array.CreateArrayFromLength<Opposite<A>>, ...Array.CreateArrayFromLength<Opposite<B>>]["length"] extends number
            ? Opposite<[...Array.CreateArrayFromLength<Opposite<A>>, ...Array.CreateArrayFromLength<Opposite<B>>]["length"]>
            : never
          : IsPositive<B> extends true
            ? Less<Opposite<A>, B> extends true
              ? PositiveMinus<B, Opposite<A>>
              : PositiveMinus<Opposite<A>, B> extends number
                ? Opposite<PositiveMinus<Opposite<A>, B>>
                : never
            : A
        : B;
```

Recurse lets TsTs become a turing-complete language.