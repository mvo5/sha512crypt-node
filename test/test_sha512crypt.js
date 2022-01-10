#!/usr/bin/node

var assert = require('assert');

b64_hmac_sha512 = require("../lib/sha512.js").b64_hmac_sha512;
rstr2hex = require("../lib/sha512.js").rstr2hex;

sha512crypt = require("../sha512crypt.js");


suite('sha512crypt', function() {

    test('sha512crypt_intermediate short', function() {
        var hash = sha512crypt._sha512crypt_intermediate('pass', 'salt');
        assert.equal(rstr2hex(hash), "e9dbd743832e218c2bb821e41d961933961cdbf3c2a1b22a9344783e5f25d8aebff52968540cc6df90d1a3f01c53edd34170f2b3eb0b693a77250aa0326e639d");
    });

    test('sha512crypt_intermediate long', function() {
        var hash = sha512crypt._sha512crypt_intermediate('passpasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspass', 'salt');
        assert.equal(rstr2hex(hash), "8be54982f353a2d7d82b7ea167bb08e6f5f29cdd863de194c82270d12d3766cb276478a288f7aa21344efb42d44cbb5537283fd511cad34a83163df136ffd631");
    });

    test('rstr_sha512crypt', function() {
        var hash = sha512crypt._rstr_sha512crypt('pass', 'salt', 5000);
        assert.equal(rstr2hex(hash), "55eca8e4b7dc9689b325ddf1a429e9d48b1999bea309cfbf56919e80706af15e5b5ed69c63ab92364cbb851af3834082a4db150bf8599665d4e74b52af9c83b2")
    });

    test('b64_sha512crypt', function() {
        var hash = sha512crypt.b64_sha512crypt('pass', 'salt');
        assert.equal(hash, "$6$salt$3aEJgflnzWuw1O3tr0IYSmhUY0cZ7iBQeBP392T7RXjLP3TKKu3ddIapQaCpbD4p9ioeGaVIjOHaym7HvCuUm0")
    });

    test('b64_sha512crypt with $6$', function() {
        var hash = sha512crypt.b64_sha512crypt('pass', '$6$salt');
        assert.equal(hash, "$6$salt$3aEJgflnzWuw1O3tr0IYSmhUY0cZ7iBQeBP392T7RXjLP3TKKu3ddIapQaCpbD4p9ioeGaVIjOHaym7HvCuUm0")
    });

    test('b64_sha512crypt long', function() {
        var hash = sha512crypt.b64_sha512crypt('passpasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspass', 'salt');
        assert.equal(hash, "$6$salt$3VcgQdxRuwcYKXsn4jQtLCSSE9n4hzkDPXfu5fhBbJb2E9LUjXhvcxUL1CP.K5UQ3Uti3GAxyxvg/cJXl0Bqr1");
    });

    test('b64_sha512crypt long salt', function() {
        var hash = sha512crypt.b64_sha512crypt(
            "This is just a test", "toolongsaltstring");
        assert.equal(hash, "$6$toolongsaltstrin$lQ8jolhgVRVhY4b5pZKaysCLi0QBxGoNeKQzQ3glMhwllF7oGDZxUhx1yxdYcz/e1JSbq3y6JMxxl8audkUEm0");
        });

    test('wrong salt constant', function() {
        try {
            sha512crypt.b64_sha512crypt("Hello world!", "$5$wrongsalt");
        } catch (e) {
            var expected_msg = "Got '$5$wrongsalt' but only SHA512 ($6$) algorithm supported";
            assert.equal(e.message, expected_msg);
        }
    });

   test('vectors from the drepper paper', function() {
       this.timeout(15000);

       assert.equal(
           sha512crypt.b64_sha512crypt("Hello world!", "saltstring"),
           "$6$saltstring$svn8UoSVapNtMuq1ukKS4tPQd8iKwSMHWjl/O817G3uBnIFNjnQJuesI68u4OTLiBFdcbYEdFCoEOfaS35inz1");

       assert.equal(
           sha512crypt.b64_sha512crypt(
               "Hello world!", "$6$rounds=10000$saltstringsaltstring"),
           "$6$rounds=10000$saltstringsaltst$OW1/O6BYHV6BcXZu8QVeXbDWra3Oeqh0sbHbbMCVNSnCM/UrjmM0Dp8vOuZeHBy/YTBmSK6H9qs/y3RnOaw5v.");

       assert.equal(
           sha512crypt.b64_sha512crypt(
               "This is just a test", "$6$rounds=5000$toolongsaltstring"),
           "$6$rounds=5000$toolongsaltstrin$lQ8jolhgVRVhY4b5pZKaysCLi0QBxGoNeKQzQ3glMhwllF7oGDZxUhx1yxdYcz/e1JSbq3y6JMxxl8audkUEm0");

       assert.equal(
           sha512crypt.b64_sha512crypt(
               "a very much longer text to encrypt.  This one even stretches over morethan one line.", "$6$rounds=1400$anotherlongsaltstring"),
           "$6$rounds=1400$anotherlongsalts$POfYwTEok97VWcjxIiSOjiykti.o/pQs.wPvMxQ6Fm7I6IoYN3CmLs66x9t0oSwbtEW7o7UmJEiDwGqd8p4ur1");

       assert.equal(
           sha512crypt.b64_sha512crypt(
               "This is just a test", "toolongsaltstring"),
           "$6$toolongsaltstrin$lQ8jolhgVRVhY4b5pZKaysCLi0QBxGoNeKQzQ3glMhwllF7oGDZxUhx1yxdYcz/e1JSbq3y6JMxxl8audkUEm0");

       assert.equal(
           sha512crypt.b64_sha512crypt(
               "we have a short salt string but not a short password",
               "$6$rounds=77777$short"),
           "$6$rounds=77777$short$WuQyW2YR.hBNpjjRhpYD/ifIw05xdfeEyQoMxIXbkvr0gge1a1x3yRULJ5CCaUeOxFmtlcGZelFl5CxtgfiAc0");

       assert.equal(
           sha512crypt.b64_sha512crypt(
               "a short string",
               "$6$rounds=123456$asaltof16chars.."),
           "$6$rounds=123456$asaltof16chars..$BtCwjqMJGx5hrJhZywWvt0RLE8uZ4oPwcelCjmw2kSYu.Ec6ycULevoBK25fs2xXgMNrCzIMVcgEJAstJeonj1");

       assert.equal(
           sha512crypt.b64_sha512crypt(
               "the minimum number is still observed",
               "$6$rounds=10$roundstoolow"),
           "$6$rounds=1000$roundstoolow$kUMsbe306n21p9R.FRkW3IGn.S9NPN0x50YhH1xhLsPuWGsUSklZt58jaTfF4ZEQpyUNGc0dqbpBYYBaHHrsX.");

   }); 

});


