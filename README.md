# Strategy Builder

Application source and container image for Strategy Builder.

Olares packaging (Helm chart / `OlaresManifest.yaml`) lives in the separate `terminus-apps/strategybuilder` chart and only references the published image — do not embed source into the chart.

**Published image:** `docker.io/goai007/strategybuilder:<tag>`

Image tags come from:
- `VERSION` file on every build (e.g. `1.2.20`) — this is what the Olares chart uses
- `latest` on pushes to `main`
- Git tags `v*` (semver), e.g. `git tag v1.2.20 && git push origin v1.2.20`

CI builds a **multi-arch** image (`linux/amd64` + `linux/arm64`) via `.github/workflows/docker-publish.yml`. Configure these GitHub Actions repository secrets before publishing:

- `DOCKERHUB_USERNAME=goai007`
- `DOCKERHUB_TOKEN=<Docker Hub access token for goai007>`

The workflow derives the repository path from `DOCKERHUB_USERNAME`, so the published image is `docker.io/goai007/strategybuilder:<tag>`.

```bash
docker build -t docker.io/goai007/strategybuilder:1.2.20 .
docker push docker.io/goai007/strategybuilder:1.2.20
```

Keep the Olares chart `values.yaml` `image.tag` in sync with `VERSION` when releasing.

---

Strategy Builder is a private, local-first Olares application for designing, reviewing, documenting, and exporting Freqtrade-compatible strategy drafts. Version 1.2.20 is the Olares compatibility release built from the previously audited application source. It reduces installation-time schema risk while preserving the application, security, localization, and runtime fixes from v1.2.17.

## Main capabilities

- 95 strategy templates, including 20 literature strategies.
- Guided Builder, Self-Build Studio, and Puzzle Builder Pro.
- Strategy Doctor and full-template diagnostics.
- AI Paper Lab using the user's own OpenAI, DeepSeek, Kimi, Claude, Gemini, OpenRouter, or compatible API key.
- Persistent Strategy Library, versioning, comparisons, reports, and ZIP exports.
- English and Simplified Chinese interface.

Strategy Builder does not run backtests, connect to exchanges, or execute trades.

## Documentation

- `PROJECT_REPORT.md` — architecture, scope, data flows, security, and project status.
- `USER_GUIDE.md` — installation and complete usage instructions.
- `MAINTENANCE_GUIDE.md` — development, extension, packaging, testing, backup, and security maintenance.
- `RELEASE_AUDIT.md` — verified release checks and limitations.

## Local run

The launcher automatically:

- changes to the project directory;
- creates `.venv` when it does not exist;
- installs `requirements.txt` when required dependencies are missing;
- creates `output/strategies`;
- starts the FastAPI application with development auto-reload.

```bash
./run_local.sh
```

Open `http://127.0.0.1:8010`.

Stop the application with `Ctrl+C`. To listen on the local network, change the port, or disable development auto-reload:

```bash
APP_HOST=0.0.0.0 APP_PORT=8010 APP_RELOAD=0 ./run_local.sh
```

If executable permissions were lost after copying the project, restore them once:

```bash
chmod +x run_local.sh
```

## Release audit

```bash
PYTHONDONTWRITEBYTECODE=1 \
PYTHONPATH=vendor:. \
python tools/audit_release.py --chart /path/to/strategybuilderdev
```

The audit does not call live AI providers, run Freqtrade, connect to exchanges, or install on a physical Olares device.

## Release assurance

The application source retained the v1.2.17 audit coverage, and the v1.2.20 compatibility package was rebuilt and rechecked for manifest consistency, Helm rendering, Kubernetes YAML validity, embedded-source integrity, application startup, API health, JavaScript syntax, and all 95 strategy-template compile checks. These checks do not replace installation on the target Olares device, live provider-account testing, or Freqtrade backtesting.
