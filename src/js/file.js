$(document).ready(function () {
    $('.carousel__inner').slick({
        infinite: true,
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="/src/icon/left.svg" alt=""></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="/src/icon/right.svg" alt=""></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    $('.catalog-item__link').each(function (i) {
        $(this).on('click', function (e) {
            e.preventDefault()
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active')
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
        })
    });
    $('.catalog-iem__back').each(function (i) {
        $(this).on('click', function (e) {
            e.preventDefault()
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active')
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
        })
    })
    //modal
    $('[data-modal= consulting]').on('click', function () {
        $('.overlay, #consulting').fadeIn('slow')
    })
    $('.modal__close').on('click', function () {
        $('.overlay, #consulting, #thanks, #order').fadeOut('slow')
    })

    $('.button__mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text())
            $('.overlay, #order').fadeIn('slow')
        })
    })
    $('#consultation-form').validate()
    $('#consultation form').validate({
        rules: {
            name: 'required',
            phone: 'required',
            email: {
                required: true,
                email: true
            }
        }
    })
    $('#order form').validate()

    $('form').submit(function (e) {
        e.preventDefault()
        if (!$(this).validate()) {
            return
        }
        $.ajax({
            type: 'POST',
            url: 'mailer/smart.php',
            data: $(this).serialize()
        }).done(function () {
            $(this).find('input').val('')

            $('form').trigger('reset')
        })
        return false
    })
//scroll us
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn()
        } else {
            $('.pageup').fadeOut()
        }
    })
    new WOW().init();
})

