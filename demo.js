#!/usr/bin/node

b64_sha512crypt = require("./sha512crypt.js").b64_sha512crypt;

/* this is just a example, you should obviously *not* enter
   a cleartext password in your shell
*/
var pass = process.argv[2];
var salt = process.argv[3];

hash = b64_sha512crypt(pass, salt);
console.log(hash);

