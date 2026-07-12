FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    git unzip ca-certificates libzip-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd zip \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install --no-dev --optimize-autoloader --no-interaction

RUN mkdir -p storage/framework/views \
    storage/framework/cache \
    storage/framework/sessions \
    storage/logs \
    bootstrap/cache \
    && chmod -R 777 storage bootstrap/cache

# Remove any stale cached config that may have been committed
RUN rm -f bootstrap/cache/config.php \
    bootstrap/cache/routes*.php \
    bootstrap/cache/services.php \
    bootstrap/cache/packages.php

EXPOSE 10000

CMD php artisan config:clear \
    && php artisan cache:clear \
    && php artisan view:clear \
    && php artisan migrate --force \
    && php artisan db:seed --force \
    && php artisan serve --host 0.0.0.0 --port $PORT
