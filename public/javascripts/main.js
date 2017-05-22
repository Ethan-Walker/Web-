$(document).ready(function() {

    $('#pic ul:eq(0) li').hide();
    $('#pic ul:eq(0) li').eq(0).show();
    /*轮播图*/
    $('#dir_left,#dir_right').hide();
    var banner = setInterval(changePic, 3000);

    $('#pic').hover(function() {
        $('#dir_left,#dir_right').fadeIn(500);

    }, function() {
        $('#dir_left,#dir_right').stop();
        $('#dir_left,#dir_right').fadeOut(300);
    });
    $('#order li').hover(function() {
        $('#order li').removeClass('chaPic');
        $(this).addClass('chaPic');
        var index = $(this).index();
        $('#pic ul:eq(0) li').hide();
        $('#pic ul:eq(0) li').eq(index).fadeIn(500);
        clearInterval(banner);

    }, function() {

        banner = setInterval(changePic, 3000);
    });

    function changePic() {
        var index = $('#pic ul li:visible').index();
        var next_index = (index < 4) ? (index + 1) : 0;
        $('#order li').removeClass('chaPic');
        $('#order li').eq(next_index).addClass('chaPic');
        $('#pic ul:eq(0) li').hide();
        $('#pic ul:eq(0) li').eq(next_index).fadeIn(500);

    }

    $('#dir_right').on('click', function() {
        clearInterval(banner);
        changePic();
        banner = setInterval(changePic, 3000);

    });
    $('#dir_left').on('click', function() {
        clearInterval(banner);
        var index = $('#pic ul li:visible').index();
        var next_index = (index > 0) ? (index - 1) : 4;
        $('#order li').removeClass('chaPic');
        $('#order li').eq(next_index).addClass('chaPic');
        $('#pic ul:eq(0) li').hide();
        $('#pic ul:eq(0) li').eq(next_index).fadeIn(500);
        banner = setInterval(changePic, 3000);
    });



    /*链接*/
    $('#nav li a').hover(function() {
        $(this).siblings().css('backgroundColor', 'rgba(0,0,0,0.1)');
        $(this).animate({
            'font-family': '微软雅黑',
            'backgroundColor': '#33ACFF'
        }, 300);
    }, function() {
        $(this).stop();
        $(this).animate({ 'backgroundColor': 'rgba(0,0,0,0.1)' }, 100);
    });

    $('#link-index').hover(function() {
        $(this).animate({
            'position': 'absolute',
            'backgroundColor': 'rgba(204, 102, 255, 1)',
            'height': '+=25px',
            'width': '+=23px',
            'left': '0px',
            'top': '0px',
            'fontSize': '34px',
            // 'color': 'black',
            // 'fontFamily': '微软雅黑'


        }, 500);

    }, function() {
        $(this).animate({
            'position': 'static',
            'backgroundColor': 'rgba(204, 102, 255, 0.8)',
            'height': '-=25px',
            'width': '-=23px',
            'left': '7%',
            'top': '5%',
            'fontSize': '25px',
            // 'color': 'white'
            // 'fontFamily': '华文行楷'
        }, 300);
    });
    $('#link-card').hover(function() {
        $(this).animate({
            'position': 'absolute',
            'backgroundColor': 'rgba(255, 102, 102, 1)',
            'height': '+=25px',
            'width': '+=23px',
            'left': '0px',
            'top': '0px',
            'fontSize': '34px',
            // 'color': 'black',
            // 'fontFamily': '微软雅黑'


        }, 500);

    }, function() {
        $(this).animate({
            'position': 'static',
            'backgroundColor': 'rgba(255, 102, 102, 0.8)',
            'height': '-=25px',
            'width': '-=23px',
            'left': '7%',
            'top': '5%',
            'fontSize': '25px',
            // 'color': 'white'
            // 'fontFamily': '华文行楷'
        }, 300);
    });


    $('#link-ruijie').hover(function() {
        $(this).animate({
            'position': 'absolute',
            'backgroundColor': 'rgba(153, 0, 255, 1)',
            'height': '+=25px',
            'width': '+=23px',
            'left': '0px',
            'top': '0px',
            'fontSize': '34px',
            // 'color': 'black',
            // 'fontFamily': '微软雅黑'


        }, 500);

    }, function() {
        $(this).animate({
            'position': 'static',
            'backgroundColor': 'rgba(153, 0, 255, 0.8)',
            'height': '-=25px',
            'width': '-=23px',
            'left': '7%',
            'top': '5%',
            'fontSize': '25px',
            // 'color': 'white'
            // 'fontFamily': '华文行楷'
        }, 300);
    });


    $('#aoxiang').hover(function() {
        $(this).animate({
            'position': 'absolute',
            'backgroundColor': 'rgba(255, 102, 51, 1)',
            'height': '+=25px',
            'width': '+=23px',
            'left': '0px',
            'top': '0px',
            'fontSize': '34px',
            // 'color': 'black',
            // 'fontFamily': '微软雅黑'


        }, 500);

    }, function() {
        $(this).animate({
            'position': 'static',
            'backgroundColor': 'rgba(255, 102, 51, 0.8)',
            'height': '-=25px',
            'width': '-=23px',
            'left': '7%',
            'top': '5%',
            'fontSize': '25px',
            // 'color': 'white'
            // 'fontFamily': '华文行楷'
        }, 300);
    });

    $('#picture').hover(function() {
        $(this).animate({
            'position': 'absolute',
            'backgroundColor': 'rgba(51, 153, 0, 1)',
            'height': '+=25px',
            'width': '+=23px',
            'left': '0px',
            'top': '0px',
            'fontSize': '34px',
            // 'color': 'black',
            // 'fontFamily': '微软雅黑'


        }, 500);

    }, function() {
        $(this).animate({
            'position': 'static',
            'backgroundColor': 'rgba(51, 153, 0, 0.8)',
            'height': '-=25px',
            'width': '-=23px',
            'left': '7%',
            'top': '5%',
            'fontSize': '25px',
            // 'color': 'white'
            // 'fontFamily': '华文行楷'
        }, 300);
    });


    $('#sansi').hover(function() {
        $(this).animate({
            'position': 'absolute',
            'backgroundColor': 'rgba(153, 0, 51, 1)',
            'height': '+=25px',
            'width': '+=23px',
            'left': '0px',
            'top': '0px',
            'fontSize': '34px',
            // 'color': 'black',
            // 'fontFamily': '微软雅黑'


        }, 500);

    }, function() {
        $(this).animate({
            'position': 'static',
            'backgroundColor': 'rgba(153, 0, 51, 0.8)',
            'height': '-=25px',
            'width': '-=23px',
            'left': '7%',
            'top': '5%',
            'fontSize': '25px',
            // 'color': 'white'
            // 'fontFamily': '华文行楷'
        }, 300);
    });

    $('#pt').hover(function() {
        $(this).animate({
            'position': 'absolute',
            'backgroundColor': 'rgba(51, 153, 51, 1)',
            'height': '+=25px',
            'width': '+=23px',
            'left': '0px',
            'top': '0px',
            'fontSize': '34px',
            // 'color': 'black',
            // 'fontFamily': '微软雅黑'


        }, 500);

    }, function() {
        $(this).animate({
            'position': 'static',
            'backgroundColor': 'rgba(51, 153, 51, 0.8)',
            'height': '-=25px',
            'width': '-=23px',
            'left': '7%',
            'top': '5%',
            'fontSize': '25px',
            // 'color': 'white'
            // 'fontFamily': '华文行楷'
        }, 300);
    });


    $('#public').hover(function() {
        $(this).animate({
            'position': 'absolute',
            'backgroundColor': 'rgba(255, 153, 51, 1)',
            'height': '+=25px',
            'width': '+=23px',
            'left': '0px',
            'top': '0px',
            'fontSize': '34px',
            // 'color': 'black',
            // 'fontFamily': '微软雅黑'


        }, 500);

    }, function() {
        $(this).animate({
            'position': 'static',
            'backgroundColor': 'rgba(255, 153, 51, 0.8)',
            'height': '-=25px',
            'width': '-=23px',
            'left': '7%',
            'top': '5%',
            'fontSize': '25px',
            // 'color': 'white'
            // 'fontFamily': '华文行楷'
        }, 300);
    });

    $('#quickpost').hover(function() {
        $(this).animate({
            'position': 'absolute',
            'backgroundColor': 'rgba(153, 153, 255, 1)',
            'height': '+=25px',
            'width': '+=23px',
            'left': '0px',
            'top': '0px',
            'fontSize': '34px',
            // 'color': 'black',
            // 'fontFamily': '微软雅黑'


        }, 500);

    }, function() {
        $(this).animate({
            'position': 'static',
            'backgroundColor': 'rgba(153, 153, 255, 0.8)',
            'height': '-=25px',
            'width': '-=23px',
            'left': '7%',
            'top': '5%',
            'fontSize': '25px',
            // 'color': 'white'
            // 'fontFamily': '华文行楷'
        }, 300);
    });

    $('#openlab').hover(function() {
        $(this).animate({
            'backgroundColor': 'rgba(153, 153, 153, 1)',
            'height': '+=25px',
            'width': '+=23px',
            'left': '0px',
            'top': '0px',
            'fontSize': '34px',
            // 'color': 'black',
            // 'fontFamily': '微软雅黑'


        }, 500);

    }, function() {
        $(this).animate({

            'backgroundColor': 'rgba(153, 153, 153, 0.8)',
            'height': '-=25px',
            'width': '-=23px',
            'left': '7%',
            'top': '5%',
            'fontSize': '25px',
            // 'color': 'white'
            // 'fontFamily': '华文行楷'
        }, 300);
    });

    $('#suimi').hover(function() {
        $(this).animate({
            'width': '+=23px',
            'backgroundColor': 'rgba(0, 255, 0, 1)',
        }, 500);

    }, function() {
        $(this).animate({
            'width': '-=23px',
            'backgroundColor': 'rgba(0, 255, 0, 0.8)',

        }, 300);
    });

    $('#batian').hover(function() {
        $(this).animate({
            'width': '+=23px',
            'backgroundColor': 'rgba(51, 51, 51, 1)',
        }, 500);

    }, function() {
        $(this).animate({
            'width': '-=23px',
            'backgroundColor': 'rgba(51, 51, 51, 0.8)',

        }, 300);
    });

    $('#listening').hover(function() {
        $(this).animate({
            'width': '+=23px',
            'backgroundColor': 'rgba(255, 51, 255, 1)',
        }, 500);

    }, function() {
        $(this).animate({
            'width': '-=23px',
            'backgroundColor': 'rgba(255, 51, 255, 0.8)',

        }, 300);
    });

    $('#writing').hover(function() {
        $(this).animate({
            'width': '+=23px',
            'backgroundColor': 'rgba(102, 51, 255, 1)',
        }, 500);

    }, function() {
        $(this).animate({
            'width': '-=23px',
            'backgroundColor': 'rgba(102, 51, 255, 0.8)',
        }, 300);
    });



    $('.news-right .every').hover(function() {
        $(this).animate({
            'backgroundColor': 'rgba(150,150,150,0.5)'
        }, 500);
    }, function() {
        $(this).stop();
        $(this).animate({
            'backgroundColor': 'rgba(250,250,250,1)'
        }, 300);

    });









});