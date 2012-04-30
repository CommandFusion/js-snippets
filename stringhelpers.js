	/* stringhelpers.js
 *
 * Generic string manipulation functions useful for CommandFusion iViewer integrators
 * Public domain code, written by CommandFusion Pty. Ltd - www.commandfusion.com
 *
 * Functions:
 *
 * padBeginning(total, fillChar, string): pad the beginning of a string
 * padEnd(total, fillChar, string): pad the end of a string
 * hex2number(string): read a value encoded as a hex-ascii string (i.e. "3a8b7d")
 * number2hex(string,digits): turn a number into its hex-ascii representation. Specify the number of digits to pad the output
 *
 */

// a helper cache to avoid allocating padding strings all the time
var PAD_CACHE = {};

// Fill the beginning of a string so that the resulting string is
// exactly the requested `len'. If it's shorter, we prepend `fill'
// as many times as requested. If longer, we truncate the beginning
// of the string. Note that for this to work as expected, `fill' has
// to be a one-character string
//
// Example:
// padBeginning(6,"0","7a8") will return "0007a8"
// padBeginning(4,"0","Hello") will return "ello" (truncate front)
// padBeginning(6,"-","") will return "------"
// etc.
function padBeginning(len, fill, str) {
	var l = str.length;
	if (l < len) {
		if (!PAD_CACHE.hasOwnProperty(fill)) {
			PAD_CACHE[fill]={};
		}
		return (PAD_CACHE[fill][len-l] || (PAD_CACHE[fill][len-l]=(Array(len-l+1).join(fill)))) + str;
	}
	return (l === len) ? str : str.substring(l-len);
}

// Fill the end of a string so that the resulting string is
// exactly the requested `len'. If it's shorter, we prepend `fill'
// as many times as requested. If longer, we truncate the end
// of the string. Note that for this to work as expected, `fill' has
// to be a one-character string
//
// Example:
// padEnd(6,"0","7a8") will return "7a8000"
// padEnd(4,"0","Hello") will return "Hell" (truncate end)
// padEnd(6,"-","") will return "------"
// etc.
function padEnd(len, fill, str) {
	var l = str.length;
	if (l < len) {
		if (!PAD_CACHE.hasOwnProperty(fill)) {
			PAD_CACHE[fill]={};
		}
		return str + (PAD_CACHE[fill][len-l] || (PAD_CACHE[fill][len-l]=(Array(len-l+1).join(fill))));
	}
	return (l === len) ? str : str.substring(0,len);
}

// Convert a string to a number value
// This is trivial, but we often see people write complicated conversion routines,
// so this is more like a reminder for efficient practices
function hex2number(str) {
	return parseInt(str, 16);
}

// Convert a number value to a hex string
// This is trivial, but we often see people write complicated conversion routines,
// so this is more like a reminder for efficient practices. For all-uppercase strings,
// call the uppercase() on the result: number2hex(234234).toUpperCase() -> "392FA"
// Examples:
// number2hex(234234) -> "392fa"
// number2hex(234234,10) -> "00000392fa"
function number2hex(value,digits) {
	return padBeginning(digits, "0", value.toString(16));
}


/* tests
console.log(padBeginning(6,"-",""));
console.log(padBeginning(8,"0","34234"))
console.log(padBeginning(4,"0","hello"))

console.log(padEnd(6,"-",""));
console.log(padEnd(8,"0","34234"))
console.log(padEnd(4,"0","hello"))

console.log(number2hex(234234));
console.log(number2hex(234234).toUpperCase());
console.log(number2hex(234234,10));
*/
