#!/bin/sh
set -e

echo "==> Running Database Migrations..."
npx prisma migrate deploy

if [ "$RUN_SEED" = "true" ]; then
  echo "==> Seeding Database..."
  npx prisma db seed || echo "Seeding skipped or already applied."
fi

echo "==> Starting Production Backend Application..."
exec "$@"
