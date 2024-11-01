function ready() {
    document.body.addEventListener('click', e => {

        // Если нужно редиректнуть, то он редиректнет.
        if (e.target.attributes["redirect_to"]) {
            document.location.href = e.target.attributes["redirect_to"].value
        }
    });
  }


// Все скрипты начнут работать после загрузки страницы.
document.addEventListener("DOMContentLoaded", ready);
