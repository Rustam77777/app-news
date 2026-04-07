FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    gettext \
    vim \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Create unprivileged user
RUN groupadd -r appuser -g 1000 && useradd -r -g appuser -u 1000 appuser

# Copy project code
COPY . .

# Create directories for static files, media, and logs
RUN mkdir -p /app/staticfiles /app/media /app/logs

# Collect static files (NEW LINE) ✅
RUN python manage.py collectstatic --noinput || true

# Change ownership of all files to appuser
RUN chown -R appuser:appuser /app

# Switch to unprivileged user
USER appuser

EXPOSE 8000

# Default command
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]