// This exercise is based on and is to accompany:
// https://medium.com/@tzehsiang/javascript-functor-applicative-monads-in-pictures-b567c6415221

// Define a function that we wish to use in different contexts:
// (Note the polymorphic nature of the function)
const plus3 = ( x ) => ( x + 3 );
console.log( plus3( 2 ));

// Using one of JavaScripts native type constructors: [], {}, () => {}, etc.
//
const Just = ( x ) => [ x ];
const just2 = Just( 2 );
console.log( just2 );

// Uh-Oh!
console.log( plus3( just2 ));
console.log([ 2 ] + 3);

// How about...
console.log(Just( 2 ).map( plus3 ));
console.log(Just( 2 ).map( plus3 ).toString() === Just( 5 ).toString());

// Applying addThree to an empty box gives us back an empty box without ever
// calling addThree.
console.log( [].map( plus3 ));

// To illustrate:
const addThreeAndPrintValue = ( x )=> {
    let result = x + 3;
    console.log( result );
    return result;
}
// The second of the following two statements does not print its intermediate result.
console.log([ 2 ].map( addThreeAndPrintValue ));
console.log( [].map( addThreeAndPrintValue ));

// Let's try to compose plus3 with another function, say plus2:
const compose = (f, g) => (x) => f(g(x));
const plus2 = ( x ) => ( x + 2 );
console.log( compose( plus2, plus3)(10));

// Next Level: Applicatives
// Or... What happens when we wrap the functions.

// Map was native in JavaScript's implementation of Arrays. No such luck
// for applicatives. Time to modify the built-ins.

Array.prototype.ap = function(wrappedVals) {
    let results = [];
    for (let i = 0; this.length; i++) {
        //this[i] are pure functions without side effects
        results.push( wrappedVals.map( this[i] ));
    }
    return results;
}

// Here is a curried version of a function to add two numbers:
const add = ( x ) => ( y ) => ( x + y );
const wrapped2 = [ 2 ];
const wrapped3 = [ 3 ];
// Once again...failure.
console.log( add( wrapped2, wrapped3 ));
// Map only works on one value at a time, how to make it work on both?
const wrappedPlus3 = [ add( 3 ) ];
// Now we have a wrapped, single-input function which we can feed to map (err... ap).
console.log( wrappedPlus3.ap( wrapped2 ));
// console.log( wrappedPlus3.ap( [ undefined ] ));
