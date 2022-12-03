Exemplo básico de integração de serviços com RabbitMQ em Node, usando amqplib, com um serviço Express como Producer, e outro serviço como "Consumer"

script docker para subir um container do rabbitMQ:
docker run -d --name rabbitMQ -p 5672:5672 -p 15672:15672 -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=admin  rabbitmq:3-management

use localhost:15672 para acessar a interface client do rabbitMQ, porta 5672 é usada pelos serviços para o envio e recebimento de mensagens da fila.