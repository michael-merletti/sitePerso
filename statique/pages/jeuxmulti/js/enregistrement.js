window.addEventListener('DOMContentLoaded', function () {
    $('select').change(function () {
        var source = $('select option:selected').val();
        console.log($('select option:selected').text());
        $('#imageProfil').attr('src', '/statique/pages/jeuxmulti/images/' + source);
    })
})