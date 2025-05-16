const express = require('express');
const { body, validationResult, check } = require('express-validator');
const { loadIni, tambahData } = require('./utils/setter');

const app = express();
const port = 5500;

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');



// Build in Middleware static
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mulai req respons
app.get('/', (req, res) => {
    res.send(loadIni());
});

app.post('/jet', [
    check('ini').notEmpty().withMessage('ini tidak boleh kosong'),
    body('pass').custom((value) => {
        if(!value === 'qwe'){
            throw new Error('you who >?');
        }
        return true;
    })
], (req, res) => {
        var inian = req.body

        // setiap post harus disertai password yaitu qwe
        // dan setelah itu password dihapus
        delete inian['pass'];

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            console.log(errors);
            for(err in errors.array()){
                console.log(err.msg);
            }
            res.send("data tidak valid");
        } else {
            tambahData(inian);
            res.send(inian);
        }
});















app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});