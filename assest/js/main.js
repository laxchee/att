console.log('Start');

var $clickThis,
	$hotspot = $('.hotspot'),
	$obtainItem = $('.item'),
	$itemFound = $('.itemFound'),
	$itemHolder = $('.itemHolder'),
	$objectAction=$('.action');

var	exploring,
	itemHolding = [];


var ExploringObject = function(){

	var $chatHolder = $('.messageHolder'),
		$chatBox = $('.chatBox');

	var q = -1,
		timeout,
		itemName,
		objectName,
		objectAction;
		
		

	function _getData( type ){
		getName = $clickThis.attr("data-object");

		switch (type) {
            case 'object':
                objectName = getName;
                (  $clickThis.hasClass('action') ) ? '' : objectAction= '';
                break;
            case 'item':
                itemName = getName;
                break;
            case 'action':
                objectAction = $clickThis.attr("data-action");
                break;
        }
	}

	function _printText(){
		_getData('object');
		if( $clickThis.hasClass('random') ){
			q++;

			if( q == 2 ){
				q = -1;
				return message[objectName][2];
			}
			else{
				return message[objectName][q] ;
			}
		}
		else{
			return message[objectName] ;
		}
	}

	this.printingMessage = function(){
		var message =  _printText();

		$chatBox.empty().append(message);
		$chatHolder.show();
		clearTimeout(timeout);

		timeout = setTimeout(function(){
			textBoxFlag = true;
			$chatHolder.fadeOut('slow');
		}, 3000);

	}

	this.addItem = function(){
		var	totalItem = $('.itemFound').length,
			ItemCollection = itemList[objectName],
			duplicate = jQuery.inArray( objectName , itemHolding );
		
		if( totalItem < 6 && duplicate < 0){
			itemHolding.push(objectName);
			$itemHolder.append(ItemCollection);
		}
	}

	this.itemAction = function( itemData ){

		if( itemData == 'item'){
			_getData('item');
			$('.itemActive').removeClass('itemActive');
			$clickThis.addClass('itemActive');

		}else if ( itemData == 'action' ){
			_getData('action');
		}
		
		if( itemName == objectAction){

			switch (objectAction) {
	            case 'doc1':
	                console.log('Table has been Unlocked');
	                break;
	            case 'doc3':
	                console.log('Woooooo !!! Giraffe can read, even if he is 2D ');
	                break;

	        }
		}
	}
}

exploring = new ExploringObject();

$hotspot.click(function(){
	$clickThis = $(this);
	exploring.printingMessage();
});

$obtainItem.click(function(){
	exploring.addItem();
});

$itemHolder.on('click', '.itemFound',  function() {
	$clickThis = $(this);
	exploring.itemAction('item');
});

$objectAction.click(function(){
	$clickThis = $(this);
	exploring.itemAction('action');
});


