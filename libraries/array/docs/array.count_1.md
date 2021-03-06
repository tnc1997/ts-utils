<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@ts-utils/array](./array.md) &gt; [count](./array.count_1.md)

## count() function

Returns the number of values in an array that satisfy a condition.

<b>Signature:</b>

```typescript
export declare function count<T>(array: T[], callback: (value: T) => boolean): number;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  array | <code>T[]</code> | the array to count the values of |
|  callback | <code>(value: T) =&gt; boolean</code> | the function to test each value for a condition |

<b>Returns:</b>

`number`

the number of values in the array that satisfy the condition

