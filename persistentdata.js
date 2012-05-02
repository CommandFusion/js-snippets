/* Helper functions to save and restore arbitrary data of any size
 * to a global token in iViewer. You will have to declare this global
 * token in your GUI file and mark it as persistent.
 *
 * For first time initialization, the restorePersistentData() function
 * takes a defaultValue value that is used if the data has never been
 * saved yet.
 *
 * restorePersistentData() will call a callback function you give it and
 * pass it the restored value (or the default value). Here is an example
 * of use:
 *
CF.userMain = function() {
	// restore an array we saved in the "SavedArray" global token,
	// and the first-time contents of the array is [0,1,2]
	restorePersistentData("SavedArray", [0,1,2], function(restoredValue) {
		// we can now used the contents of the array we saved
	});
}

// at any point in your code, you can save the contents of SomeGlobalArray
// by doing:
//     savePersistentData("SavedArray", someArray);
 *
 * Note that the example above saves and restores an array, but you can save
 * and restore any object (it can be more complex than a simple array).
 *
 */

function savePersistentData(dataObject, token) {
	CF.setToken(CF.GlobalTokensJoin, token, JSON.stringify(dataObject));
}

function restorePersistentData(token, defaultValue, callback) {
	CF.getJoin(CF.GlobalTokensJoin, function(j,v,t) {
		if (!t.hasOwnProperty(token) || t[token] === "") {
			restored = defaultValue;
		} else {
			try {
				restored = JSON.parse(t[token]);
			}
			catch(e) {
				restored = defaultValue;
			}
		}
		callback.apply(null, restored);
	});
}
