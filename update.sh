# Загрузка новой версии файлов
git pull

# Остановка всех контейнеров
docker-compose -f docker-compose-serv.yml down

# Запуск контейнеров из собранных образов
docker-compose -f docker-compose-serv.yml up --build
