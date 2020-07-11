default: test clean build

define release
	VERSION=`node -pe "require('./package.json').version"` && \
	NEXT_VERSION=`node -pe "require('semver').inc(\"$$VERSION\", '$(1)')"` && \
	node -e "\
		var j = require('./package.json');\
		j.version = \"$$NEXT_VERSION\";\
		var s = JSON.stringify(j, null, 2);\
		require('fs').writeFileSync('./package.json', s);" && \
	git commit -m "release $$NEXT_VERSION" -- package.json && \
	git tag "$$NEXT_VERSION" -m "Version $$NEXT_VERSION"
endef

define publish
	git push origin --all
	git push github --all
	docker-compose exec node bash -c "npm publish"
endef

test:
	docker-compose exec node jest

clean:
	sudo rm -rf build

build: clean test
	docker-compose exec node tsc

release-patch: build
	@$(call release,patch)
	@$(call publish)

release-minor: build
	@$(call release,minor)
	@$(call publish)

release-major: build
	@$(call release,major)
	@$(call publish)
