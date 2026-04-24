#!/usr/bin/env bash

# Check if override exists
OVERRIDE=""
if [ -f "docker-compose.override.yml" ]; then
    OVERRIDE="-f docker-compose.override.yml"
fi

COMPOSE_HTTP_TIMEOUT=180 docker compose -f docker-compose.yml $OVERRIDE "$@"
