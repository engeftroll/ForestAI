function ready() {
    document.body.addEventListener('click', e => {

        if (e.target.tagName != "BUTTON" && 
            e.target.tagName != "ALERT" &&
            e.target.tagName != "ERROR" &&
            e.target.tagName != "INFO"
        ) {
            return;
        }

        // Нажата кнопка завершения регистрации.
        if (e.target.attributes["registration_submit"]) {
            var new_alert = document.createElement("info");
            new_alert.textContent = "ℹ️ Вы успешно зарегистрировались (нажми на меня)";
            // ToDo: не забыть согласовать ссылки-переходы!
            new_alert.setAttribute("redirect_to", "./pictures_list.html");
            document.body.appendChild(new_alert);
        }


        if (e.target.attributes["show_content"]) {
            var can_we_display = e.target.attributes["show_content"].value;
            var content_element = e.target.parentElement.getElementsByTagName("content")[0];

            if (can_we_display == "false") {
                e.target.setAttribute("show_content", "true");
                content_element.style.display = "none";
            }
            else {
                e.target.setAttribute("show_content", "false");
                content_element.style.display = "block";
            }
        }

        // Если нужно редиректнуть, то он редиректнет.
        if (e.target.attributes["redirect_to"]) {
            document.location.href = e.target.attributes["redirect_to"].value;
        }

        if (e.target.tagName == "ALERT") {
            e.target.remove();
        }
        if (e.target.tagName == "ERROR") {
            e.target.remove();
        }
        if (e.target.tagName == "INFO") {
            e.target.remove();
        }

    });
  }


// Все скрипты начнут работать после загрузки страницы.
document.addEventListener("DOMContentLoaded", ready);
