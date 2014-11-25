 /*global window, module, console*/
(function($){
	'use strict';
	var Helper = $.Helper = {
	    StateLoopRemover : {
		removeLoop : function(stack, index) {
		    console.log( Helper.StateLoopRemover.findLastOccurence(stack,index));

		    stack.splice(index, Helper.StateLoopRemover.findLastOccurence(stack,index) - index);
		    
		    return stack;
		},

		findLastOccurence : function(stack, index) {
		    var find = stack[index];
		    var foundAt = index;

		    stack.forEach(function(el, i) {
			if(find.state.x === el.state.x && find.state.y === el.state.y) {
			    foundAt = i;
			}		    
		    });
		    return foundAt;
		}
	    }
	};


})(window || module.exports);
