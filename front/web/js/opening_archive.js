function readyArchives() {
    document.addEventListener(
        "click", 
        e => {
            if (e.target.attributes["show_content"]) {
                var can_we_display = e.target.attributes["show_content"].value;
                var content_element = e.target.parentElement.getElementsByTagName("content")[0];
                console.log(can_we_display, content_element);
                
                if (can_we_display == "false") {
                    content_element.style.display = "none";
                    e.target.setAttribute("show_content", "true");
                }
                else {
                    content_element.style.display = "block";
                    e.target.setAttribute("show_content", "false");
                }
            }
        }
    );
}

// Все скрипты начнут работать после загрузки страницы.
document.addEventListener("DOMContentLoaded", readyArchives);
