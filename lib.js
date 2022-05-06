// Category - dot
// Morphism - arrow

// 1st Law - Functors Identity id :: a -> a
const id = a => a
// 2nd Law - Functors Composition x => f(g(x))
const compose = (...fns) => x =>  fns.reduceRight((acc, fn) => fn(acc), x)

// Functors
// lifting
// Some :: a -> Some a
const Some = value => {
  // map :: (a -> b) -> Some b
  const map = (fn) => Some(fn(value));
  return {
    inspect() { return `${value}` }, 
    value,
    map
  }
}

Some.of = (value) => Some(value)

const prop = key => obj => obj[key]

const curry = (fn, ...args) => fn(...args)
// fmap :: ((a -> b), Some a) -> Some b
const fmap = fn => curry(fn, someA => someA.map(fn))
// Join :: Some a -> a
const join = someA => someA.value

module.exports = {
  id,
  compose,
  Some,
  curry,
  fmap,
  join,
  prop
}