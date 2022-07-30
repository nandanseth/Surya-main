SHELL := $(shell which bash)
.SHELLFLAGS = -c
.ONESHELL: ;

GCP_PROJECT_ID="delta-pagoda-337917"
GCP_DEV_APPSERVER := $(shell which dev_appserver.py)
GCP_DEV_APPSERVER_POLICY_API_PORT=3001

.PHONY: help
help:
	@echo -e "\n\e[0;32m Usage:\n\tmake <target>"
	@echo -e "\t\e[0;36mExample: make run \e[0;0m\n"

.PHONY: run
run:
	@echo -e "Running server..."
	uvicorn main:app --reload

.PHONY: run-gcp
run-gcp:
	@"Running server via GCloud's dev_server.py..."
	python2 ${GCP_DEV_APPSERVER} --application=${GCP_PROJECT_ID} app.yaml --port="${GCP_DEV_APPSERVER_POLICY_API_PORT}"

.PHONY: install
install:
	@if [[ -z $$VIRTUAL_ENV ]]; then \
	    echo -e "No virtual env has been activated..."; \
	    exit 1; \
	fi;

	@echo -e "Installing Python dependencies..."
	pip install -r requirements.txt

.PHONY: build
build:
	$(MAKE) install

.PHONY: deploy
deploy:
	@echo -e "Deploying..."
	gcloud app deploy --verbosity=info