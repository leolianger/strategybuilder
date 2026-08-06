# Strategy Builder application image.
# Build:
#   docker build -t ghcr.io/leolianger/strategybuilder:1.2.20 .
FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    APP_HOST=0.0.0.0 \
    APP_PORT=8010

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

RUN mkdir -p /app/data/strategies \
    /app/data/freqtrade/user_data/strategies \
    /app/data/custom-outputs

EXPOSE 8010

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8010"]
