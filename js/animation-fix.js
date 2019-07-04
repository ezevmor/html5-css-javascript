var expContainerList = $('.experience-container');

expContainerList.hover(function(event) {
	$( this ).children('.experience-item-top').animate({"margin-top":"-=218px"},250);
},function(event){
	$( this ).children('.experience-item-top').animate({"margin-top":"+=218px"},250);
});

$('.title').animate({ opacity: 1 }, 2000, "linear");
