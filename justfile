dev-dc := "docker-compose -f compose.dev.yml"
prod-dc := "docker-compose -f compose.prod.yml"
set dotenv-filename := ".env"

dev: build
	@{{dev-dc}} up

prod: build
	@{{prod-dc}} up -d --build

alias dd := dev-compose
dev-compose +COMMAND: 
	@{{dev-dc}} {{COMMAND}}

alias pd := prod-compose
prod-compose +COMMAND: 
	@{{prod-dc}} {{COMMAND}}

build: build-backend build-frontend

build-backend:
	@cd backend && pnpm run build

build-frontend:
	@rm -rf ./frontend/dist/
	@cd frontend && pnpm run build

dev-setup:
	@sudo rm -rf ./backend/node_modules/
	@{{dev-dc}} --profile manual up install-deps --build
	@cd frontend && npm install
