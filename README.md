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

* *[loop](#loop-mechanism)* - Loop a maximum number of times or until undefined.
* *[map](#map-mechanism)* - "Calls a defined callback function (policy) on each element of an array, and returns an array that contains the results". 
* *[num](#num-mechanism)* - a numeric primitive as a mechanism.
* *[numM](#num-mechanism)* - a numeric primitive whose value can be a mechanism.
* *[parentPropSet](#parentpropset-mechanism)* - Sets the first instance found of given parent property.
* *[propGet](#propget-mechanism)* - returns the property of a mechanism.
* *[propSet](#propset-mechanism)* - sets the property of a mechanism.
* *[str](#str-mechanism)* - a string primitive as a mechanism.
* *[strM](#str-mechanism)* - a string primitive whose value can be a mechanism.

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

## Using In Your Projects

Change directory to your node project.

    $ npm install mech-core --save

## Development

## Get Involved!

There are **a lot** of core mechanisms to add. Many of them can be created in a few hours including in-depth tests. Clone [mech-library][mech-library-link] to get started!

### Setup

Install:

    $ npm install

Continuous test:

    $ gulp

Test:

    $ gulp mocha
