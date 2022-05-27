############# TOOLS #############################################
ifeq ($(GIT),)
    GIT  := git
endif

ifeq ($(GIT_COMMIT_ID),)
    GIT_COMMIT_ID  := $(shell $(GIT) rev-parse --short=7 HEAD)
endif

ifeq ($(GIT_BRANCH_NAME),)
    GIT_BRANCH_NAME  := $(shell $(GIT) rev-parse --abbrev-ref HEAD)
endif

ifeq ($(GIT_COMMIT_MESSAGE),)
    GIT_COMMIT_MESSAGE  := $(shell $(GIT) log -1 --pretty=%B)
endif

ifeq ($(NODE),)
    NODE  := node
endif

ifeq ($(NPM),)
    NPM  := npm
endif

ifeq ($(DOCKER),)
    DOCKER  := docker
endif

ifeq ($(HELM),)
    HELM  := helm
endif
######################## APPLICATION PARAMETERS ##########################

ifeq ($(APPLICATION_NAME),)
    APPLICATION_NAME  := $(shell $(NODE) -p "require('./package.json').name")
endif

ifeq ($(RELEASE_VERSION),)
    RELEASE_VERSION  := $(shell $(NODE) -p "require('./package.json').version")
endif

IMAGE=${APPLICATION_NAME}
CONTAINER="${APPLICATION_NAME}-container"
CHART="${APPLICATION_NAME}-deploy"
CHART_PATH=".build/${CHART}"
NAMESPACE="alta-renda"
ifeq ($(REGISTRY),)
    REGISTRY="553577346001.dkr.ecr.us-east-1.amazonaws.com/${IMAGE}"
    RELEASE="${REGISTRY}:${RELEASE_VERSION}"
endif
######################## BUILD TARGETS #############################
.PHONY: start install build run container-clean release

all: help

######################## PACKAGE SECTION ###########################
start:
	@ $(NPM) run start

install:
	@ $(NPM) install

build:
	@ $(NPM) run build

debug:
	@ $(NPM) run start:debug

test:
	@ $(NPM) run test:watch
######################## CONTAINER SECTION ##########################
define build
        $(DOCKER) build --rm --file Dockerfile \
      --label git_branch="${GIT_BRANCH_NAME}" \
			--label git_commit="${GIT_COMMIT_ID}" \
			--label created_at="${TIMESTAMP}" \
			--label release="${RELEASE_VERSION}" \
			--label name="${APPLICATION_NAME}" \
			--label display-name="${APPLICATION_NAME} release version ${RELEASE_VERSION}" \
			--label description="NodeJS application ${APPLICATION_NAME} release version ${RELEASE_VERSION}" \
			--label image="${IMAGE}:${RELEASE_VERSION}" \
			--label vcs-ref="${GIT_COMMIT_ID}" \
			--no-cache --tag "${IMAGE}:${RELEASE_VERSION}" .

endef

run: | container-clean
	@ $(call build)
	@ $(DOCKER) run --name ${CONTAINER} --rm  \
		--publish 3000:3000 \
        --env NODE_ENV=DEV \
		"${IMAGE}:${RELEASE_VERSION}"

container-clean:
	@ $(DOCKER) stop $(CONTAINER) || true
	@ $(DOCKER) rm $(CONTAINER) || true

release:
	@ $(call build)
	@ $(DOCKER) tag "${IMAGE}:${RELEASE_VERSION}" $(RELEASE)
	@ $(DOCKER) push $(RELEASE)

deploy-aws: ## Install/upgrade application
	@ $(HELM) upgrade --install \
			$(CHART) \
			$(CHART_PATH) \
			--install \
			--namespace $(NAMESPACE) \
			--recreate-pods \
			--force \
			--set image.pullPolicy=Always \
			--set image.repository=${REGISTRY} \
			--set image.tag=${RELEASE_VERSION}

	@ $(HELM) history $(CHART)

help:
	@ echo
	@ echo "Welcome to [ $(APPLICATION_NAME):$(RELEASE_VERSION) ]"
	@ echo "Actual branch: [ $(GIT_BRANCH_NAME) ]"
	@ echo "Actual commit: [ $(GIT_COMMIT_ID) - $(GIT_COMMIT_MESSAGE) ]"
	@ echo ".................................................................\n"
	@ echo "Usage   :  make <target>"
	@ echo "Targets :"
	@ echo "   install .......... Run npm install" inspect
	@ echo "   build .......... Build Angular application"
	@ echo "   start .......... Run local application"
	@ echo "   run .......... Run application using docker image"
	@ echo "   container-clean .......... Remove container is running"
	@ echo "   help .......... Prints this help message"
	@ echo "\n.................................................................\n"