## Необхідні інструменти

-   Для бази даних я використовував XAMPP Control Panel (3.3.0), в якому є Apache (2.4.56) та MariaDB (10.4.28).

-   PHP (8.1.9)

-   Composer (2.6.3)

-   node (18.16.1)

## Інструкція для запуску додатка

-   Скопіюйте або завантажте цей репозиторій: `git clone https://github.com/Milon-777/Angular-Laravel`

-   Завантажте XAMPP або інший застосунок якій містить Apache та MariaDB

-   Завантажте Composer (якщо нема) та оберіть **php.exe** з _XAMPP/php/_ при установці Composer

-   Включіть розширення **extension=zip** в _XAMPP/php/php.ini_

-   Перезавантажте VS Code або інше середовище, щоб підтягнути зміни.

-   Запустити в XAMPP Apache та MySQL

-   Для запуску бекенда треба зайти в папку backend та прописати наступні команди в консолі:

    1. `composer install`
    2. `composer update`
    3. `cp .env.example .env`
    4. `php artisan key:generate`
    5. `php artisan migrate`
    6. `php artisan serve`

-   Для запуску фронтенду треба зайти в папку frontend та прописати наступні команди в консолі:
    1. `npm i`
    2. `npm i -g @angular/cli`
    3. `ng serve`
