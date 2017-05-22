$(document).ready(function() {
    $('#log').hide();
    $('#reg').hide();
    $('#header-main').off('click');

    $('#login').on('click', function() {
        $('#reg').hide();
        $('#log').slideDown();
        $('#header-main').css('pointer-events', 'none');
        $('#nav-list').css('pointer-events', 'none');

    });
    $('#register').on('click', function() {
        $('#log').hide();
        $('#reg').slideDown();
        $('#nav-list').css('pointer-events', 'none');
        $('#header-main').css('pointer-events', 'none');
    });
    $('.cancel').on('click', function() {
        $('#reg').hide();
        $('#log').hide();

        $('#header-main').css('pointer-events', 'auto');
        $('#nav-list').css('pointer-events', 'auto');

    });

    /*
        function succesfuls() {
            $('#success').siblings.forEach(function(item) {
                $(item).hide();
            });
            $('#success').css({ 'height': '30px' }, { 'fontSize': '20px' }, { 'marginTop': '30px' }, { 'textAlign': 'center' });

        }*/

    $('#repassword').on('focus', function(event) {
        $('#repasswordError').html('');
    });
    $('#repassword').on('blur', function() {
        if ($(this).val() !== $('#password').val()) {
            $('#repasswordError').html('两次输入的密码不一致!');

        }
    });

});

function moni() {
    $('#publish-submit').click();
}