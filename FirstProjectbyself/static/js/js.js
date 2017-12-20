$(function(){
   var $oLi = $('.center_con1 .center .bg li');
   //第一张图片显示，其他图片放在右侧
   $oLi.eq(0).css('left',0).siblings().css('left','760px');
   //生成相对应的ol li
   for(var i=0;i<$oLi.length;i++){
        var $pli =$('<li></li>')
       $pli.appendTo($('.center_con1 .center .bg ol'));
       if(i==0){$pli.addClass('active')}
   }

   // 点击圆点时图片移动 ，
   var $ooli = $('.center_con1 .center .bg ol li');
   num = 0;// 当前现实的index
   now = 0;//点击后的
   var flag = false;//定义开关（左右箭头）
   $ooli.click(function(){
        now = $(this).index();
        move()
   });
   //点击左侧按钮时：当点击的大于3时，图片index为0的在右边760px处 像左西移动；
   $('.center_con1 .center .bg .left').click(function()
   {
    now++;
    if(flag){
        return;
    }
    flag = true;
    move()
    });

   // 点击右侧按钮时：
   $('.center_con1 .center .bg .right').click(function(){
       now--;
       if(flag){
        return;
    }
    flag = true;
       move();
       
   });
   //定时器 向左滑动
   var oTimer = setInterval(fnMove,3000);
   function fnMove(){
       now ++
       move();
   }
   //鼠标在图片上时 定时器停止，鼠标滑开 定时器开始
   $oLi.hover(function(){clearInterval(oTimer)}, function(){oTimer = setInterval(fnMove,3000)});
   //图片移动
   function move()
   {
    if(num<now)//当点击的比正在显示的大时，图片左移动
    {
        $oLi.eq(now).css('left','760px');
        $oLi.eq(num).stop().animate({'left':'-760px'},500,function(){
            flag = false;
        });

    }
    if(num > now){//当点击的比正在显示的小时，右移动
        $oLi.eq(now).css('left','-760px');
        $oLi.eq(num).stop().animate({'left':'760px'},500,function(){
            flag = false;
        });
    }
    if(now >$oLi.length-1)
    {
        num=$oLi.length -1;
        now=0;
        $oLi.eq(now).css('left','760px');
        $oLi.eq(num).stop().animate({'left':'-760px'},500,function(){
            flag = false;
        });
    }
    if(now<0)
    {
        num=0;
        now=$oLi.length-1;
        $oLi.eq(now).css('left','-760px');
        $oLi.eq(num).stop().animate({'left':'760px'},500,function(){
            flag = false;
        });
    }
    $oLi.eq(now).stop().animate({'left':'0'},500,function(){
        flag = false;
    });
    num = now
    $ooli.eq(now).addClass('active').siblings().removeClass('active');
    
   }

})