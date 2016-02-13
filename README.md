#ES6 or ECMA Script 6 or ES 2015.

[es6fiddle.net](http://www.es6fiddle.net/) is a great resource to try things out in a browser. Check out [the comtability tables](http://kangax.github.io/compat-table/es6/) too. 

##Tail Call

Doing recursive calls in Javascript eats up the memory as each call is added onto the call stack. Asymptotically it is O(n). That is because Javascript is not a proper tail recursive language. That is until now. Proper tail recursion causes no memory increase over time when a recursive function is called. In current browsers a recursive function would break if it called itself ~10K. With proper tail call language the asymptotic behaviuour is O(1).

<dl>
  <dd>Tail position</dd>
  <dt>The last instruction to fire before the return statement</dt>
  <dd>Tail call</dd>
  <dt>An instruction in a tail position that is a function call</dt>
  <dd>Close call</dd>
  <dt>A call that looks like a tail call but isnt. It maintains the stack as in return 1 + myMethod()</dt>
</dl>

The main thing to keep in mind when doing recursion is to pass everything to the recursive function - don't leave a scope reference as that will add to the call stack.

At the moment it is not very widely supported at all :'(

##Variables - Var, Let and Const

###var

You have to understand what ```var``` does before you understand ```let``` and ```const```. ```var``` is hoisted to the top of the function it is defined in during the compilation stage and it is function scope. 

Redeclaring the same variable with ```var``` is a no-ops, meaning it skips the step of allocating disc space for the variable and continues on to assigning a value to it.

###let

```let``` has a block level scope, rather than function scope. It is ideal in for loops or "flag" variables as it is not hoisted like ```var```.

Redefining a variable with let throws an error:

```
let a = 0;
let a = 1;
//Syntax error, identifier has already been declared
```

Using ```let``` over ```var``` is preferred as it makes your code mirror how it is going to be compiled.

###const

```const``` as the name suggests is a constant value. Any attempt to reassign the value results in an syntax error. Any redeclaration throws an error.

```const``` and ```let``` affords more information to the software engineer, rather than seeing 'var' everywhere.

```const``` is block scope just like ```let```.

####Temporal Dead Zone

You cant access the variable you have used in your code until it is declared. Sounds weird. 

```let``` is not hoisted, however, memory is allocated when it is compiled. You'll then get a reference error if you try to use that varible before it's been declared. It's much preferred over getting ```undefined``` with ```var```.

Again, ```let``` adds to the predictablity and readability of your code.

##Strings

Strings now allow templating. We used to concat strings manually using the ```+``` operator. Now we can use the ```\``` back tick instead of a single or double quote. In that string we can insert varaibles using ```${myVar}```

A cool method on a string is ```repeat```, which, as the name suggests, repeats the string the specified number of times:

```
"Bart simpson says I must write this 10 times".repeat(10);
```

##Rest parameters

You know how we have always had access to the ```arguments``` object, which is kind of like an array, but not quite? Rest params are so much better than arguments.

We used to have to do ```var args = Array.prototype.slice.call(arguments);``` to get an actual array of arguments. The rest param is so much better. Now all we do is name our param but prefixed by a ```...```. As in:

```
let showArgs = (...args) => args;
```

###Caveats

Rest params must be the last in a list of parameters. When it is used it has reference to all the arguments after the last named argument. 

You can't use more than one either.

You can't use it with ```arguments``` - its either one or the other.

No default values.

##Spread operators

The spread operator is ```...```. Looks familiar huh? It is used before an array to pull each value out. It saves you from manually targeting elements of an array.

Instead of using ```apply``` with an array:

```
let multiply = (a, b) => a * b;
multiply.apply(null, [5, 5]);
```
... you can just call the function:

```
let args = [5, 5];
multiply(...args);
```

##Default parameter values

Just like PHP you can now set default values for parameters. If any parameter is falsy, it is set to the default.

```
let formatBalance = (balance = 0, name = 'Unknown', currency = '£') => 
  `${name}, your balance is ${currency}${balance}`;
```

This saves us from having to do things like:

```
function myFunction (a, b) {
  a = a || 0;
  b = b ? b : 0;
  //...
}
```

Default parameters are lexically scoped too:

```
let count = 0;
let increment = (i = count) => {
  let count; //lexically scoped
  return ++count;
}

increment(); //NaN
```

You can also set a default value to a function call. 

##Caveats

You can't set a default on a Rest param, so no doing:

```
function myFunction (...args = [1,2,3]) { ...
```

Default values do no get included in the arguments object:

```
function myFunction (a = 1, b = 2, c = 3) {
  console.log(arguments.length);
}

myFunction(); //0
```

##Destructuring

"Destructuring allows you to bind a set of variables to a corresponding set of values anywhere that you can normally bind a value to a single variable"

Destructuring objects and arrays. With objects we destructure by taking attributes and their values. The thing being destructured MUST be an object.

###Objects

```
let getUserById = id => {
  return {
    name: 'Sally',
    age: 26,
    location: 'Los Angeles'
  };
};

//Destructuring
let {name, age, location} = getUserById(1);

//Old style
//let user = getUserById(1); //so it would be user.name, user.age

console.log(`${age} year old ${name} from ${location}`);
```

Now we have braces on the LHS assignment. The "Destructuring Pattern" is the ```{name, age, location}```. The variables in the destructure must reference the attributes targeted in the object.

If you want different names to those in the object you can do it by specifying the actual name then a colon followed by the alias:

```
let {name: n, age: a, location: l} = getUserById(1);
console.log(`${a} year old ${n} from ${l}`);
```

If a function takes an object as a parameter then you can target variables that way too:

```
let doSomethingWithUserObject = ({name, age, location}) => {
  ...
}
```

Even better with default values:

```
let formatBalance = ({ balance: b = 0, name: n = 'Unknown', currency: c = '£'}) => 
  `${n}, your balance is ${c}${b}`;

formatBalance({ balance: 10 });
```

###Arrays

Similar to Objects we target array elements by their position, and use the square bracket indicating an array rather than a curly brace for an object.

```
let winners = ['Peter', 'Paul', 'Mary', 'Jack', 'Sally', 'Jon'];
let [winner, second, third,,, last] = winners;
console.log(winner, second, third, last);
```

##Arrow functions

This implementation is based on Coffeescript. Coffeescript has two versions of arrow functions - skinny and fat arrows.

An Arrow function is an anonymous function, meaning it is best not to use it as a method or anywhere you refer to "this".

Use parentheses for a function that takes no parameters. If we don't use curly braces for the function body the expression after the ```=>``` is returned. In the case below, ```null``` is always returned:

```
let myFunction = () => null;
```

If we are passing one parameter we can omit the parenthesis. This is optional though.

```
let myFunction = val => null;
myFunction = (val) => null;
```

If we are passing multiple parameters:

```
let myFunction = (a, b, c) => null;
```

If we are using Rest params we must wrap it in parentheses:

```
let myFunction = (...params) => params;
```

The return values for all of the above can be exchanged with curly braces and a return statement.

```
let myFunction = (...params) => {
  return params;
};
```

Arrow functions by default bind the parameter this to the lexical context. What this means is Arrow functions do not have their own "this", instead it is inherited from the "surrounding" scope.

Briefly, the parameter "this" refers to 5/6 things: 

 1. Global context
 2. Function context (which is global)
 3. A method i.e. the "this" refers to the thing to the left of the dot
 4. "call", where the parameter this is the first argument
 5. "apply", just like #4
 6. "bind", similar to #4 and #5 where the argument is the object to be bound

The timers ```setTimout``` or ```setInterval``` used to be awkward where we either had to bind the callback function or create a reference such as ```var that = this```. Now we can use an arrow function and the context is maintained.

This binding can be awkward. With the example below we are adding a method on an object called 'bob'.

```
let bob = {
  name: "Bob",
  sayHello: function () {
    return `Hi, I'm ${this.name}`;
  }
};

bob.sayHello(); //returns "Hi, I'm bob"
```

If we tried it with an Arrow function we would get an error:

```
let bob = {
  name: "Bob",
  sayHello: () => {
    return `Hi, I'm ${this.name}`;
  }
};

bob.sayHello(); //Throws an error
```

Lets try it with a constructor function. This works:

```
let Person = function (name) {
  this.name = name;
  this.sayHello = () => {
    return `Hi, I'm ${this.name}`;
  }
};

let bob = new Person('bob');
bob.sayHello(); //returns "Hi, I'm bob"
```

Now lets try it with ```bind```:

```
let Person = function (name) {
  this.name = name;
  this.sayHello = function () {
    return `Hi, I'm ${this.name}`;
  }
}

let bob = new Person('bob');
let bill = new Person('bill');
bob.sayHello(); //Hi, I'm bob
bob.sayHello.bind(bill)(); //Hi, I'm bob
```

We can see that ```bind``` doesn't do as we thought. That's because you can't alter the ```this``` on Arrow functions.

So the rule is to still use ```function``` when it is suitable. I'm just going to use ```function``` as methods rather than Arrow functions, unless I really don't want the ```this``` parameter to be overridden.

##Classes

I was asked in an interview recently if I used "classical inheritance" using ES6 Class or whether I used prototypal inheritance and which one was better. I blushed and was slightly confused. ES6 Class is "syntactical sugar" around prototype-based inheritance. The guy didn't really know what he was talking about so I didn't take the job - imagine all that terrible code to inherit, shudder.

So you know that functions can be used as a constructor, so that it takes the parameter this, constructs a new object, sets it to 'this' and returns it. The convention is that we name the constructor function with an Uppercase first letter so we can distinguish between a function and a constructor function. Now, we can use the class keyword. So instead of this:

```
function Animal () { ...
```

we can do:

```
class Animal { ...
```

A class has a constructor function, called ```constructor```.

```
class Animal {

  constructor (type) {
    this.type = type;
  }

}
```

If you don't specify a constructor, it will look through any parent classes, if none then it goes defaults to creating an object and returning it.

Methods are added like this:

```
class Dog {

  constructor (name) {
    this.name = name;
  }

  annoy () {
    return "Bark ... ".repeat(10);
  }

}

```

If you want to overide a method and then call the parent method you do so with the ```super``` keyword:

```
communicate () {
  return super.communicate('woof woof') + '!!';
}
```

Unlike function declarations, Classes aren't hoisted so you have to declare it first. 

###Getters

So a getter is a function that returns a value, but you don't call it like a normal function using parenthesis, you just use the property name:

```
class Animal {

  constructor (type) {
    this.type = type;
  }

  get type () {
    return this.type;
  }

}

let dog = new Animal('mamal');
console.log(dog.type);

```

###Setters

Setters as the name suggests, sets values. It is used just like the getter, a function corresponds to a value. There is reason for caution with setters though. Let's say we had the setter below on the Animal class:

```
  set type (type) {
    this.type = type;
  }
```

This would cause an infinite loop, throwing a Range error - maximum stack size exceeded.

##Symbols

There is a new datatype in Javascript, the Symbol. I didn't grok symbols straight away, but they are pretty cool. Symbols are unique and immutable. They key thing is "unique", never giving you the same one twice. 

A great use for Symbol is private variables in classes:

```
let Animal = (() => {

  let animalType = Symbol('type');

  return class Animal {
    
    constructor (name, type) {
      this.name = name;
      this[animalType] = type;
    }

    get type () {
      return this[animalType];
    }

  }

}());

let a = new Animal('dog', 'mamal');
console.log(a.name);
console.log(a.type);
a.type = 'reptile'; //Type error

```

###References

 - [Mozilla docs](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

##Class Inheritance

You can easily extend a class by using the ```extends``` keyword, followed by the ancestor:

```
class Dog extends Animal {

  constructor (name) {
    super('Dog', 'mamal');
    this.name = name;
  }

  bark () {
    return this.communicate('woof woof');
  }

}
```

##Promises

So we've all used libraries like Q or Bluebird - and Promises in jQuery - so the ES6 Promise is a welcome addition to the language. I mean, they are great, but not as great as Observables in Functional Reactive Programming.


###The Promise constructor

To create a promise, you need to pass in the function which takes to parameters, one to handle a successful operation and an error handling function:

```
return new Promise((resolve, reject) => {
```

###The Promise Instance

A promise can be in 1 of 4 states:

 - fulfilled: resolved - 1
 - rejected: 2
 - pending: either rejected or resolved hasn't happened yet - undefined
 - settled: either rejected or resolved has occured - 1 or 2

Once you get a promise returned, you call the then the ```then``` method, takes in your resolve, reject functions: 

```
funcThatReturnsPromise()
  .then(result => {
    return result + ' worked';
  }, error => {
    return 'didn\'t work';
  };
```

You can do chaining too. If you want to do something with the resolved data you can pass it on:

```
funcThatReturnsPromise()
  .then(function (result) {
    return result + ', chained once';
  })
  .then(function (result) {
    return result + ', chained twice';
  })
  .then(function (result) {
    return result + ', chained thrice';
  })
  .then(function (result) {
    result.should.eql('later, chained once, chained twice, chained thrice');
  })
  .catch((reason) => {
    return reason;
  });
```

Notice that you can put your reject handler in the ```.catch``` method too. If anything breaks along the chain, it "bubbles up" and is caught in the last catch.

###Promise.all

Promise.all takes an array of promises/functions that return a promise, and waits for all of them to complete. The result of which is an array containing all the values returned from the promises:

```
Promise.all([app.promise.later(), app.promise.later(), app.promise.later()])
  .then((values) => {
    //values should equal ['later', 'later', 'later']
  });
```

If any of them fail then you can catch it as before.

###Promise.race

Promise.race takes an array of promises/functions that return a promise, and uses the first promise that has completed in the resolve function:

```
Promise.race([app.promise.slow(), app.promise.medium(), app.promise.fast()])
  .then((result) => {
    // result should equal 'fast!'
  });
```

##Modules

A module is a single object or a function in a file. The code in the file is made available by the ```export``` keyword. 

It has features from common.js and AMD. It has cycical dependancies, so if you load two or more modules that depend on each other then that is OK.

###Import and export

The ```export``` object is just that, an object. It can be a function object, and you can attach other things to that object.

```
export 
```

To set the default export:

```
class Animal {
  constructor () {}
};
export default Animal;
```

Aliasing: 

```
class Animal {
  constructor () {}
};
export {Animal as Creature};
```

To import:

```
import Animal from 'Animal';
```

You can use aliases.

```
import { concat, reduce } from 'underscore';
```

```
import * as _ from 'underscore';
```

##Programatic Loading - System.import

It's based on Promises.

```
System.import('Animal').
  then(Animal => {
    //...
  }).
  catch(error => {
    //...
  });
```

System methods:

 - System.import(module) //returns Promise
 - System.module(module, options) //returns Promise
 - System.set(name, module) //register a new module
 - System.define(name, source, ...options) //

The module tag: <module import="animal.js"></module>


##Collections - Maps, Sets and Weakmaps

###Set

A set data structure is a collection, like an array, however it's values are unique.

To create an instance of a set:

```
let alphabet = new Set();
alphabet.add('a');
alphabet.add('b');
...
```

or you can pass an array as a param to be used for the set:

```
let alphabet = new Set(['a', 'b', 'c', 'd']);
```

Set methods:

```
alphabet.size; //26
alphabet.has('a'); //true
alphabet.has(2); //false
alphabet.delete(2); //false
alphabet.clear(); //resets the collection
```

##Map

Map is a key/value object. 

```
let teamA = new Map();
```

Map methods:

```
teamA.set('Bob Smith', 'Striker');
```

You can use objects as the key:

```
let bobSmith = {
  name: 'Bob Smith',
  age: 32
};
teamA.set(bobSmith, 'Striker');
```

##Weakmap

Weakmap is like a map but different. It doesn't keep track of the values inside. The key thing with a WeakMap is its keys and garbage collection. You can't have primitive values for keys, only objects. And if the WeakMap sees that one of its keys is the only reference to an object, then it will garbage collect it.

```
let teamA = new WeakMap();
```

##Resources

- [ECMAScript wiki](http://wiki.ecmascript.org/doku.php)
- [Frontend Masters ES6 course](https://frontendmasters.com/courses/jsnext-es6)
- [Exploring ES6](http://exploringjs.com/es6/)
- [Smashing magazine](http://www.smashingmagazine.com/2015/10/es6-whats-new-next-version-javascript/)
- [es6 and node compatibility](https://leanpub.com/understandinges6/read/#leanpub-auto-browser-and-nodejs-compatibility)
- [Mozilla deveoper](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla)
- [Mozilla hacks arrow functions](https://hacks.mozilla.org/2015/06/es6-in-depth-arrow-functions/)
- [ES6 Katas](http://es6katas.org/)
- [brendaneich.com](https://brendaneich.com/tag/javascript-ecmascript-harmony-coffeescript/)
- [uxebu.com](http://www.uxebu.com/blog/2015/06/learn-ecmascript-6-in-a-different-way/)
- [wintellect.com](http://www.wintellect.com/devcenter/nstieglitz/5-great-features-in-es6-harmony)
- [lukehoban on Github](https://github.com/lukehoban/es6features/blob/master/README.md)
- [coryrylan.com](http://coryrylan.com/blog/javascript-es6-class-syntax)
