/**
 * Created by python on 17-12-11.
 */

$(function () {
    // 全选和全不选
    $('.settlements').find(':checkbox').change(function () {
        is_checked = $(this).prop('checked');
        $('.cart_list_td').find(':checkbox').each(function () {
           $(this).prop('checked', is_checked);
       });
       update_skus_msg();
    });

    $('.cart_list_td').find(':checkbox').change(function () {
        var checked_len = $('.cart_list_td').find(':checked').length;
        var checkbox_len = $('.cart_list_td').find(':checkbox').length;
        if(checked_len <checkbox_len)
        {
            $('.settlements').find(':checkbox').prop('checked', false);
        }
        else{
             $('.settlements').find(':checkbox').prop('checked', true);
        }
        update_skus_msg();
    });
    //改变checkbox选中后，合计和件数发生改变
    function update_skus_msg() {
        var total_count=0;
        var total_price =0.0;
        $('.cart_list_td').find(':checked').parents('ul').each(function () {
            price = $(this).children('.col07').text();
            count = $(this).find('.num_show').val();
            total_price += parseFloat(price);
            total_count += parseInt(count);
        });
        $('.settlements').find('em').text(total_price.toFixed(2));
        $('.settlements').find('b').text(total_count);
        $('.total_count').find('em').text(total_count);
        $('.cart_count').text(total_count);

    }
    // 发起异步请求
    var errorture =false;
    var ajax_count = 0;
    //修改购物车数据
    function ajax_update_data (ul) {
        var price = ul.find('.col05').text();
        total_price = ajax_count * parseInt(price);
       ul.find('.col07').text(total_price)
    }


    function ajax_send_msg(count, url) {
        var sku_id = url.parents('ul').attr('sku_id');
        var csrf =$('input[name="csrfmiddlewaretoken"]').val();
        paream = {'sku_id': sku_id, 'count': count, 'csrfmiddlewaretoken':csrf};
        $.ajaxSettings.async = false;
        $.post('/cart/add_cart/', paream, function (data) {
           if(data.res==5)
           {
               ajax_count = data.count;
           }
           else{
               errorture = true;
               alert(data.errmsg);
           }
        });
        $.ajaxSettings.async = true;
    }
    // 增加数量
    $('.add').click(function (ul) {

       var count = $(this).next('.num_show').val();
       count = parseInt(count) + 1;
       ajax_send_msg(count, $(this));
       if(errorture == false)
       {
           $(this).next().val(ajax_count);
           ajax_update_data($(this).parents('ul'));
           update_skus_msg();
       }

    });
    //减少数量

    $('.minus').click(function () {
        var count = $(this).prev().val();
        new_count =parseInt(count)-1;
        if(count<=0)
        {
            return
        }
        ajax_send_msg(new_count, $(this));
       if(errorture == false)
       {
           $(this).prev().val(ajax_count);
           ajax_update_data($(this).parents('ul'));
           update_skus_msg();
       }
       else{
           $(this).prev().val(count);
           ajax_update_data($(this).parents('ul'));
           update_skus_msg();
       }
    });

      //手动修改数量
    var count =0
    $('.num_show').focus(function () {
        count = $(this).val();
    });

    $('.num_show').blur(function () {
        new_count =$(this).val();
         ajax_send_msg(new_count, $(this));
       if(errorture == false)
       {
           $(this).prev().val(data.count);
           ajax_update_data($(this).parents('ul'));
           update_skus_msg();
       }
       else {
           $(this).prev().val(count);
       }
    });

//删除
    $('.cart_list_td').children('.col08').children('a').click(function () {
        sku_id = $(this).parents('ul').attr('sku_id');
        var csrf =$('input[name="csrfmiddlewaretoken"]').val();
        par = {'sku_id': sku_id, 'csrfmiddlewaretoken': csrf};
        $.ajaxSettings.async =false;
        that = this;
        $.post('/cart/delete/',par, function (data) {
            if(data.res==4){
                $(that).parents('ul').remove();
                var is_checked = $(this).parents('ul').find(":checkbox").prop('checked');p
                if(is_checked){
                    update_skus_msg();
                }
            }
        });
        $.ajaxSettings.async=true;
    });

});