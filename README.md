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

####Temporal Dead Zone

You cant access the variable you have used in your code until it is declared. Sounds weird. 

```let``` is not hoisted, however, memory is allocated when it is compiled. You'll then get a reference error if you try to use that varible before it's been declared. It's much preferred over getting ```undefined``` with ```var```.

Again, ```let``` adds to the predictablity and readability of your code.

###const

```const``` as the name suggests is a constant value. Any attempt to reassign the value results in an syntax error. Any redeclaration throws an error.

```const``` and ```let``` affords more information to the software engineer, rather than seeing 'var' everywhere.

```const``` is block scope just like ```let```.

##Strings

Strings now allow templating. We used to concat strings manually using the ```+``` operator. Now we can use the ```\``` back tick instead of a single or double quote. In that string we can insert varaibles using ```${myVar}```

##Arrow functions

Example with one parameter. If a function needs to provide an iterator when the user does not pass one in, this will be handy

```
let identity = identity => identity;
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

Just like PHP you can now set default values for parameters.

```
let formatBalance = (balance = 0, name = 'Unknown', currency = '£') => 
  `${name}, your balance is ${currency}${balance}`;
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

```setTimout``` or ```setInterval``` used to be awkward where we either had to bind the callback function or create a reference such as ```var that = this```. Now we can use an arrow function and the context is maintained.

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

##Modules

A module is a single object or a function in a file. The code in the file is made available by the ```export``` keyword.

##Coming soon

Classes, Collection maps and Weakmaps, Objects, Promises, Iterators and Generators

##Resources

- [ECMAScript wiki](http://wiki.ecmascript.org/doku.php)
- [Frontend Masters ES6 course](https://frontendmasters.com/courses/jsnext-es6)
- [Exploring ES6](http://exploringjs.com/es6/)

