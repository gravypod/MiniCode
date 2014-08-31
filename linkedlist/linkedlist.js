var LinkedList = (function () {
	var bottom = {};
	var top = bottom; // Top element in the linked list
	var _forEach = function (f) { // if f(d) returns true, it exits
		for (var last = bottom; last !== undefined; last = last.parent) // Iterate over all of the items
			if (f(last) === true) 
				return false; // Return false if we did not fully execute
		return true; // We fully ran!
	}
	return {
		set: function (e, deep) {
			var counter = -1; // Zero indexed
			return !_forEach(function (d) {
				if (counter == deep) {
					d.data = e;
					return true;
				}
				counter++;
			}); 
		},
		add: function (e) {
			top.parent = {
				data: e,
				child: top
			};
			top = top.parent;
		},
		remove: function (e) {
			var deep = -1; // Zero indexed
			return !_forEach(function (d) {
				if (d.data === e) {
					d.parent.child = d.child;
					d.child.parent = d.parent;
					return true;
				}
				deep++;
			}) ? deep : -1;
		}, 
		contains: function (e) {
			return !_forEach(function (d) {
				return d.data === e;
			});
		},
		forEach: function (f) {
			_forEach(function (e) {
				if (e.data !== undefined)
					f(e.data);
			});
		}
	}
});