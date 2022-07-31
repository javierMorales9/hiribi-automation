#sudo dockerd > /dev/null 2>&1 &
docker container stop postgres-cont;
docker container prune -f;

docker run -d -p 5432:5432 --name postgres-cont -e POSTGRES_USER=hiribi -e POSTGRES_PASSWORD=pass postgres:latest;

:"
docker exec postgres-cont psql -U hiribi -c 'create database hiribiDev;';
docker exec postgres-cont psql -U hiribi -c 'create database hiribiTest;';
"
