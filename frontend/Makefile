#!/usr/bin/env bash
SHELL := $(shell which bash)
.SHELLFLAGS = -c


.PHONY: help
help:
	@echo -e "\n\e[0;32m Usage:\n\tmake <target>"
	@echo -e "\t\e[0;36mExample: make run \e[0;0m\n"

.PHONY: run
run:
	@echo -e "\e[0;36m Running server via Yarn...\e[0;0m"
	yarn start

.PHONY: install
install:
	@echo -e "\n\e[0;32mInstalling Node packages...\e[0;0m"
	yarn install

.PHONY: prod
prod:
	@echo -e "\n\e[0;32mBuilding project for prod (not needed for dev)\e[0;0m"
	yarn build

.PHONY: build
build:
	$(MAKE) install

.PHONY: deploy
deploy:
	@echo -e "\n\e[0;32mDeploying...\e[0;0m"
	gcloud app deploy --verbosity=info