
build:
	docker build -t something.azurecr.io/api .
push:
	docker push something.azurecr.io/api
bpush: build push

run:

buildrun: build
	docker run -p 1337:4001 something.azurecr.io/api

sequelize-auto:
	./node_modules/.bin/sequelize-auto -o "./src/models" -d <<database>> -h <<host>> -u <<user>> -p <<port>> -x <<password>> -e mysql
eslint-models:
	./node_modules/.bin/eslint src/models --fix

models: sequelize-auto eslint-models
	