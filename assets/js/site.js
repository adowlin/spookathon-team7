function owlAction() {
    let actionElement = document.getElementById("title-page-art-owl-action");
    toggleVisibility(actionElement);
}

function toggleVisibility(element) {
    if(element.style.display != "block") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

window.addEventListener('load',function(){
    document.getElementById("title-page-art-owl").addEventListener("click", owlAction, false);
});


