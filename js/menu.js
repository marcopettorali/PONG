//GLOBAL VARIABLES FOR MANAGING THE MENU
var MENU;
var ICON; //the three-lines icon
var OVERLAY; //the black opaque cover when you open the side menu

//PARAMETERS OF THE SCREEN (in pixels)
var MENU_WIDTH = 300;
var MENU_UNCOVERED = 60;

//OTHER UTILITY VARIABLES
var counter = MENU_WIDTH - MENU_UNCOVERED;
var open = true;

//setupMenu() draws the menu on the page
function setupMenu(){

	MENU = document.getElementById('sideNav');
	ICON = document.getElementById('icon');

	MENU.style.width = MENU_WIDTH + 'px';
	MENU.style.left = (MENU_UNCOVERED - MENU_WIDTH) + 'px';

}

//show() shows and hides the menu when the icon is clicked
function show(){

	if(open==true){
		OVERLAY = document.createElement('div');
		OVERLAY.setAttribute('id', 'overlay');
		document.getElementById('body').insertBefore(OVERLAY, document.getElementById('body').firstChild);
	}

	//setup the slide function
	var INTERVAL_MENU = setInterval(function(){

		ICON.firstChild.nodeValue = (open==true)?'✖':'☰';
		
		//if the menu has already shown for all its width then stop
		if(counter == 0 && open == true){
			clearInterval(INTERVAL_MENU);
			open = !open;
	
		}
		
		//if the menu has already hidden for all its width then stop and remove the overlay
		if(counter == MENU_WIDTH - MENU_UNCOVERED && open == false){
			document.getElementById('body').removeChild(OVERLAY);
			clearInterval(INTERVAL_MENU);
			open = !open;
		}
		
		//move the menu and darken the overlay
		OVERLAY.style.backgroundColor = 'rgba(0,0,0,' + 0.8*(1-(counter/(MENU_WIDTH-MENU_UNCOVERED))) + ')';
		MENU.style.left = -counter + 'px';
		counter = (open==true)? counter - 10 : counter + 10 ;

	},10);
}