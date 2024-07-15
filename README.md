<h1 align="center">Pumkin Panda</h1>
<p align="center">
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/Node.js-21.6.1-blue" alt="Node.js">
  </a>
  <a href="https://yarnpkg.com/">
    <img src="https://img.shields.io/badge/Yarn-latest-green" alt="Yarn">
  </a>
  <a href="https://lerna.js.org/">
    <img src="https://img.shields.io/badge/Lerna-latest-blue" alt="Lerna">
  </a>
</p>

Классичексая бродилка, в которой задача игрока - собирать объекты (тыквы) и избегать столкновения с врагами, обходя препятствия.

Игра представляет собой 2D приключение, в котором игрок управляет персонажем (пандой), перемещающимся по игровому полю, собирая кристаллы (тыквы) и избегая столкновений с врагами. Цель игры — собрать все кристаллы, не столкнувшись с врагами.

Более подбробно о механике игры можно посмотреть [тут](./Game.md)

[Видео для командного зачета по 5 и 6 спринту:](https://youtu.be/_1TURI0aSTw)

## Как запустить?

- Убедитесь что у вас установлена необходимая версия `node`:

```
node -v
```

- Если ваша версия отличается от используемой в проекте, вам необходимо установить версию 21.6.1 самостоятельно, либо использовать `nvm`:

```
nvm use
```

В этом проекте используется `yarn` и `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

- Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет

### Dev build

- Выполните команду `yarn dev` для запуска проекта в режиме разработки

  - Выполните команду `yarn dev --scope=client` чтобы запустить только клиент

  - Выполните команду `yarn dev --scope=server` чтобы запустить только сервер

### Production build

- Выполните команду `yarn build`
- Просмотр результата сборки

```
yarn preview --scope client
yarn preview --scope server
```

### Как добавить зависимости?

- Чтобы добавить зависимость для клиента

```
yarn lerna add {your_dep} --scope client
```

- Для сервера

```
yarn lerna add {your_dep} --scope server
```

- И для клиента и для сервера

```
yarn lerna add {your_dep}
```

- Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом dev

```
yarn lerna add {your_dep} --dev --scope server
```

## Тестирование

В проект используется unit и e2e тестирование

### Unit тестирование

Тестирование производится с помощью библиотеки jest. Для запуска тестов необходимо в терминале из папки client запустить скрипт:

```
yarn test:jest
```

### e2e тестирование

Тестирование производится с помощью библиотеки cypress. Для запуска тестов необходимо в терминале из папки client запустить скрипты:

- обычный запуск без запуска браузера

```
 yarn test:e2e:ci
```

- запуск тестов с отображением результата в браузере

```
yarn test:e2e:open
```

### Контроль качества кода

- Линтинг

```
yarn lint
```

- Форматирование prettier

```
yarn format
```

### Авторы

- [Никита Потокин](https://github.com/NPotokin)
- [Ольга Жижка](https://github.com/OlgaZhyzhka)
- [Евгения Бурлаченко](https://github.com/evgeniya-burlachenko)
- [Альберт Габдрахманов](https://github.com/GabdrahmanovAR)

### При наставничестве

- [Константин Качанов](https://github.com/holypower777)
