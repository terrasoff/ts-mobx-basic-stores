default: test clean build

test:
	docker-compose exec node jest

clean:
	sudo rm -rf build

build: clean test
	docker-compose exec node tsc

publish: build
	git tag ${sed -nE 's/^\s*"version": "(.*?)",$/\1/p' package.json}
	git push origin --all
	git push github --all
	docker-compose exec node bash -c "npm publish"