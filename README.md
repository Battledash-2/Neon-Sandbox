# ๐ Neon Lang ๐ก
#### v3.0.1-mod

# ***Deno update has been reverted. Deno was not working out an is generally slower.***

## What is Neon? (โน)
### Neon is a public and open source language (under the MIT license ยฉ).

## ๐ฉ Installation ๐
### To install Neon:
1) First, run `git clone https://github.com/Battledash-2/Neon` to clone the source code
2) Second, create a Javascript file named `run.js`
3) In the file, require the lexer, parser and interpreter in `/src`.
4) To initiate, use `new Interpreter().eval(new Parser(new Lexer('ANY CODE HERE')));`

### Alternatively:
1) Clone the source code (like shown above)
2) Execute `node run.js [file you want to run]`

## ๐ Changelog ๐ง
#### v3.0.1-mod
- Added modulus (`%`) operator. 
#### v3.0.1-env
- Added more functionality to the `getfenv` function
#### v3.0.1
- Updated to v3.0.1 (from v3.0.0)
- Added `append` function to the fs module.
- Added `\t` operator for strings.
- Added `FSSpam` example which is a performance test.


## โ Abandoned ๐ง
- Proxies (like the Javascript `new Proxy(<OBJECT>, <PROXY>))` and the Lua `setmetatable(<OBJECT>, <PROXY>)`) 
- ObjectPrototype.defineProperty (`<OBJECT>.defineProperty(<NAME>, <FAKE-ISH PROXY: VALUE>)`)

## ๐ Todo ๐น
- [ ] Complete the REPL for the Deno version.
- [ ] Figure out issues with the tests

## ๐ Finished ๐
- [x] Add modulus/remainder operator (`%`)
- [x] Add more functionality to the `getfenv` function.
- [x] ***(REVERTED)*** UPDATED TO DENO!
- [x] OOP support (still missing `extends` keyword) (Classes)
- [x] (...initial) (objects, array, negated sets, if statements, for/while, variables, scopes)

## ๐ Examples ๐งช
- Number interpreter with a lexer and parser (`./examples/NumberInterpreter`)
- Mini-language / small lexer & parser-less language (`./examples/MiniLang`)
- Lambda functions (`./examples/LambdaFunctions`)