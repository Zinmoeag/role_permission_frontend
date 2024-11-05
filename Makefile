help:
	@echo "Usage:"
	@echo "  make create-context				- Generate context
	@echo "  make install								- Install dependencies
	@echo "  make start-dev							- Build image and run application
	@echo "  make start									- Run application
	@echo "  make help									- Display help"

start-dev :
	npm run dev