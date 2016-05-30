window.addEventListener('DOMContentLoaded', function () {
    //'https://www.michaelmerletti.com:443'
    var socket = io('https://ws.michaelmerletti.com:443');
    var goGame = false;
    var ready = false;
    var tableauIdPersos = [];
    var compteur = 0;
    var idMonPerso;
    var monPerso;
    var login = $('#login').text();
    var progressionPerso = ((5 * window.innerWidth) / 100)
    var divClick = window.document.getElementById('divClick');
    var ramdomPx = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min + 'px';
    }
    $('#ready').click(function () {
        if (!ready) {
            ready = true;
            $(this).css('backgroundColor', 'green');
            socket.emit('ready', {
                login: login,
                ready: true
            })
        }
    })
    socket.emit('login', {
        login: login
    })

    socket.on('creationMonPerso', function (data) {
        console.log('connecté');
        var divMonPerso = window.document.createElement('div');
        idMonPerso = data.id;
        divMonPerso.id = data.id;
        divMonPerso.login = data.login;
        tableauIdPersos.push(divMonPerso);
        divMonPerso.style.top = data.top;
        divMonPerso.style.left = data.left;
        divMonPerso.style.width = data.width;
        divMonPerso.style.height = data.width;
        divMonPerso.style.position = data.position;
        var bloc = window.document.getElementById('bloc');
        bloc.appendChild(divMonPerso);
        var imageMonPerso = window.document.createElement('img');
        imageMonPerso.src = '/statique/pages/jeuxmulti/images/' + data.backgroundImage;
        divMonPerso.appendChild(imageMonPerso);
        monPerso = window.document.getElementById(idMonPerso);
        divClick.addEventListener('click', function () {
            if (goGame) {
                divClick.style.top = ramdomPx(0, window.innerHeight - 200);
                divClick.style.left = ramdomPx(0, window.innerWidth - 200);
                monPerso.style.left =
                    parseFloat(monPerso.style.left) + progressionPerso + 'px';
                socket.emit('moveMonPerso', {
                    id: data.id
                })
            }
        })
    })
    socket.on('creationSonPerso', function (data) {
        var sonPerso = window.document.getElementById(data.id);
        if (!sonPerso) {
            var sonPerso = window.document.createElement('div');
            sonPerso.id = data.id;
            sonPerso.login = data.login;
            tableauIdPersos.push(sonPerso);
            sonPerso.style.top = data.top;
            sonPerso.style.left = data.left;
            sonPerso.style.width = data.width;
            sonPerso.style.height = data.height;
            sonPerso.style.position = data.position;
            sonPerso.style.marginTop = '10px';
            var bloc = window.document.getElementById('bloc');
            bloc.appendChild(sonPerso);
            var imageSonPerso = window.document.createElement('img');
            imageSonPerso.src = '/statique/pages/jeuxmulti/images/' + data.backgroundImage;
            sonPerso.appendChild(imageSonPerso);
        }
    })
    socket.on('creationTousLesPersos', function (data) {
        for (index in data) {
            var sonPerso = window.document.getElementById(data[index].id);
            if (!sonPerso) {
                var sonPerso = window.document.createElement('div');
                sonPerso.id = data[index].id;
                sonPerso.login = data[index].login;
                tableauIdPersos.push(sonPerso);
                sonPerso.style.top = data[index].top;
                sonPerso.style.left = data[index].left;
                sonPerso.style.width = data[index].width;
                sonPerso.style.height = data[index].width;
                sonPerso.style.position = 'relative';
                sonPerso.style.marginTop = '10px';
                var monPerso = window.document.getElementById(socket.id);
                var bloc = window.document.getElementById('bloc');
                bloc.appendChild(sonPerso);
                var imageSonPerso = window.document.createElement('img');
                imageSonPerso.src = '/statique/pages/jeuxmulti/images/' + data[index].backgroundImage;
                sonPerso.appendChild(imageSonPerso);
            }
        }
    })
    socket.on('removeLesPersos', function (data) {
        var lePerso = window.document.getElementById(data.id);
        if (lePerso) {
            console.log(data.id);
            lePerso.remove();
            tableauIdPersos.splice(tableauIdPersos.indexOf(data.id), 1)
            console.log(tableauIdPersos);
        };
    });
    socket.on('allReady', function (data) {
        $('#start').fadeOut(400, function () {
            $('#trois').fadeIn(400, function () {
                $('#trois').fadeOut(400, function () {
                    $('#deux').fadeIn(400, function () {
                        $('#deux').fadeOut(400, function () {
                            $('#un').fadeIn(400, function () {
                                $('#un').fadeOut(400, function () {
                                    $('#go').fadeIn(400, function () {
                                        $('#go').fadeOut(400, function () {
                                            console.log('terminé');
                                            goGame = true;
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    socket.on('moveLesAutresPersos', function (data) {
        console.log('interval remove');
        var lePerso = window.document.getElementById(data.id);
        if (lePerso) {
            lePerso.style.left = parseFloat(lePerso.style.left) + progressionPerso + 'px';
        }
    })
    var intervalCollisionID = window.setInterval(function () {
        console.log('interval collision');
        for (var i = 0; i < tableauIdPersos.length; i++) {
            var left = parseFloat(window.document.getElementById(tableauIdPersos[i].id).style.left) + parseFloat(window.document.getElementById(tableauIdPersos[i].id).style.width);
            var damier = parseFloat($('#win').css('left'));
            if (left >= damier) {
                $('#fin').css('display', 'block');
                $('#winner').text(tableauIdPersos[i].login + ' is the winner!!');
                socket.emit('collision', tableauIdPersos[i]);
                //                clearInterval(intervalCollisionID);
            }
        }
    }, 500);
    socket.on('collisionServeur', function (data) {
        $('#fin').css('display', 'block');
        console.log(data);
        console.log(data + 'a gagné');
    })
});