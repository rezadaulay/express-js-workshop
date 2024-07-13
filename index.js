const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');

const app = express()
const port = 3000

// app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars'); // set default template engine
app.set('views', './views'); // set folder template di `/views`

const config = {
    db: {
      host: "127.0.0.1", // host mysql
      user: "root", // user mysql
      password: "123456", // password mysql
      database: "todoapp_db", // nama database mysql
      connectTimeout: 60000
    }
};
const connection = mysql.createConnection(config.db);



app.get('/', (req, res) => {
    connection.query(`SELECT * FROM todo_list`,
        (err, rows, fields) => {
        // secara default akan menghentikan proses ketika terjadi error
        if (err instanceof Error) {
          console.log(err);
          return res.send('Terjadi error, cek log')
        }

        // return res.send(rows)  // munculkan isi table
        // return res.render('listing');
        return res.render('listing', {
            todos: rows
        });
    });
})

app.get('/create', (req, res) => {
    res.render('create');
})

// app.post('/create', (req, res) => {
//     console.log('req.body', req.body)
//     return res.send([
//         'data yang diterima', req.body
//     ]);
// })


app.post('/create', (req, res) => {
    // Gunakan Form-Data
    
    connection.query(`INSERT INTO todo_list (name, description) VALUES ("${req.body.name}", "${req.body.description}")`,
        (err, result, fields) => {
        // secara default akan menghentikan proses ketika terjadi error
        if (err instanceof Error) {
          console.log(err);
          return res.send('Terjadi error, cek log')
        }

        // return res.redirect('/');
        return res.send(
            'Data berhasil tersimpan dengan ID: ' + result.insertId
        );
    });
});

app.get('/detail/:id', (req, res) => {
    // gunakan req.params.id untuk mendapatkan parameter :id
    connection.query(`SELECT * FROM todo_list WHERE id = ${req.params.id} LIMIT 1`,
        (err, rows, fields) => {
        // secara default akan menghentikan proses ketika terjadi error
        if (err instanceof Error) {
          console.log(err);
          return res.send('Terjadi error, cek log')
        }
        const todo = rows[0];
        // res.send(`Memuat todo. Judul: ${todo.name} , Description: ${todo.description}`)
        res.render('detail', {
            todo: todo
        });
    });
});


app.get('/delete/:id', (req, res) => {    
    connection.query(`DELETE FROM todo_list WHERE id = ${req.params.id}`,
        (err, result, fields) => {
        // secara default akan menghentikan proses ketika terjadi error
        if (err instanceof Error) {
          console.log(err);
          return res.send('Terjadi error, cek log')
        }

        return res.send(
            'Berhasil menghapus data dengan ID: ' + req.params.id
        );
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})