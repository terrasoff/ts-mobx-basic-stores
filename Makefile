default: test clean build

build:
	docker-compose exec node tsc

clean:
	sudo rm -rf build

test:
	docker-compose exec node jest

publish:
	docker-compose exec node bash -c "npm publish"