$(function(){
    
    var $input01 = $('.up .right .register .input01');
    var $input02 = $('.up .right .register .input02');
    var $input03 = $('.up .right .register .input03');
    var $input04 = $('.up .right .register .input04');
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
            $(this).next().css('display','block').innerHTML("用户名6到15位")

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

    $input03.blur(function(){
        var repassword = $(this).val(); 
        var password = $($input02).val(); 
        if(repassword ==''){
            $(this).next().css('display','block');

        }
        if(repassword!= password)
        {
            $(this).next().css('display','block').innerHTML("与密码不一致")

            $(this).empty();    
        }
 
    });

    $input04.blur(function(){
        var email = $(this).val(); 
        if(email ==''){
            $(this).next().css('display','block');
            return true;
        }
        var ret =/\w+@(163|qq|126|sina)\.com/
        if(!ret.test(email))
        {
            $(this).next().css('display','block').innerHTML('请输入正确的邮箱');
            $(this).empty();
            
        }
    });

    $('.up .right .register ul li .checkbox').click(function(){
        if(!$(this).prop('checked')){
            $(this).prop("checked",false);
            $('.up .right .register ul li .submit').prop('disabled',true).css('background','rgb(236, 235, 235)');
        }
        else{
            $(this).prop("checked",true);
            $('.up .right .register ul li .submit').prop('disabled',false).css('background','#5fb205');

        }
    });
   
    $input01.empty();
    $input02.empty();
    $input03.empty();
    $input04.empty();
    $('.up .right .register ul li .submit').prop('checked', false)
})