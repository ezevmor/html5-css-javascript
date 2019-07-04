var imgExperienceContainer = document.getElementsByClassName('flexbox-container');

activate();

//////////////////////////////////////////

/* se comproeba a travez de modernizr la ausencia de flexbox */
function activate(){
	if (!Modernizr.flexbox) {
		for(var i=0; i<imgExperienceContainer.length; i++){
			imgExperienceContainer[i].className = "flexbox-container flexbox-container-fix";
		}
	}
};