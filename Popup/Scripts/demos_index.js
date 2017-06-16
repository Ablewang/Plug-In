var popup = null;
$(function(){
	popup = new Popup();
})
function pop(class_name){
	if (popup) {
		popup.msg($("."+class_name).html());
	}
}
