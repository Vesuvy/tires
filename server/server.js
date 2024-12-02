const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const multer = require('multer'); // Для обработки загрузки файлов

const app = express();
app.use(bodyParser.json());
app.use(cors());

const dbPath = path.resolve(__dirname, 'products.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Пользователи (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      имя TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      пароль TEXT NOT NULL
  )`, (err) => {
      if (err) {
          console.error('Ошибка при создании таблицы "Пользователи":', err);
      } else {
          console.log('Таблица "Пользователи" создана или уже существует.');
      }
  });
});



db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Товары (
        id_товара INTEGER PRIMARY KEY AUTOINCREMENT,
        Название TEXT NOT NULL,
        Тип TEXT,
        Ширина TEXT,
        Диаметр TEXT,
        Профиль TEXT,
        Сезон TEXT,
        ВылетET TEXT,
        Фото TEXT,
        Продано TEXT DEFAULT 'Нет'
    )`, (err) => {
        if (err) {
            console.error('Ошибка при создании таблицы:', err);
        } else {
            console.log('Таблица "Товары" создана или уже существует.');
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS ХранениеШин (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        адрес TEXT,
        стоимость TEXT,
        дата_начала_хранения TEXT,
        дата_окончания_хранения TEXT,
        документ TEXT,
        фио TEXT,
        телефон TEXT,
        названия_шин TEXT
    )`, (err) => {
        if (err) {
            console.error('Ошибка при создании таблицы "ХранениеШин":', err);
        } else {
            console.log('Таблица "ХранениеШин" создана или уже существует.');
        }
    });
});

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Папка для сохранения загруженных файлов
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Уникальное имя файла
    }
});

const upload = multer({ storage: storage });

app.get('/products/active', (req, res) => {
    const sql = 'SELECT * FROM Товары WHERE Продано = "Нет"';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Ошибка при получении активных продуктов:', err);
            res.status(500).send('Ошибка при получении активных продуктов');
        } else {
            res.send(rows);
        }
    });
});

app.get('/products/archived', (req, res) => {
    const sql = 'SELECT * FROM Товары WHERE Продано = "Да"';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Ошибка при получении архивированных продуктов:', err);
            res.status(500).send('Ошибка при получении архивированных продуктов');
        } else {
            res.send(rows);
        }
    });
});

app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM Товары';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Ошибка при получении продуктов:', err);
            res.status(500).send('Ошибка при получении продуктов');
        } else {
            res.send(rows);
        }
    });
});

app.post('/products', upload.single('Фото'), (req, res) => {
    const { Название, Тип, Ширина, Диаметр, Профиль, Сезон, ВылетET, Продано } = req.body;
    const Фото = req.file ? req.file.path : null;
    const sql = `INSERT INTO Товары (Название, Тип, Ширина, Диаметр, Профиль, Сезон, ВылетET, Фото, Продано) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(sql, [Название, Тип, Ширина, Диаметр, Профиль, Сезон, ВылетET, Фото, Продано || 'Нет'], function(err) {
        if (err) {
            console.error('Ошибка при добавлении товара:', err);
            res.status(500).send('Ошибка при добавлении товара');
        } else {
            console.log('Товар добавлен:', { id: this.lastID, ...req.body, Фото });
            res.send('Товар добавлен');
        }
    });
});

app.put('/products/:id', upload.single('Фото'), (req, res) => {
    const { Название, Тип, Ширина, Диаметр, Профиль, Сезон, ВылетET, Продано } = req.body;
    const Фото = req.file ? req.file.path : null;
    const sql = `UPDATE Товары SET Название=?, Тип=?, Ширина=?, Диаметр=?, Профиль=?, Сезон=?, ВылетET=?, Фото=?, Продано=? WHERE id_товара=?`;
    db.run(sql, [Название, Тип, Ширина, Диаметр, Профиль, Сезон, ВылетET, Фото, Продано, req.params.id], function(err) {
        if (err) {
            console.error('Ошибка при обновлении товара:', err);
            res.status(500).send('Ошибка при обновлении товара');
        } else {
            res.send('Товар обновлен');
        }
    });
});

app.delete('/products/:id', (req, res) => {
    const sql = `DELETE FROM Товары WHERE id_товара=?`;
    db.run(sql, [req.params.id], function(err) {
        if (err) {
            console.error('Ошибка при удалении товара:', err);
            res.status(500).send('Ошибка при удалении товара');
        } else {
            res.send('Товар удален');
        }
    });
});

const bcrypt = require('bcrypt');

app.post('/register', async (req, res) => {
  const { имя, email, пароль } = req.body;
  const hashedPassword = await bcrypt.hash(пароль, 10);
  const sql = `INSERT INTO Пользователи (имя, email, пароль) VALUES (?, ?, ?)`;
  db.run(sql, [имя, email, hashedPassword], function(err) {
      if (err) {
          console.error('Ошибка при регистрации пользователя:', err);
          res.status(500).send('Ошибка при регистрации пользователя');
      } else {
          console.log('Пользователь зарегистрирован:', { id: this.lastID, ...req.body });
          res.send('Пользователь зарегистрирован');
      }
  });
});

app.post('/login', async (req, res) => {
  const { email, пароль } = req.body;
  const sql = `SELECT * FROM Пользователи WHERE email = ?`;
  db.get(sql, [email], async (err, row) => {
      if (err) {
          console.error('Ошибка при авторизации пользователя:', err);
          res.status(500).send('Ошибка при авторизации пользователя');
      } else if (row && await bcrypt.compare(пароль, row.пароль)) {
          res.send('Авторизация прошла успешно');
      } else {
          res.status(401).send('Неверный email или пароль');
      }
  });
});

// Получение всех записей о хранении шин
app.get('/tire-storages', (req, res) => {
    const sql = 'SELECT * FROM ХранениеШин';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Ошибка при получении данных о хранении шин:', err);
            res.status(500).send('Ошибка при получении данных о хранении шин');
        } else {
            res.send(rows);
        }
    });
});

// Добавление новой записи о хранении шин
app.post('/tire-storages', (req, res) => {
    const { адрес, стоимость, дата_начала_хранения, дата_окончания_хранения, документ, фио, телефон, названия_шин } = req.body;
    const sql = `INSERT INTO ХранениеШин (адрес, стоимость, дата_начала_хранения, дата_окончания_хранения, документ, фио, телефон, названия_шин) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(sql, [адрес, стоимость, дата_начала_хранения, дата_окончания_хранения, документ, фио, телефон, названия_шин], function(err) {
        if (err) {
            console.error('Ошибка при добавлении записи о хранении шин:', err);
            res.status(500).send('Ошибка при добавлении записи о хранении шин');
        } else {
            console.log('Запись о хранении шин добавлена:', { id: this.lastID, ...req.body });
            res.send('Запись о хранении шин добавлена');
        }
    });
});

// Обновление записи о хранении шин
app.put('/tire-storages/:id', (req, res) => {
    const { адрес, стоимость, дата_начала_хранения, дата_окончания_хранения, документ, фио, телефон, названия_шин } = req.body;
    const sql = `UPDATE ХранениеШин SET адрес=?, стоимость=?, дата_начала_хранения=?, дата_окончания_хранения=?, документ=?, фио=?, телефон=?, названия_шин=? WHERE id=?`;
    db.run(sql, [адрес, стоимость, дата_начала_хранения, дата_окончания_хранения, документ, фио, телефон, названия_шин, req.params.id], function(err) {
        if (err) {
            console.error('Ошибка при обновлении записи о хранении шин:', err);
            res.status(500).send('Ошибка при обновлении записи о хранении шин');
        } else {
            res.send('Запись о хранении шин обновлена');
        }
    });
});

// Удаление записи о хранении шин
app.delete('/tire-storages/:id', (req, res) => {
    const sql = `DELETE FROM ХранениеШин WHERE id=?`;
    db.run(sql, [req.params.id], function(err) {
        if (err) {
            console.error('Ошибка при удалении записи о хранении шин:', err);
            res.status(500).send('Ошибка при удалении записи о хранении шин');
        } else {
            res.send('Запись о хранении шин удалена');
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));