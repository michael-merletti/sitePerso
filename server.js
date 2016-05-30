var fs = require('fs');
var express = require('express');
var https = require('https');
var app = express();
var server = require('http').Server(app);
var serverIO = require('http').Server(app);
var path = require('path');
var jade = require('jade');
app.use('/statique', express.static('statique'));
app.set('view engine', 'jade');
app.set('views', 'statique/pages/jeuxmulti');
var url = 'mongodb://localhost:27017/jeuxmulti';
var MongoClient = require('mongodb').MongoClient;
var maBaseDeDonees;
var ObjectId = require('mongodb').ObjectID;
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
//var privateKey = fs.readFileSync('serveurkey/privatekey.key', 'utf8');
//var certificate = fs.readFileSync('serveurkey/certificatekey.crt', 'utf8');
//var credentials = {
//    key: privateKey,
//    cert: certificate
//};
//var httpsServer = https.createServer({
//    key: credentials.key,
//    cert: credentials.cert
//}, app).listen(443);

var store = new MongoDBStore({
    uri: url,
    collection: 'mySessions'
});
store.on('error', function (error) {
    assert.ifError(error);
    assert.ok(false);
});
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(session({
    secret: '123456789SECRET',
    store: store,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 36000000
    }
}));
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({
    extended: false
})
var bcrypt = require('bcrypt');


app.get('/', function (req, res) {
    res.sendFile('index.html', {
        root: path.join(__dirname, '/statique')
    });
})
app.get('/jeuxcv', function (req, res) {
    res.sendFile('indexJeuxCV.html', {
        root: path.join(__dirname, '/statique/pages/jeuxcv')
    });
})

app.get('/pages/jeuxcv/cv/cv.html', function (req, res) {
    res.sendFile('cv.html', {
        root: path.join(__dirname, '/statique/pages/jeuxcv/cv')
    });
})

app.get('/pages/cv', function (req, res) {
    res.sendFile('cv.html', {
        root: path.join(__dirname, '/statique/pages/jeuxcv/cv')
    });
})

app.get('/jeuxmulti', function (req, res) {
    res.render('indexJeuxMulti');
})

app.get('/jeuxmulti/enregistrement', function (req, res) {
    res.render('enregistrement');
})

app.post('/jeuxmulti/enregistrement', urlencodedParser, function (req, res) {
    var login = req.body.login;
    var maCollectionUsers = maBaseDeDonees.collection('users');
    maCollectionUsers.find({
        "login": login
    }).toArray(function (err, data) {
        if (err) {
            console.log('erreur')
        } else {
            if (data.length > 0) {
                console.log('login existe déja')
                res.render('enregistrement', {
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    login: 'ce login existe déjà',
                    email: req.body.email,
                    pwd: ''
                });
            } else {
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(req.body.pwd, salt, function (err, hash) {
                        if (err) {
                            console.log('erreur hash');
                        } else {
                            var maDate = new Date;
                            maBaseDeDonees.collection('users').insert({
                                nom: req.body.nom,
                                prenom: req.body.prenom,
                                login: req.body.login,
                                email: req.body.email,
                                photo: req.body.select,
                                parties: 0,
                                victoires: 0,
                                pwd: hash,
                                role: 3,
                                date: maDate
                            }, function () {
                                var maCollectionArticles = maBaseDeDonees.collection('users');
                                maCollectionArticles.find({
                                    login: req.body.login
                                }).toArray(function (err, data) {
                                    if (err) {
                                        console.log("collection introuvable");
                                    } else {
                                        req.session.login = login;
                                        var dataLogin = data;
                                        maCollectionUsers.find({}, {
                                            login: 1,
                                            parties: 1,
                                            victoires: 1
                                        }).sort({
                                            victoires: -1
                                        }).limit(5).toArray(function (err, data2) {
                                            if (err) {
                                                console.log('collection introuvable')
                                            } else {
                                                res.render('profil', {
                                                    dataLogin: dataLogin,
                                                    dataUsers: data2
                                                })
                                            }
                                        })
                                    }
                                })
                            })
                        }
                    });
                });
            }
        }
    })
});

app.post('/jeuxmulti/login', urlencodedParser, function (req, response) {

    var login = req.body.login;
    console.log(login);
    var pwd = req.body.pwd;
    console.log(pwd);
    var maCollectionUsers = maBaseDeDonees.collection('users');
    maCollectionUsers.find({
        login: login
    }).toArray(function (err, data) {
        if (data.length < 1) {
            console.log('erreur login');
            response.render('indexJeuxMulti', {
                login: 'erreur login ou mot de passe'
            });
        } else {
            bcrypt.compare(pwd, data[0].pwd, function (err, res) {
                if (data.length > 0 && res == true) {
                    var role = data[0].role;
                    maCollectionUsers.find({
                        login: login
                    }).toArray(function (err, data1) {
                        if (err) {
                            console.log("collection introuvable");
                        } else {
                            req.session.login = login;
                            req.session.role = role;
                            var dataLogin = data1;
                            maCollectionUsers.find({}, {
                                login: 1,
                                parties: 1,
                                victoires: 1
                            }).sort({
                                victoires: -1
                            }).limit(5).toArray(function (err, data2) {
                                if (err) {
                                    console.log('collection introuvable')
                                } else {
                                    response.render('profil', {
                                        dataLogin: dataLogin,
                                        dataUsers: data2
                                    })
                                }
                            })
                        }
                    })
                } else {
                    response.render('indexJeuxMulti', {
                        login: 'erreur login ou mot de passe'
                    })
                }
            });
        }
    })
})
var partieEnCours = false;
app.get('/jeuxmulti/jeux', function (req, res) {
    if (req.session.login) {
        login = req.session.login;
        maBaseDeDonees.collection('users').find({
            login: login
        }).toArray(function (err, data) {
            if (err) {
                console.log('login non trouvé')
            } else {
                if (!partieEnCours) {
                    console.log(data);
                    res.render('jeux', {
                        data: data
                    })
                } else {
                    console.log(req.session.login);
                    var maCollectionArticles = maBaseDeDonees.collection('users');
                    maCollectionArticles.find({}, {
                        login: 1,
                        parties: 1,
                        victoires: 1
                    }).sort({
                        victoires: -1
                    }).limit(5).toArray(function (err, data1) {
                        if (err) {
                            console.log("collection introuvable");
                        } else {
                            res.render('profil', {
                                dataLogin: data,
                                dataUsers: data1
                            })
                        }
                    })
                }
            }
        })
    } else {
        res.render('indexJeuxMulti');
    }
})
app.get('/jeuxmulti/partieEnCours', function (req, res, next) {
    console.log('ajax');
    res.json({
        partie: partieEnCours
    })
})
app.get('/jeuxmulti/profil', function (req, res) {
    if (req.session.login) {
        var login = req.session.login;
        var maCollectionUsers = maBaseDeDonees.collection('users');
        maCollectionUsers.find({
            login: login
        }).toArray(function (err, data1) {
            if (err) {
                console.log("collection introuvable");
            } else {
                var dataLogin = data1;
                maCollectionUsers.find({}, {
                    login: 1,
                    parties: 1,
                    victoires: 1
                }).sort({
                    victoires: -1
                }).limit(5).toArray(function (err, data2) {
                    if (err) {
                        console.log('collection introuvable')
                    } else {
                        res.render('profil', {
                            dataLogin: dataLogin,
                            dataUsers: data2
                        })
                    }
                })
            }
        })
    } else {
        res.render('indexJeuxMulti');
    }
})
const socketIo = require('socket.io');

var IOServer = socketIo(server);

var lesPersos = {};
var tableauPersos = [];
var tableauReady = [];
var login;
var image;
var collision = false;

IOServer.on('connection', function (socket) {
    console.log('connecté serveur');
    socket.on('login', function (data) {
        console.log(data);
        login = data.login;
        maBaseDeDonees.collection('users').find({
            login: login
        }).toArray(function (err, dataAray) {
            if (err) {
                console.log('erreur mongo')
            } else {
                console.log('conection réussi')
                console.log(dataAray);
                image = dataAray[0].photo;
                var monPerso = {
                    login: login,
                    top: '0px',
                    left: '0px',
                    id: socket.id,
                    width: '100px',
                    height: '100px',
                    position: 'relative',
                    backgroundImage: image,
                    marginTop: '2%'
                }
                lesPersos[monPerso.id] = monPerso;
                tableauPersos.push(monPerso);
                socket.emit('creationMonPerso', monPerso);
                socket.emit('creationTousLesPersos', lesPersos);
                socket.broadcast.emit('creationSonPerso', monPerso);

                socket.on('moveMonPerso', function (data) {
                    //        lesPersos[data.id].left = data.left;
                    socket.broadcast.emit('moveLesAutresPersos', data);
                })
                socket.on('ready', function (data) {
                    maBaseDeDonees.collection('users').update({
                        login: data.login
                    }, {
                        $inc: {
                            parties: 1
                        }
                    })
                    tableauReady.push(data);
                    console.log(tableauReady);
                })
                socket.on('collision', function (data) {
                    if (!collision) {
                        collision = true;
                        partieEnCours = false;
                        console.log('collision');
                        tableauReady.splice(0, tableauReady.length);
                        tableauPersos.splice(0, tableauPersos.length);
                        maBaseDeDonees.collection('users').update({
                            login: data.login
                        }, {
                            $inc: {
                                victoires: 1
                            }
                        })
                        socket.broadcast.emit('collisionServeur', data);
                    }
                })
                var intervalRemoveID = setInterval(function () {
                    for (index in lesPersos) {
                        if (!IOServer.sockets.connected[lesPersos[index].id]) {
                            IOServer.emit('removeLesPersos', lesPersos[index]);
                            delete lesPersos[index];
                            tableauReady.splice(0, 1);
                            tableauPersos.splice(0, 1);
                        };
                    };
                }, 50);
                var intervalReadyID = setInterval(function () {
                    if ((tableauPersos.length == tableauReady.length) && tableauPersos.length >= 2) {
                        partieEnCours = true;
                        socket.emit('allReady', {
                            goGame: true
                        });
                        clearInterval(intervalReadyID);
                    } else {
                        collision = false;
                        partieEnCours = false;
                    }
                }, 50);
            }
        })
    })

});

MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('erreur connection mongo')
    } else {
        maBaseDeDonees = db;
        //process.env.PORT
        server.listen(process.env.PORT, function () {
                console.log('le serveur fonctionne');
                console.log(process.env.PORT);
            })
            //        serverIO.listen(443, function () {
            //                console.log('serveur io fonctionne');
            //            })
            /*        httpsServer.listen(443, function () {
                        console.log('serveur S fonctionne');
                    });*/
    }
})