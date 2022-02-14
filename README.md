sha512crypt implementation for node
===================================

This implements the sha512crypt algorithm as described in
http://www.akkadia.org/drepper/SHA-crypt.txt
in pure javascript. 

Its available in npm via:
```
$ npm install sha512crypt-node
```

A example how to use it in a html page is provided in doc/demo.html:
```
var hash = sha512crypt(document.forms["pwform"]["password"].value,
                       document.forms["pwform"]["salt"].value);
```


Basic commandline usage:
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
$ npm install mocha
...
$ npm test

> sha512crypt-node@1.0.0 test
> ./node_modules/mocha/bin/mocha -u tdd



  sha512crypt
    ✔ sha512crypt_intermediate short
    ✔ sha512crypt_intermediate long
    ✔ rstr_sha512crypt (153ms)
    ✔ b64_sha512crypt (65ms)
    ✔ b64_sha512crypt with $6$ (70ms)
    ✔ b64_sha512crypt long (137ms)
    ✔ b64_sha512crypt long salt (106ms)
    ✔ wrong salt constant
    ✔ vectors from the drepper paper (3959ms)


  9 passing (5s)
```
