window.addEventListener('DOMContentLoaded', function () {
    var hulk = function () {
        ///////////////////// ANIMATION PERSO /////////////////////////////////////

        var masquePerso = window.document.getElementById('masque');
        var animationPerso = window.document.getElementById('perso');
        var idseTimeout;
        var coup = false;
        var attaqueSpeciale = function () {
            // image2
            idseTimeout = window.setTimeout(function () {
                coup = false;
                animationPerso.style.marginLeft = '-1605px';
                animationPerso.style.marginTop = '-683px';
                masquePerso.style.height = '309px';
                masquePerso.style.width = '182px';
                masquePerso.style.marginTop = '254px';
                window.setTimeout(function () {
                    // image3
                    coup = true;
                    document.body.children[7].play();
                    masquePerso.style.height = '146px';
                    masquePerso.style.width = '300px';
                    masquePerso.style.marginTop = '417px';
                    animationPerso.style.marginLeft = '-2121px';
                    animationPerso.style.marginTop = '-847px';
                    window.setTimeout(function () {
                        // retour image de départ
                        masquePerso.style.width = '252px';
                        masquePerso.style.height = '214px';
                        masquePerso.style.marginTop = '349px';
                        animationPerso.style.marginLeft = '-691px';
                        animationPerso.style.marginTop = '-777px';
                        $('#bloc').effect('bounce', 'easeInCubic', 10);
                    }, 200)
                }, 200)
            }, 200)
        };

        ////////////////// DEPLACEMENT GAUCHE ///////////////////////
        var hulkX = $('#masque').offset().left;
        var hulkY = $('#masque').offset().top;
        var hulkWidth = parseInt(hulkX + parseFloat($('#masque').width()));
        var hulkHeight = parseInt(hulkY + parseFloat($('#masque').height()));
        var leftIDtimeout;
        var rightIDtimeout;
        var topIDtimeout;
        var downIDtimeout;

        var moveLeft = function () {
            if (masquePerso.style.left == '') {
                masquePerso.style.left = '0px';
            } else {
                if ($('#masque').offset().left <= $('#bloc').offset().left + 10) {
                    $('#masque').offset().left = $('#bloc').offset().left + 10;
                } else {
                    masquePerso.style.left = parseFloat(masquePerso.style.left) - 5 + 'px';
                }
            }
            leftIDtimeout = window.setTimeout(moveLeft, 20)
        }

        /////////////////// DEPLACEMENT DROITE ///////////////////////////

        var moveRight = function () {
            if (masquePerso.style.left == '') {
                masquePerso.style.left = '0px';
            } else {
                if ($('#masque').offset().left + $('#masque').width() >= $('#bloc').offset().left + $('#bloc').width() - 50) {
                    $('#masque').offset().left = $('#bloc').offset().left + $('#bloc').width() - 50
                } else {
                    masquePerso.style.left = (parseFloat(masquePerso.style.left)) + 5 + 'px';
                }
            }
            rightIDtimeout = window.setTimeout(moveRight, 20)
        }

        /////////////////// DEPLACEMENT HAUT ///////////////////////////

        var moveTop = function () {
            if (masquePerso.style.top == '') {
                masquePerso.style.top = '0px';
            } else {
                if ($('#masque').offset().top <= $('#bloc').offset().top + ((15 * $('#bloc').height()) / 100)) {
                    $('#masque').offset().top = $('#bloc').offset().top + ((15 * $('#bloc').height()) / 100);
                } else {
                    masquePerso.style.top = (parseFloat(masquePerso.style.top)) - 5 + 'px';
                }
            }
            topIDtimeout = window.setTimeout(moveTop, 20)
        }

        /////////////////// DEPLACEMENT BAS ///////////////////////////

        var moveDown = function () {
            if (masquePerso.style.top == '') {
                masquePerso.style.top = '0px';
            } else {
                if ($('#masque').offset().top + $('#masque').height() >= $('#bloc').offset().top + $('#bloc').height()) {
                    $('#masque').offset().top = $('#bloc').offset().top + $('#bloc').height();
                } else {
                    masquePerso.style.top = (parseFloat(masquePerso.style.top)) + 5 + 'px';
                }
            }
            downIDtimeout = window.setTimeout(moveDown, 20)
        }

        //////////////// GESTION DES EVENEMENTS//////////////////

        var moveLeftEnCours = false;
        var moveRightEnCours = false;
        var moveTopEnCours = false;
        var moveDownEnCours = false;
        var attaqueEnCours = false;
        window.addEventListener('keydown', function (event) {
            var code = event.keyCode;

            switch (code) {
            case 37:
                if (!moveLeftEnCours && !moveRightEnCours) {
                    moveLeft();
                    moveLeftEnCours = true;
                }
                break;
            case 38:
                if (!moveTopEnCours && !moveTopEnCours) {
                    moveTop();
                    moveTopEnCours = true;
                }
                break;
            case 39:
                if (!moveRightEnCours && !moveLeftEnCours) {
                    moveRight();
                    moveRightEnCours = true;
                }
                break;
            case 40:
                if (!moveDownEnCours && !moveTopEnCours) {
                    moveDown();
                    moveDownEnCours = true;
                }
                break;
            case 13:
                if (attaqueEnCours == false) {
                    document.body.children[9].play();
                    attaqueSpeciale();
                    attaqueEnCours = true;
                }
                break;
            };
        });

        window.addEventListener('keyup', function (event) {
            var code = event.keyCode;

            switch (code) {
            case 37:
                window.clearTimeout(leftIDtimeout);
                moveLeftEnCours = false;
                break;
            case 38:
                window.clearTimeout(topIDtimeout);
                moveTopEnCours = false;
                break;
            case 39:
                window.clearTimeout(rightIDtimeout);
                moveRightEnCours = false;
                break;
            case 40:
                window.clearTimeout(downIDtimeout);
                moveDownEnCours = false;
                break;
            case 13:
                attaqueEnCours = false;
                window.clearTimeout(idseTimeout);
                break;
            };
        });
        ///////////// TABLEAU IMAGES /////////////////

        var tableauImgCompetences = ['/statique/pages/jeuxcv/images/logo_html.png', '/statique/pages/jeuxcv/images/logo_css3.png', '/statique/pages/jeuxcv/images/logo_js.png', '/statique/pages/jeuxcv/images/logo_jquery.png', '/statique/pages/jeuxcv/images/logo_jqueryUI.png', '/statique/pages/jeuxcv/images/logo_bootstrap.png', '/statique/pages/jeuxcv/images/logo_angular.jpg', '/statique/pages/jeuxcv/images/logo_mongo.png', '/statique/pages/jeuxcv/images/logo_nodejs.png', '/statique/pages/jeuxcv/images/logo_ajax.png', '/statique/pages/jeuxcv/images/logo_meteor.png', '/statique/pages/jeuxcv/images/rocher1.png'];

        ////////////// TABLEAU BLOCS COMPETENCES ////////////////////

        var tableauDivCompetences = [];
        var tableauDivRochers = [];
        var blocCompetencesVisible = true;

        var creationBlocCompetences = function () {

            for (var i = 0; i < 22; i++) {
                var maxTop = $('#bloc').height() - 150;
                var minTop = $('#bloc').offset().top + ((17 * $('#bloc').height()) / 100);
                var divCompetences = document.createElement('div');
                var imgCompetences = document.createElement('img');
                var largeurPage = $(window).width();
                $(imgCompetences).css('width', '150px');
                $(imgCompetences).css('width', '150px');
                $(divCompetences).append(imgCompetences);
                $('#bloc').append(divCompetences);
                $(divCompetences).css('position', 'absolute');
                $(divCompetences).css('left', largeurPage + 150 + 'px');
                $(divCompetences).css('height', '150px');
                $(divCompetences).css('overflow', 'hidden');
                $(divCompetences).css('top', Math.floor(Math.random() * (maxTop - minTop + 1)) + minTop + 'px');
                $(divCompetences).css('display', 'block');
                if (i < 11) {
                    imgCompetences.src = tableauImgCompetences[i];
                    tableauDivCompetences.push(divCompetences);
                } else {
                    imgCompetences.src = tableauImgCompetences[11];
                    tableauDivRochers.push(divCompetences);
                }

            };
        };

        ////////////////// DEMARAGE JEUX /////////////////////
        var collisionIDinterval;
        $('#masque1').click(function () {
            var baliseAudio = document.getElementById('audio');
            baliseAudio.volume = 0.2;
            $('#commentaires').fadeOut();
            $('#bloc').fadeIn();
            $('#masque1').css('display', 'none');
            $('#competences').css('display', 'block');
            creationBlocCompetences();
            animationBlocCompetencess();
            collisionIDinterval = window.setInterval(collision, 50);
        });

        ////////////////// ANIMATION DES BLOCS /////////////////////

        var index = 0;
        var index2 = 0;
        var timeOutID;
        var animationBlocCompetencess = function () {
            if (index < 11 & index2 < 11) {
                var choixTableau = Math.floor(Math.random() * (2 - 1 + 1) + 1);
                if (choixTableau == 1) {
                    $(tableauDivCompetences[index]).animate({
                        left: '-300px'
                    }, 7000, function () {
                        this.remove();
                    });
                    index++;
                } else {
                    if (choixTableau == 2) {
                        $(tableauDivRochers[index2]).animate({
                            left: '-300px'
                        }, 7000, function () {
                            this.remove();
                        });
                        index2++;
                    }
                }
            } else {
                if (index >= 11 && index2 < 11) {
                    $(tableauDivRochers[index2]).animate({
                        left: '-300px'
                    }, 7000, function () {
                        this.remove();
                    });
                    index2++;
                } else {
                    if (index < 11 && index2 >= 11) {
                        $(tableauDivCompetences[index]).animate({
                            left: '-300px'
                        }, 7000, function () {
                            this.remove();
                        });
                        index++;
                    } else {
                        resultat();
                    }
                }
            }
            timeOutID = window.setTimeout(animationBlocCompetencess, 5000);
        };

        ////////////////// RESULTAT /////////////////////

        var resultat = function () {
            var score = parseFloat($('#spanScore').text());
            if (index >= 11 && index2 >= 11) {
                if (score >= 500) {
                    document.body.children[10].play();
                    $('#winOrLose').text('YOU WIN !');
                    window.setInterval(FaireClignoterImage, 1000);
                    $('#resultat').css('display', 'block');
                    $('#lose').css('display', 'none');
                    window.clearInterval(collisionIDinterval);
                    window.clearTimeout(timeOutID);
                } else {
                    document.body.children[11].play();
                    $('#winOrLose').text('YOU LOSE !');
                    window.setInterval(FaireClignoterImage, 1000);
                    $('#resultat').css('display', 'block');
                    $('#win').css('display', 'none');
                    window.clearInterval(collisionIDinterval);
                    window.clearTimeout(timeOutID);
                }
            }
        }

        //////////////////// COLLISIONS //////////////////////////////

        var tableauPetiteImgCompetences = ['/statique/pages/jeuxcv/images/petitLogo/logo_html.png', '/statique/pages/jeuxcv/images/petitLogo/logo_css3.png', '/statique/pages/jeuxcv/images/petitLogo/logo_js.png', '/statique/pages/jeuxcv/images/petitLogo/logo_jquery.png', '/statique/pages/jeuxcv/images/petitLogo/logo_jqueryUI.png', '/statique/pages/jeuxcv/images/petitLogo/logo_bootstrap.png', '/statique/pages/jeuxcv/images/petitLogo/logo_angular.png', '/statique/pages/jeuxcv/images/petitLogo/logo_mongo.png', '/statique/pages/jeuxcv/images/petitLogo/logo_nodejs.png', '/statique/pages/jeuxcv/images/petitLogo/logo_ajax.png', '/statique/pages/jeuxcv/images/petitLogo/logo_meteor.png'];


        var collision = function () {
            var hulkX = $('#masque').offset().left;
            var hulkY = $('#masque').offset().top;
            var hulkWidth = parseInt($('#masque').offset().left + parseFloat($('#masque').width()));
            var hulkHeight = parseInt($('#masque').offset().top + parseFloat($('#masque').height()));

            for (var i = 0; i < tableauDivCompetences.length; i++) {
                var petitBouclier = document.body.children[4].children[i];

                var compX = $(tableauDivCompetences[i]).offset().left;
                var compY = $(tableauDivCompetences[i]).offset().top;
                var compWidth = parseInt($(tableauDivCompetences[i]).offset().left + parseFloat($(tableauDivCompetences[i]).width()));
                var compHeight = parseInt($(tableauDivCompetences[i]).offset().top + parseFloat($(tableauDivCompetences[i]).height()));
                var rocherX = $(tableauDivRochers[i]).offset().left;
                var rocherY = $(tableauDivRochers[i]).offset().top;
                var rocherWidth = parseInt($(tableauDivRochers[i]).offset().left + parseFloat($(tableauDivRochers[i]).width()));
                var rocherHeight = parseInt($(tableauDivRochers[i]).offset().top + parseFloat($(tableauDivRochers[i]).height()));
                if (hulkWidth > compX && hulkX < compWidth && hulkY < compHeight && hulkHeight > compY) {
                    $(tableauDivCompetences[i]).remove();
                    if (attaqueEnCours && coup) {
                        $('#spanScore').text(parseFloat($('#spanScore').text()) + 100);
                        petitBouclier.src = tableauPetiteImgCompetences[i];
                    } else {
                        document.body.children[8].play();
                        $('#spanScore').text(parseFloat($('#spanScore').text()) + 50);
                    }
                } else {
                    if (hulkWidth > rocherX && hulkX < rocherWidth && hulkY < rocherHeight && hulkHeight > rocherY) {
                        $(tableauDivRochers[i]).remove();
                        if (attaqueEnCours && coup) {
                            $('#spanScore').text(parseFloat($('#spanScore').text()) - 50);
                        } else {
                            document.body.children[8].play();
                            $('#spanScore').text(parseFloat($('#spanScore').text()) - 100);
                        }
                    }
                }
            }
        }

        ////////////// AFFICHAGE RESULTAT /////////////////

        $('#reload').click(function () {
            location.reload();
        })
        $('#monCv').click(function () {
            var cv = open('cv/cv.html', 'cv');
        })

        var FaireClignoterImage = function () {
            $("#winOrLose").fadeOut(900).delay(200).fadeIn(900);
        }
    }
    hulk();
})