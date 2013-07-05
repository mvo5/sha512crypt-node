sha512crypt implementation for node
===================================

This implements the sha512crypt implementation as described in
http://www.akkadia.org/drepper/SHA-crypt.txt
in javascript.

```
$ ./demo.js pass salt
$6$salt$3aEJgflnzWuw1O3tr0IYSmhUY0cZ7iBQeBP392T7RXjLP3TKKu3ddIapQaCpbD4p9ioeGaVIjOHaym7HvCuUm0

$ python -c 'import crypt; crypt.crypt("pass", "$6$salt")
$6$salt$3aEJgflnzWuw1O3tr0IYSmhUY0cZ7iBQeBP392T7RXjLP3TKKu3ddIapQaCpbD4p9ioeGaVIjOHaym7HvCuUm0
```


Todo
====
Implement "rounds" parameter in the input salt string.


Tests
=====

Tests are done via mocha, see REQUIREMENTS for details.
```
$ npm install mocha nodeunit
...
$ cd tests
$ make
nodejs ../node_modules/.bin/mocha -u tdd test_sha512crypt.js

  ․․․․․․․

  7 passing (2 seconds)
```
