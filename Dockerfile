FROM php:8.2-cli

# System deps + PHP extensions Laravel needs
RUN apt-get update && apt-get install -y \
    git unzip ca-certificates libzip-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd zip \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install --no-dev --optimize-autoloader --no-interaction

RUN mkdir -p storage/framework/views \
    storage/framework/cache \
    storage/framework/sessions \
    storage/logs \
    bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 10000

RUN mkdir -p storage/framework/views storage/framework/cache storage/framework/sessions \
    && chmod -R 775 storage bootstrap/cache

CMD php artisan config:cache \
    && php artisan migrate --force \
    && php artisan db:seed --force \
    && php artisan serve --host 0.0.0.0 --port $PORT