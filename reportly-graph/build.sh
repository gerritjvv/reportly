#!/usr/bin/env bash

set -e
dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
export SOURCE_DIR="$dir"


CMD="$1"
shift


run_compose () {
	(cd "$dir" && docker-compose $@)
}

removecontainers() {
   docker stop $(docker ps -aq)
   docker rm $(docker ps -aq)
}

armageddon() {
 removecontainers
 docker network prune -f
 docker rmi -f $(docker images --filter dangling=true -qa)
 docker volume rm $(docker volume ls --filter dangling=true -q)
 docker rmi -f $(docker images -qa)
}

cleanup () {
 armageddon
}

dev_bash () {
    run_compose build reportly-graph && \
    run_compose up -d postgresd && \
    run_compose run --service-ports --rm reportly-graph bash
}

case $CMD in
  bash )
    dev_bash
    ;;
  cleanup )
    cleanup
    ;;
  compose )
    run_compose $@
    ;;
esac

