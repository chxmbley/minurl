.PHONY: $(MAKECMDGOALS)

# `make setup` will be used after cloning or downloading to fulfill
# dependencies, and setup the the project in an initial state.
# This is where you might download rubygems, node_modules, packages,
# compile code, build container images, initialize a database,
# anything else that needs to happen before your server is started
# for the first time
setup:
	npm ci
	npm run db:migrate

# `make server` will be used after `make setup` in order to start
# an http server process that listens on any unreserved port
#	of your choice (e.g. 8080).
server:
	npm run build
	npm run start -- -p 8080

# `make test` will be used after `make setup` in order to run
# your test suite.
test:
	npm run lint
	npm run lint:style
	npm run test
	npm run build
	npm run db:migrate:test
	npx dotenv -e .env.test start-server-and-test start http://localhost:3000 cypress:headless
