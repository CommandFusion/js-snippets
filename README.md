js-snippets
===========

A collection of JavaScript snippets for CommandFusion iViewer (and some generic JavaScript snippets). Add the files containing the functions you need to your iViewer project and you're done!

## String manipulation functions

Include the `stringhelpers.js` file to get a few helpful string manipulation functions:

### String padding

##### padBeginning()

`padBeginning(wantedLength, fillChar, stringToPad)`

Pads a string to the desired length with the supplied fill character (provided as a string). If the string is shorted than the desired length, the fill char is prepended as many times as needed. If the string is longer than the desired length, its beginning is truncated.

##### padEnd()

`padEnd(wantedLength, fillChar, stringToPad)`

Pad a string to the desired length with the supplied fill character (provided as a string). If the string to pad is shorter than the desired length, the fill char is appended as many times as needed. If the string is longer than the desired length, its end is truncated.


### Ascii hexadecimal representation conversions

It's a trivial thing to do in JavaScript but a surprising number of people don't know it can be done easily with basic JS calls. We supply a couple functions that do it for you, and add optional padding.

##### hex2number()

`hex2number(str)`

Returns the value represented by the supplied string, assumed to be an ascii-encoded hexadecimal representation. For example, `hex2number("392fa")` will return the value `234234`.

##### number2hex()

`number2hex(str, length)`

Converts a value to its ascii-encoded hexadecimal representation. The number of desired characters is optional: if specified, the return value is padded (or truncated) to the desired length. Otherwise, the value is returned verbatim. Here are a few examples of use:

* `number2hex(234234)` returns the string `"392fa"`
* `number2hex(234234,10)` returns the string `"00000392fa"`
* `number2hex(234234,2)` returns the string `"fa"`

Note that the strings are always returned with letters in lowercase. If you want an uppercase version, simply call the toUpperCase() function on the returned string:

`number2hex(234234).toUpperCase()` returns the string `"392FA"`.


