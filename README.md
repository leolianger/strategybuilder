# Strategy Builder

Application source and container image for Strategy Builder.

Olares packaging (Helm chart / `OlaresManifest.yaml`) lives in the separate `terminus-apps/strategybuilder` chart and only references the published image — do not embed source into the chart.

**Published image:** `docker.io/<DOCKERHUB_USERNAME>/strategybuilder:<tag>`  
(default assumed username `leolianger` → `docker.io/leolianger/strategybuilder`)

Image tags come from:
- `VERSION` file on every build (e.g. `1.2.20`) — this is what the Olares chart uses
- `latest` on pushes to `main`
- Git tags `v*` (semver), e.g. `git tag v1.2.20 && git push origin v1.2.20`

CI builds a **multi-arch** image (`linux/amd64` + `linux/arm64`) via `.github/workflows/docker-publish.yml`, using secrets `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN`.

```bash
docker build -t docker.io/leolianger/strategybuilder:1.2.20 .
docker push docker.io/leolianger/strategybuilder:1.2.20
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

```bash
./run_local.sh
```

Open `http://127.0.0.1:8010`.

## Release audit

```bash
PYTHONDONTWRITEBYTECODE=1 \
PYTHONPATH=vendor:. \
python tools/audit_release.py --chart /path/to/strategybuilderdev
```

The audit does not call live AI providers, run Freqtrade, connect to exchanges, or install on a physical Olares device.

## Release assurance

The application source retained the v1.2.17 audit coverage, and the v1.2.20 compatibility package was rebuilt and rechecked for manifest consistency, Helm rendering, Kubernetes YAML validity, embedded-source integrity, application startup, API health, JavaScript syntax, and all 95 strategy-template compile checks. These checks do not replace installation on the target Olares device, live provider-account testing, or Freqtrade backtesting.
