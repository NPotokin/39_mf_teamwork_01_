# Документация игры

## Описание игры

### Сценарий

Классичексая бродилка, в которой задача игрока - собирать объекты (тыквы) и избегать столкновения с врагами(тиграми), обходя препятствия.

### Механики игры

Игра представляет собой 2D приключение, в котором игрок управляет персонажем (пандой), перемещающимся по игровому полю, собирая кристаллы (тыквы) и избегая столкновений с врагами (тиграми). Цель игры — собрать все кристаллы, не столкнувшись с врагами. Игрок побеждает, когда все кристаллы собраны, и проигрывает, если происходит столкновение с врагом. Игрок, враги и тыквы представлены квадратами со стороной 40 пикселей. За один ход Игрок передвигается на 20 пикселей, а враги на 40 пикселей. Подсчитывается количество секунд и шагов.

### Основные принципы кода

#### Структура кода

Компонент `Game` является основным компонентом, управляющим логикой игры. В нем используются React хуки для управления состояниями и эффектами:

- **Ссылки и состояния:**
  - `canvasRef` — ссылка на HTML-канвас, где происходит отрисовка игры.
  - `timerRef` — ссылка на таймер, который отсчитывает время игры.
  - `obstacles`, `canvasSize` — хранятся параметры препятствий и размеры канваса, вычисляемые с помощью `useMemo`.
  - `isStartModalVisible`, `isGameOverVisible`, `isGameWinVisible` — состояния, управляющие видимостью различных модальных окон - начала игры и двух вариантов ее завершения (победа/поражение)
  - `time`, `steps` — состояния для хранения времени игры и количества шагов игрока.
  - `playerPosition`, `gems`, `enemies` — состояния для управления позициями игрока, кристаллов и врагов.
  - `imagesLoaded`, `images` — состояния для управления загрузкой изображений, необходимых для отрисовки объектов.


#### Игровые константы
Размер поля `<canvas></canvas>`, координаты и ширина/высота Игрока, врагов, препятствий и тыкв, а также шаг Игрока и Врагов прописаны в файле `constants.ts` и подружаются оттуда.

*Пример констант игрока:*

```
  player: {
    width: 40,
    height: 40,
    step: 20,
    startPosition: {
      x: 0,
      y: 0,
    },
  }
```

#### Прогрузка изображений

В `useEffect` осуществляется предварительная загрузка изображений для всех игровых объектов, чтобы избежать проблем с отрисовкой при использовании `requestAnimationFrame`

#### Отрисовка объектов

Используются функции `drawObstacles`, `drawGems`, `drawPlayer`, `drawEnemies` для отрисовки соответствующих объектов на канвасе. Эти функции вызываются в основном игровом цикле. 

*Пример отрисовки врагов:*

```
    const drawEnemies = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      enemies.forEach(enemy => {
        ctx.drawImage(
          images.tiger,
          enemy.x,
          enemy.y,
          Constants.enemy.width,
          Constants.enemy.height
        )
      })
    },
    [enemies, images.tiger]
  )
```

#### Обработка событий

Функция `handleStartModalButton` запускает игру, скрывает все модальные окна, устанавливает позиции Игрока, тыкв, врагов и препятствий, обнуляет шаги и время и запускает отсчет времени.

Функция `handleKeyDown` обрабатывает нажатия клавиш, чтобы двигать персонажа, проверять столкновения с врагами, препятствиями и стенами, а также собирать кристаллы. При столкновении с врагом игра заканчивается поражением, при сборе всех кристаллов — победой.

Функция `handleVictory` вызывается при сборе Игроком всех тыкв, обнуляет ссылку на таймер игры и вызывает модальное окно победы в игре, из которого можно либо начать игру заново, либо перейти на домашнюю страницу.

Функция `handleDefeat` вызывается при столкновении Игрока с Врагом, обнуляет ссылку на таймер игры и вызывает модальное окно поражения в игре, из которого можно либо начать игру заново, либо перейти на домашнюю страницу.

*Пример обработки события запуска игры:*

```
  const handleStartModalButton = () => {
    setIsStartModalVisible(false)
    setIsGameWinVisible(false)
    setIsGameOverVisible(false)
    setPlayerPosition(Constants.player.startPosition)
    setSteps(1)
    setTime(0)
    setGems(Constants.gems.startPositions)
    setEnemies(Constants.enemy.startPositions)

    timerRef.current = setInterval(() => {
      setTime(prevSeconds => prevSeconds + 1)
    }, 1000)
  }
```

#### Основной игровой цикл

В `useEffect` происходит настройка основного игрового цикла, где через `requestAnimationFrame` осуществляется постоянная перерисовка канваса с обновленными позициями врагов и игрока.

#### Управление модальными окнами

Функции `handleStartModalButton`, `handleVictory`, `handleDefeat` управляют состояниями для показа или скрытия различных модальных окон (старт игры, победа, поражение) и позволяют либо запустить игру, либо вернуться на главную страницу.

*Пример запуска модального окна события поражения:*

```
  const handleDefeat = () => {
    setIsGameOverVisible(true)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }
```

### Взаимодействие компонентов

Компонент `GameModal` используется для отображения модальных окон с различными сообщениями и кнопкой для начала новой игры.

Игровое состояние управляется через хуки React, а отрисовка — через канвас, что позволяет обновлять состояние игры в реальном времени и взаимодействовать с пользователем через клавиатуру.

*Пример использования компонента GameModal:*

```
   <GameModal
      visible={isStartModalVisible}
      imageSrc={pandaStart}
      title={'Start the game'}
      subtitle={'Are you ready?'}
      onYesClick={handleStartModalButton}
   />
```

## Логика расчета шагов игрока и врагов

### Логика перемещения игрока

1. **Обработка нажатий клавиш:**
   - При нажатии клавиш `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight` вызывается функция `handleKeyDown`.
   - В этой функции вычисляется новое положение игрока, исходя из текущей позиции и направления движения. Шаг движения фиксирован и равен 20 пикселям.

2. **Проверка столкновений:**
   - Проверяется, не столкнулся ли игрок с врагами (`isCollidingWithEnemies`). Если произошло столкновение, вызывается функция `handleDefeat`, и игра заканчивается поражением.
   - Проверяется, не столкнулся ли игрок с препятствиями или стенами (`isCollidingWithObstaclesOrWalls`). Если произошло столкновение, позиция игрока не изменяется.
   - Проверяется, собрал ли игрок кристалл. Если игрок пересекается с позицией кристалла, кристалл удаляется из массива `gems`. Если все кристаллы собраны, вызывается функция `handleVictory`, и игра заканчивается победой.

3. **Обновление состояний:**
   - После проверки всех условий обновляется состояние позиции игрока и количество шагов (`steps`).

### Логика перемещения врагов

1. **Процесс перемещения:**
   - Позиции врагов обновляются в функции `handleKeyDown`, которая вызывается при каждом нажатии клавиши.
   - Для каждого врага выбирается случайное направление движения (`up`, `down`, `left`, `right`) и происходит перемещение на фиксированный шаг, равный 40 пикселям.

2. **Проверка столкновений:**
   - Проверяется, не сталкивается ли враг со стенами (`isCollidingWithWalls`). Если произошло столкновение, позиция врага не изменяется.
   - Проверяется, не сталкивается ли враг с кристаллами (`isCollidingWithGems`). Если произошло столкновение, позиция врага не изменяется.
   - Проверяется, не сталкивается ли враг с препятствиями (`isCollidingWithObstacles`). Если произошло столкновение, позиция врага не изменяется.
   - Проверяется, не столкнулся ли враг с игроком (`isCollidingWithPlayer`). Если произошло столкновение, вызывается функция `handleDefeat`, и игра заканчивается поражением.

3. **Обновление состояний:**
   - После проверки всех условий обновляется состояние позиции врага.

*Пример вычисления столкновения игрока с врагом:*

```
   const isCollidingWithEnemies = enemies.some(
         enemy =>
         x < enemy.x + Constants.enemy.width &&
         x + Constants.player.width > enemy.x &&
         y < enemy.y + Constants.enemy.height &&
         y + Constants.player.height > enemy.y
      )

      if (isCollidingWithEnemies) {
         handleDefeat()
      }
```

Таким образом, логика игры обеспечивает динамическое взаимодействие между игроком, врагами, кристаллами и препятствиями, создавая интересный и сложный игровой процесс.

## Заключение
Документация предоставляет подробное описание основных аспектов игровой логики, структуры кода и взаимодействия компонентов. Описаны механики игры, логика перемещения игрока и врагов, обработка событий победы и поражения, управление состояниями и отрисовка объектов на канвасе. Это обеспечивает полное понимание работы игры и ее компонентов для разработчиков и конечных пользователей.