[mech-library-link]: https://github.com/mechanismsjs/mech-library "Clone to easily create new mechanism libraries"
[mech-web-link]: https://github.com/mechanismsjs/mech-web "Web centric DOM mechanisms"
[mech-core-link]: https://github.com/mechanismsjs/mech-core "Core mechanisms"
[mech-math-link]: https://github.com/mechanismsjs/mech-math "Math mechanisms"
[mech-guid-link]: https://github.com/mechanismsjs/mech-guid "Mechanisms for guids"
[mech-home-link]: https://github.com/mechanisms/mech "Home repository for mechanisms"
[mech-emit-link]: https://github.com/mechanismsjs/mech-emit "Mechanisms for emitting data"

# mech-core

A library of core mechanisms. See [Mechanisms Home][mech-home-link] for more information and other libraries.

# In This Library

* *[filter](#filter-mechanism)* - Filter items emitted from a source based on configured algorithm using each emitted item.
* *[loop](#loop-mechanism)* - Loop a maximum number of times or until undefined.
* *[map](#map-mechanism)* - "Calls a defined callback function (policy) on each element of an array, and returns an array that contains the results".
* *[num](#num-mechanism)* - a numeric primitive as a mechanism.
* *[numM](#num-mechanism)* - a numeric primitive whose value can be a mechanism.
* *[parentPropSet](#parentpropset-mechanism)* - Sets the first instance found of given parent property.
* *[propGet](#propget-mechanism)* - returns the property of a mechanism.
* *[propSet](#propset-mechanism)* - sets the property of a mechanism.
* *[reduce](#reduce-mechanism)* - Applies the configured algorithm to itself reducing it to a single result.
* *[str](#str-mechanism)* - a string primitive as a mechanism.
* *[strM](#str-mechanism)* - a string primitive whose value can be a mechanism.
* *[writeLn](#writeln-mechanism)* - writes text to the console.


## <a name="filter-mechanism"></a> Filter Mechanism

The filter mechanism is similar to an [emitter][mech-emit-link] in that each invocation emits the next **filtered** value.

```javascript
var filter = m.filter(
  m.eqlNum(0,
    m.modulus(m.parentPropSet("fv", m.emitFromRange(1,2000,1)), 2)
  )
);
```
Invoking go on the filter causes the next **filtered** value to return:

```javascript
filter.go; // returns 2
filter.go; // returns 4
filter.go; // returns 6
filter.go; // returns 8
```

### The Filter Explained

The filter is reading from an emitted range:

```javascript
m.emitFromRange(1,2000,1)
```

The emitted value is used twice: once in the modulus comparison and then once as the return value if it passes the filter. In the above example, the reference to the *emitFromRange* instance is only accessible within the *modulus* instance. *modulus* is returning the modulus of the emitted value, not the emitted value itself.

To get around this, the filter mechanism is designed to return whatever value is located in the filter.fv property whenever invocation of goBool on the internal mechanism returns true.

This example uses the *parentPropSet* mechanism although [cell scoping][mech-scope-cell-link] could also be used. That is an example for another post.

```javascript
m.parentPropSet("fv", m.emitFromRange(1,2000,1,true))
```

So, in this case, the value emitted from the range is written to the fv property of the filter and the value is also passed up to the modulus mechanism (the parent mechanism).

This gives us the ability to configure any type of filter we want and we can filter on an source: even ones that don't have a known length (like a socket stream).


## <a name="loop-mechanism"></a> Loop Mechanism

Loop (items, max) calls 'go' on each item in *items* until *max* is reached or *item.go* returns undefined.

### For Loops

Traditionally, we use something like a loop to traverse an array:

```javascript
var arr = ["Hi,", "how", "are", "you?"];
for(var i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

In this case, the for loop pushes data, located in a variable named *i*, into the forloop's scope. This gives *console.log(arr[i])* access to *i*.

Mechanisms pull data from other mechanisms. We use a loop and an [emitter][mech-emit-link] to write out the elements in an array:

```javascript
m.loop(
  m.writeLn(
    m.emitFromArr(["Hi,", "how", "are", "you?"])
  )
).go;
```

Different usages of loop:

```javascript
m.loop(m.emitFromArr([3, 4, 8]), 2).go; // returns 4
m.loop(m.emitFromArr([3, 4, 8]), 1).go; // returns 3
m.loop(m.emitFromArr([3, 4, 8])).go; // returns 8
m.loop().go; // returns undefined
m.loop(undefined).go; // returns undefined
m.loop([3,4,8],0).go; // returns undefined
```
## <a name="map-mechanism"></a> Map Mechanism

Traditionally, mapping in javascript is done as follows:

```javascript

// javascript traditional
[1,2,3,4,5].map(
   function(n) {
     return n + 2;
 });
```

This is the "push-pull" approach to programming: we "push" data into the algorithm and pull a result.

Mechanisms use a "pull" approach to programming: an algorithm "pulls" the data into itself. Let's see what that looks like:

```javascript
// javascript mechanisms
m.map(
  m.add(
    2,
    m.emitArr([1,2,3,4,5])
  )
).go;
```

In his case, map returns an array by calling add until there is nothing left to emit.

The resulting array is:

```javascript
[3,4,5,6,7]
```

Basically, a map mechanism simply calls the emitter until undefined is reached or the maximum number of elements has been reached. A maximum number of elements is required because an emitter can emit an infinite range of values such as:

```javascript
m.emitRange(1,Infinity,23);
```

How about two emitters of different lengths:

```javascript
m.map(
   m.add(
      m.emitRange(1,4,1),
      m.emitArr([1,2,3,4,5])
   )
).go;
```

The resulting array is:

```javascript
[2,4,6,8]
```

We can emit strings:

```javascript
m.map(
   m.addS(
      m.emitArr(["hello","goodbye","begin","end"]),
      "ay"
   )
).go;
```

The resulting array is:

```javascript
["helloay", "goodbyeay", "beginay", "enday"]
```

If we swap arguments we get:

```javascript
m.map(
  m.addS(
    "ay",
    m.emitArr(["hello","goodbye","begin","end"])
  )
).go;
```

The resulting array is:

```javascript
["ayhello", "aygoodbye", "aybegin", "ayend"]
```

We can repeat a sequence:

```javascript
m.map(
  m.mul(
    2,
    m.emitArr([2,4,6],true)
   ),
  7
).go;
```

Will result in:

```javascript
[4,8,12,4,8,12,4]
```

We've added true to the emitArr so it repeats. We've limited the maximum number of elements in our map to 7.

Let's repeat two sequences of different lengths 20 times:

```javascript
m.map(
  m.add(
    m.emitArr([0,2],true),
    m.emitArr([1,3,5],true)
   ),
  20
).go;
```

We can start to get cool patterns:

```javascript
[ 1, 5, 5, 3, 3, 7, 1, 5, 5, 3, 3, 7, 1, 5, 5, 3, 3, 7, 1, 5 ]
```

## <a name="num-mechanism"></a>num and numM Mechanisms

Although you can use literals when programming, we also offer a numeric mechanism.

* *m.num(val)* - a numeric primitive as a mechanism.
* *m.numM(mech)* - a numeric primitive whose value can be a mechanism.

```javascript
m.num(5).go; // returns 5;
m.num(6).goStr; // returns "6"
m.num(-5).goBool; // returns false
m.num("Hello").go; // returns NaN
```

```javascript
m.numM(m.str("12")).go; // returns 12;
```
## <a name="parentpropset-mechanism"></a> parentPropSet Mechanism

Sets the first instance found of given parent property.

### Parents

Mechanisms (see *left* and *right* below) when used in another mechanism (see *add*) become children of that mechanism.

```javascript
var left = m.numM(5);
var right = m.numM(6);
var add = math.add(left, right);
```

*Left* and *right* end up with a *_parDir* property that is a reference to their parent: in this case the *add* mechanism.

*parentPropSet* allows a child mechanism to set the property of a parent.

### Examples






## <a name="propget-mechanism"></a> propGet Mechanism

Returns the property of a mechanism or object.

m.propGet(name, mech, run)

* *name* - the property name which can be a literal primitive or a mechanism (name.goStr is called)
* *mech* - the mechanism we want to read the property from.
* *run* - when true (default), the property read will be on the result of calling *mech.go*.

Traditionally:

```javascript
var obj { x: 5, y: "23" };
console.log(obj[x]);
console.log(obj.x);
```

Using propGet

```javascript
var obj { x: 5, y: "23" };
m.propGet("x", obj).go; // returns 5
```

### Examples

Using a mechanism for name and reading the property "value" from a dom element named "inpu05".

```javascript
m.propGet(
  m.str("value"), // on elemById().go
  m.elemById("inp05")
);
```

When run is false, the "go" property of m.elemById(...) instance is read.

```javascript
m.propGet(
  "go", // on elemById
  m.elemById("inp05"),
  false
);
```


## <a name="propset-mechanism"></a> propSet Mechanism

Sets the property of a mechanism or object.

Traditionally:

```javascript
var obj { x: 5, y: "23" };
obj[x] = 23;
obj.y = 45;
```

Using propSet

```javascript
var obj { x: 5, y: "23" };
m.propSet("x", obj, 6).go; // sets x to 6 and returns 6
```

m.propGet(name, mech, run)

* *prop* - the property name which can be a literal primitive or a mechanism (name.goStr is called)
* *dest* - the mechanism whose property we want to set.
* *src* - the src can be a literal primitive or a mechanism (src.go is called).
* *run* - when true (default), *dest.go* is invoked and the *prop* of the resulting value is set.


### Examples

Using a mechanism for name and setting the property "value" from a dom element named "inpu05" to "hello".

```javascript
m.propSet(
  "value",
  m.elemById("inp05"),
  "hello"
);
```


## <a name="reduce-mechanism"></a> reduce Mechanism

Given a dual-argument algorithm, the reduce mechanism invokes the algorithm until undefined is returned by that algorithm.

```javascript
var reduceAdd = m.reduce(
  m.add(
    null,
    m.emitFromArr([1, 5, 7])
  )
);

reduceAdd.go; // returns 13
```

*add* is a dual argument algorithm. The emitter is configured on the *right* (2nd argument) and *null* configured on the *left* (1st argument).

*Reduce* places the first emitted value in the *right* argument: which is why *right* is null.

The *reduce* mechanism continues to reduce until undefined is emitted.

```javascript
var reduceAdd = m.reduce(
  m.add(
    null,
    m.emitFromArr([1, 5, 7, undefined, 22, 34, 56])
  )
);

reduceAdd.go; // returns 13
reduceAdd.go; // returns 125
reduceAdd.go; // returns 125
```

Invoking reduce again will cause reduce to continue reducing from it's prior state.

Consider a socket emitter that periodically returning numerical values.

```javascript
var avgSock = m.reduce(
  m.avg(
    null,
    m.emitFromSocket('http://source', 423)
  )
);
```

Invoking *avgSock* will read from and reduce the data coming from the stream until no more data is available.

Invoking *avgSock* at a latter time would continue the averaging process (in a callback on the socket for example).

Finding the largest value:

```javascript
var largest = m.reduce(
  m.gt(
    null,
    m.add(
      6,
      m.emitFromArr([47,11,42,102,13])
    )
  )
);

largest.go; // 108
```

In the above example, add is adding 6 to every emitted value before the reducer applies the reduction algorithm: hence why 108, instead of 102, is the largest value.

## <a name="str-mechanism"></a>str and strM Mechanisms

Although you can use literals when programming, we also offer a string mechanism.

* *m.str(val)* - a string primitive as a mechanism.
* *m.strM(mech)* - a string primitive whose value can be a mechanism.

```javascript
m.str("hi").go; // returns "hi";
m.str("hello").goStr; // returns "hello"
m.str("true").goBool; // returns true
m.str("what").goBool; // returns false
```

```javascript
m.strM(m.num(32)).go; // returns "32";
```

## <a name="writeln-mechanism"></a>writeLn Mechanism

Writes text to the console.


```javascript

// writes "hi" to the console.
m.writeLn("hi").go;

// writes "(4 + 5)" to the console.
m.writeLn(
  m.add(4 , 5)
).go;
```

## Using In Your Projects

Change directory to your node project.

    $ npm install mech-core --save

## Development

## Get Involved!

There are **a lot** of core mechanisms to add. Many of them can be created in a few hours including in-depth tests. Clone [mech-library][mech-library-link] to get started!

### Setup

### Setup

Install:

    $ npm install

Continuous test:

    $ gulp

Test:

    $ gulp webtests
