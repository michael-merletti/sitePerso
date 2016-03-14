$(document).ready(function () {

    var intervalPartieID = window.setInterval(function () {
        $.get('/jeuxmulti/partieEnCours', function (data) {
            if (data.partie) {
                $('#partie').text('une partie est cours merci de patienter...');
                $('#partie').css('background-color', '#D9534F');
            } else {
                $('#partie').text('vous pouvez lancer une nouvelle partie!');
                $('#partie').css('background-color', '#5CB85C');
            }
        });
    }, 500);

});