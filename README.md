sha512crypt implementation for node
===================================

This implements the sha512crypt algorithm as described in
http://www.akkadia.org/drepper/SHA-crypt.txt
in pure javascript.

Basic usage:
```
$ ./demo.js pass salt
$6$salt$3aEJgflnzWuw1O3tr0IYSmhUY0cZ7iBQeBP392T7RXjLP3TKKu3ddIapQaCpbD4p9ioeGaVIjOHaym7HvCuUm0

$ python -c 'import crypt; crypt.crypt("pass", "$6$salt")
$6$salt$3aEJgflnzWuw1O3tr0IYSmhUY0cZ7iBQeBP392T7RXjLP3TKKu3ddIapQaCpbD4p9ioeGaVIjOHaym7HvCuUm0
```

Using the "rounds" parameter as part of the salt:
```
$ ./demo.js pass '$6$rounds=1000$salt'
$6$rounds=1000$salt$NqhXojlgP5NLvJojBnjQD87i66jhb8s3bZord3hSZoIgbCJqUfJdp7pclsLBBqgn02fAtd/vn4lieLeX5J.h90

$ python -c 'import crypt; print crypt.crypt("pass", "$6$rounds=1000$salt")'
$6$rounds=1000$salt$NqhXojlgP5NLvJojBnjQD87i66jhb8s3bZord3hSZoIgbCJqUfJdp7pclsLBBqgn02fAtd/vn4lieLeX5J.h90
```

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
