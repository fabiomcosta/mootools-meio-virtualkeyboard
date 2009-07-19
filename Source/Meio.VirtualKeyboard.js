if(typeof Meio == 'undefined') var Meio = {};


(function(){
	var $ = document.id || $;
	
	Meio.VirtualKeyboard = new Class({

		shiftOn: false,

		initialize: function(element, inputs, parentContainer){
			this.element = $(element);
			this.inputs = inputs;
			this.currentInput = null;
			this.divShiftActive = this.element.getElement('.mk-shift-active');
			this.divShiftInactive = this.element.getElement('.mk-shift-inactive');
			this.firstDocumentChild = parentContainer || $(document.body).getFirst();
			this.setDetectInputFunction();
			this.setButtonsClickEvent();
		},
		
		setDetectInputFunction: function(){
			this.inputs.each(function(input){
				input.addEvents({
					'focus': function(){
						this.currentInput = input;
						this.element.setStyle('display', 'block');
					}.bind(this),
					'mousedown': function(e){
						e.stopPropagation();
					}.bind(this)
				});
				this.element.addEvent('clickout', function(){
					this.element.setStyle('display', 'none');
				}.bind(this));
			}, this);
		},
		
		setButtonsClickEvent: function(){
			this.element.getElements('button').each(function(btn){
				btn.addEvent('click', function(e){
					if(this.currentInput){
						this.currentInput.focus();
						if(btn.get('text') == 'Apagar'){
							var range = this.currentInput.getSelectedRange();
							if(range.start === range.end && range.end){
								this.currentInput.selectRange(range.start-1, range.start);
							}
							this.currentInput.insertAtCursor('', false);
						}
						else if(btn.get('text') == 'Shift'){
							this.shiftPressed();
						}
						else{
							this.currentInput.insertAtCursor(btn.get('text'), false);
							if(this.shiftOn) this.shiftPressed(false);
						}
					}
				}.bind(this));
			}, this);
		},
		
		shiftPressed: function(shiftActive){
			if(typeof shiftActive == 'undefined') shiftActive = !this.shiftOn;
			var activeStyle, inactiveStyle;
			if(shiftActive){
				activeStyle = 'block';
				inactiveStyle = 'none';
			}
			else{
				activeStyle = 'none';
				inactiveStyle = 'block';
			}
			this.divShiftActive.setStyle('display', activeStyle);
			this.divShiftInactive.setStyle('display', inactiveStyle);
			this.shiftOn = shiftActive;
		}
		
	});
	
})();