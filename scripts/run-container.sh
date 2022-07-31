#sudo dockerd > /dev/null 2>&1 &
sudo docker container stop postgres-cont;
sudo docker container prune -f;

sudo docker run -d -p 5432:5432 --name postgres-cont -e POSTGRES_USER=hiribi -e POSTGRES_PASSWORD=pass postgres:latest;
#docker exec postgres-cont psql -U hiribi -c 'create database hiribidev;'