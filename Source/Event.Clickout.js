// http://blog.kassens.net/outerclick-event
// i changed the name for "clickout" cause i think its better :S
(function(){
	var $ = document.id || $;
	var events;
	var	check = function(e){
		var target = $(e.target),
			parents = target.getParents();
		events.each(function(item){
			var element = item.element;
			if (element != target && !parents.contains(element))
				item.fn.call(element, e);
		});
	};
	Element.Events.clickout = {
		onAdd: function(fn){
			if(!events) {
				document.addEvent('mousedown', check);
				events = [];
			}
			events.push({element: this, fn: fn});
		},
		onRemove: function(fn){
			events = events.filter(function(item){
				return item.element != this || item.fn != fn;
			}, this);
			if (!events.length) {
				document.removeEvent('mousedown', check);
				events = null;
			}
		}
	};
})();
