from fastapi import FastAPI, HTTPException, Depends, Form, File, UploadFile, Request
from fastapi.responses import RedirectResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles

import os
import shutil
import random  # Для имитации анализа изображения

from utils import save_uploaded_file, analyze_image, create_upload_dir
from fastapi.templating import Jinja2Templates


# Папка для сохранения загруженных изображений
UPLOAD_DIR = "./uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# Создаем FastAPI приложение
app = FastAPI()

# Подключаем статические файлы
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/registration", response_class=HTMLResponse)
def register(request: Request):
    """Эндпоинт для регистрации"""
    return templates.TemplateResponse(
        context={"request": request},
        name="registration.html"
    )


@app.get("/login", response_class=HTMLResponse)
def login(request: Request):
    """Эндпоинт для входа"""
    return templates.TemplateResponse(
        context={"request": request},
        name="login.html",
    )


@app.get("/error", response_class=HTMLResponse)
async def error_page(request: Request, code: int = 404, description: str = "Страница не найдена"):
    """Эндпоинт для обработки ошибки"""
    return templates.TemplateResponse(
        "error.html",
        {"request": request, "code": code, "description": description}
    )


@app.post("/upload", response_class=HTMLResponse)
@app.get("/upload", response_class=HTMLResponse)
async def upload_image(file: UploadFile = File(...)):
    """Эндпоинт для загрузки изображения"""
    # Сохраняем файл, используя функцию из utils
    file_path = save_uploaded_file(file, UPLOAD_DIR)

    # Анализируем изображение
    analysis_result = analyze_image(file_path)

    return {"file_path": file_path, "analysis_result": analysis_result}


@app.get("/pictures_list", response_class=HTMLResponse)
def pictures_list(request: Request):
    """Эндпоинт для получения списка изображений (пример)"""
    return templates.TemplateResponse(
        context={"request": request},
        name="pictures_list.html",
    )


@app.get("/images/{image_id}", response_class=HTMLResponse)
def images(image_id: str, request: Request):
    """Эндпоинт для получения списка изображений (пример)"""
    return templates.TemplateResponse(
        context={"request": request, "image_id": image_id},
        name="image_pattern.html",
    )


@app.get("/")
def read_root():
    """Эндпоинт для корневого пути"""

    # Перенаправляем на документацию
    return RedirectResponse(url="/docs") 


# Запуск приложения
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
