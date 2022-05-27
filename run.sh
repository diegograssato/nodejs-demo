#!/usr/bin/env bash

IMAGE="hexagonal/node-web-app"

function build() {
    
    docker build --rm --file Dockerfile . -t "${IMAGE}"

}

function run() {
    docker rm -f rest-server
    docker run -p 8080:8080 --rm --env DATABASE_URL="postgresql://postgres:postgres@10.22.0.64:5432/postgres?schema=public" --name rest-server "${IMAGE}"

}

$@