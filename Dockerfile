# Stage 1: Build front-end assets
FROM node:14 AS frontend-builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY webpack.mix.js ./
COPY resources ./resources
RUN npm run prod

# Stage 2: Build and run Laravel application
FROM php:8-fpm

WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    zip \
    unzip

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql zip

# Copy composer files and install dependencies
COPY composer.json composer.lock ./
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader

# Copy built front-end assets
COPY --from=frontend-builder /app/public ./public

# Copy the rest of the application
COPY . .

# Set permissions
RUN chown -R www-data:www-data storage bootstrap/cache

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
