/**
 * Created by python on 17-12-17.
 */
/**
 * Created by python on 17-12-11.
 */
$(function () {
    var $add_x = $('#add_cart').offset().top;
    var $add_y = $('#add_cart').offset().left;

    var $to_x = $('.leftcar').offset().top;
    var $to_y = $('.leftcar').offset().left;

     $('#minus').click(function () {
        sku_count = $('.num_show').val();
         new_count = int(sku_count)-1;
         if (new_count <=0){
             new_count = 1
         }
         $(this).prev().val(new_count);
    });

     $('#add').click(function () {
         sku_count = $('.num_show').val();
         new_count = int(sku_count) + 1;
         $(this).next().val(new_count);

    });

    $('#add_cart').click(function () {

        $(".add_jump").css({'left': $add_y + 80, 'top': $add_x + 10, 'display': 'block'});
        sku_count = $('.num_show').val();
        sku_id = $(this).attr('sku_id');
        csrf = $('input[name="csrfmiddlewaretoken"]').val();
        parama = {'sku_id': sku_id, 'count': sku_count, 'csrfmiddlewaretoken': csrf};
        $.post('/cart/add_cart/', parama, function (data) {
            if (data.res == 5) {
                $('.add_jump').css({'left': $add_y + 80, 'top': $add_x + 10, 'display': 'block'});
                $('.add_jump').stop().animate({
                        'left': $to_y + 7,
                        'top': $to_x + 7
                    },
                    "fast", function () {
                        $(".add_jump").fadeOut('fast', function () {
                            var cart_data = $('.cart_count').text();
                            var new_cart_data = parseInt(cart_data) + data.count;
                            $('.cart_count').text(new_cart_data);
                        });
                });
            }
            else {
                $('.num_show').val(1);
            }
        });
    });
});

