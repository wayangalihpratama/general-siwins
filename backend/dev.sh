#!/usr/bin/env bash
# shellcheck disable=SC2155

set -eu
pip install --upgrade pip
pip install --cache-dir=.pip -r requirements.txt
pip check

alembic upgrade head

INSTANCE="${SIWINS_INSTANCE}"
CATEGORIES="./source/"${INSTANCE}"/category.json"

if [ -f "${CATEGORIES}" ]; then
  echo "${CATEGORIES} exists"
  akvo-responsegrouper --config "${CATEGORIES}"
	echo "done"
fi

uvicorn main:app --reload --port 8000 --host 0.0.0.0
