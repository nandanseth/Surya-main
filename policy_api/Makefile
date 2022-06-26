#!/usr/bin/env bash
SHELL := $(shell which bash)
.SHELLFLAGS = -c


.PHONY: help
help:
	@echo -e "\n\e[0;32m Usage:\n\tmake <target>"
	@echo -e "\t\e[0;36mExample: make run \e[0;0m\n"

.PHONY: run
run:
	@echo -e "Running server..."
	uvicorn main:app --reload

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