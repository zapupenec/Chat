lint-frontend:
	make -C frontend lint

fix-lint-frontend:
	make -C frontend fix-lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server