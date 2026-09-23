#!/usr/bin/env bash

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV_DIR="${PROJECT_DIR}/.venv"
PYTHON_BIN="${PYTHON_BIN:-python3}"
APP_HOST="${APP_HOST:-127.0.0.1}"
APP_PORT="${APP_PORT:-8010}"
APP_RELOAD="${APP_RELOAD:-1}"

cd "${PROJECT_DIR}"

if [[ ! -x "${VENV_DIR}/bin/python" ]]; then
    if ! command -v "${PYTHON_BIN}" >/dev/null 2>&1; then
        echo "Error: ${PYTHON_BIN} was not found. Install Python 3.11+ or set PYTHON_BIN." >&2
        exit 1
    fi
    echo "Creating virtual environment in ${VENV_DIR} ..."
    "${PYTHON_BIN}" -m venv "${VENV_DIR}"
fi

VENV_PYTHON="${VENV_DIR}/bin/python"

if ! "${VENV_PYTHON}" -c \
    "import fastapi, uvicorn, jinja2, pydantic, multipart, pypdf" >/dev/null 2>&1; then
    echo "Installing Python dependencies ..."
    "${VENV_PYTHON}" -m pip install --disable-pip-version-check -r requirements.txt
fi

mkdir -p "${PROJECT_DIR}/output/strategies"

reload_args=()
if [[ "${APP_RELOAD}" != "0" ]]; then
    reload_args+=(--reload)
fi

echo "Starting Strategy Builder ..."
echo "Web UI:  http://${APP_HOST}:${APP_PORT}/"
echo "Health:  http://${APP_HOST}:${APP_PORT}/api/health"
echo "Press Ctrl+C to stop."

exec "${VENV_PYTHON}" -m uvicorn app.main:app \
    --host "${APP_HOST}" \
    --port "${APP_PORT}" \
    "${reload_args[@]}" \
    "$@"
