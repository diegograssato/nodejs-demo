#!/usr/bin/env bash

IMAGE="hexagonal/node-web-app"

function build() {
    
    docker build --rm --file Dockerfile . -t "${IMAGE}"

}

function run() {
    docker-compose -f docker/docker-compose.yml build
    docker-compose -f docker/docker-compose.yml up
}

function down() {
    docker-compose -f docker/docker-compose.yml down
}

function migrate() {
    docker-compose -f docker/docker-compose.yml exec api bash -c "npx prisma migrate dev"
}

$@