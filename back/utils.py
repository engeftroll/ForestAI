import os
import shutil
import random  # Для имитации анализа изображения


def save_uploaded_file(file, upload_dir):
    """Функция для сохранения загруженного файла"""
    file_path = os.path.join(upload_dir, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return file_path


def analyze_image(file_path):
    """Функция для анализа изображения"""
    return random.randint(1, 100)  # Пример: возвращаем случайное число


def create_upload_dir(upload_dir):
    """Создаёт папку для загрузки, если её нет"""
    os.makedirs(upload_dir, exist_ok=True)
