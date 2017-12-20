/**
 * Created by python on 17-11-26.
 */
$(function(){
    $('.up .right .register ul li .submit').prop('disabled',false).css('background','#5fb205');

    var $input01 = $('.up .right .register .input01');
    var $input02 = $('.up .right .register .input02');
    $('.up .right .register input').focus(function(){
        $(this).next().css('display','none');
    });
    $input01.blur(function(){
        var name = $(this).val();
        if(name ==''){
            $(this).next().css('display','block');
        }
        var ret =/[0-9a-zA-Z]{6,15}/;
        if(!ret.test(name))
        {
            $(this).next().css('display','block').innerHTML("用户名6到15位");

            $(this).empty();

        }
    });

    $input02.blur(function(){
        var password = $(this).val();
        if(password ==''){
            $(this).next().css('display','block');

        }
        var ret=/^\w{6,15}$/;
        if(!ret.test(password))
        {
            $(this).next().css('display','block').innerHTML("密码6到15位")

            $(this).empty();

        }
    });

})