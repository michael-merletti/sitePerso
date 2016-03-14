window.addEventListener('DOMContentLoaded', function () {
    var pageAccueil = function () {
        ////////////// AFFICHAGE DU PS /////////////////

        $('#psCache').mouseover(function () {
            $('#ps').css('display', 'block');
        })
        $('#psCache').mouseout(function () {
            $('#ps').css('display', 'none');
        })
        var musique = true;

        ////////////// GESTION DU SON /////////////////

        $('#son').click(function () {
            if (musique) {
                document.body.children[6].pause();
                musique = false;
                $('#son').removeClass("fi-volume").addClass("fi-volume-strike");
            } else {
                document.body.children[6].play();
                musique = true;
                $('#son').removeClass("fi-volume-strike").addClass("fi-volume");
            }
        })
    }
    pageAccueil();
})