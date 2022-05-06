const {compose, Some, id, curry, fmap, join, prop} = require('./lib')

// const some10 = Some(10) // Some 10

// closed operation
// Increment :: number -> 
const inc = a => a + 1
const twice = a => a * 2

// some10.map(inc) // Some 11
// Some.of(10).map(inc) // Some 11

// Pointed functor
// Array.of(1, 2, 3).map(inc) // [2, 3, 4]

// Some(10).map(id).value === Some(10).value // Some 10
// Some(10).map(x => inc(twice))
// Some(10).map(x => inc(twice(x))).value === Some(10).map(twice).map(inc).value // Some 22

// Point free style programing or tacit programming
// User defined functions must be produced based on the composition of other functions
// call points are implicit

// twiceAndIncrement :: numer -> number -> number
// ( f o g ) x = f(g(x))
// const twiceAndIncrement = x => inc(twice(x))

// compose2 ::(a -> b), (b -> c) -> a -> c
// const compose2 = (g, f, x) => g(f(x))
// operation2 :: number -> number
// const operation2 = x => compose2(inc, twice, x)

// operation3 :: number -> number
// const operation3 = x => compose(twice, inc, twice)(x)
// const operation3 = compose(twice, inc, twice)

// const incTwice = compose(twice, inc)

// Some(10).map(incTwice) === Some(10).map(twice).map(inc)

// fmap(incTwice, Some(10)) === Some(10).map(twice).map(inc)

const user = {
  address: {
    street: '123 Main St',
    city: 'New York',
  }
}

// functors
// getStreet :: User -> String
const getStreet = x => join(Some(user).map(x => x.address).map(x => x.street))
// getCity :: User -> String
const getCity = x => join(Some(user).map(x => x.address).map(x => x.city))

const getProperty = key => obj => obj[key]

const getStreetName = compose(
  join,
  fmap(x => prop(x)('address')),
  fmap(x => prop(x)('street')),
  Some,
)
console.log('Street:', getStreet(user))
console.log('StreetName:', getStreetName(user))
console.log('City:', getCity(user))