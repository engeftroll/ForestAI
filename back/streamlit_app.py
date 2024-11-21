# streamlit_app.py
import streamlit as st
import requests

API_URL = "http://localhost:8000"

st.title("Анализ леса с помощью ИИ")

# Вход пользователя
username = st.text_input("Имя пользователя")
password = st.text_input("Пароль", type="password")

if st.button("Войти"):
    response = requests.post(f"{API_URL}/login", json={"username": username, "password": password})
    if response.status_code == 200:
        st.success("Вход выполнен успешно")
    else:
        st.error("Ошибка входа")

# Загрузка изображения
uploaded_file = st.file_uploader("Загрузить изображение", type=["jpg", "jpeg", "png"])
if uploaded_file:
    files = {"file": uploaded_file.getvalue()}
    response = requests.post(f"{API_URL}/upload", files=files, data={"user_id": 1})  # Пример с user_id=1
    if response.status_code == 200:
        result = response.json()
        st.image(uploaded_file)
        st.write(f"Количество деревьев: {result['tree_count']}")
    else:
        st.error("Ошибка при загрузке изображения")
