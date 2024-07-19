window.addEventListener("scroll", function() {
    var footer = document.querySelector(".footer");
    var content = document.querySelector(".content");
    
    if (content.clientHeight + content.getBoundingClientRect().top <= window.innerHeight) {
        footer.style.position = "fixed";
    } else {
        footer.style.position = "absolute";
    }
});