function ready() {
    document.body.addEventListener('click', e => {

        if (e.target.tagName != "BUTTON" && 
            e.target.tagName != "ALERT" &&
            e.target.tagName != "ERROR" &&
            e.target.tagName != "INFO"
        ) {
            return;
        }

        // Редирект
        if (target.hasAttribute("redirect_to")) {
            let redirectTo = target.getAttribute("redirect_to");

            // Проверяем, является ли путь относительным
            if (redirectTo.startsWith("./") || redirectTo.startsWith("../")) {
                // Преобразуем относительный путь в абсолютный
                const base = window.location.origin; // http://127.0.0.1:8000
                const currentPath = window.location.pathname; // Например, /images
                redirectTo = new URL(redirectTo, base + currentPath).pathname;
            }

            // Выполняем редирект
            document.location.href = redirectTo;
        }

        // Нажата кнопка завершения регистрации.
        if (e.target.attributes["registration_submit"]) {
            var new_alert = document.createElement("info");
            new_alert.textContent = "ℹ️ Вы успешно зарегистрировались (нажми на меня)";
            // ToDo: не забыть согласовать ссылки-переходы!
            new_alert.setAttribute("redirect_to", "./pictures_list");
            document.body.appendChild(new_alert);
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
