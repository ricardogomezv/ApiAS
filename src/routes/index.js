//const functions = require('firebase-functions');
const admin = require('firebase-admin');

var serviceAccount = require("../../api-as1-firebase-adminsdk-pdsa6-fcc463fdc3.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://api-as1.firebaseio.com/'
});

const db = admin.database();

const { Router } = require('express');
const router = Router();
const bodyParser = require('body-parser');

router.get('/', (req, res) =>{
    db.ref('usuario').once('value', (snapshot) =>{
        const data = snapshot.val();
        res.render('index', { usuario :data });
    });
    
});

router.get('/', (req, res) =>{
    db.ref('historial').once('value', (snapshot) =>{
        const data = snapshot.val();
        res.render('index', { historial :data});
    });
    
});

router.post('/new-usuario', (req,res)=>{
    console.log(req.body);
    const newUsuario = {
        nombre: req.body.nombre,
        correo: req.body.correo, 
        password: req.body.password,
        edad: req.body.edad,
        genero: req.body.genero, 
        idHistorial: req.body.idHistorial
    }
    db.ref('usuario').push(newUsuario);
    res.redirect('/');
});

router.post('/new-historial', (req,res)=>{
    console.log(req.body);
    const newHistorial = {
        hora: req.body.hora,
        temperatura: req.body.temperatura
    };
    db.ref('historial').push(newHistorial);
    res.redirect('/');
});

router.get('/delete-usuario/:id', (req, res) => {
    db.ref('usuario/' + req.params.id).remove();
    res.redirect('/');
});

router.get('/delete-historial/:id', (req, res) => {
    db.ref('historial/' + req.params.id).remove();
    res.redirect('/');
});

module.exports = router;