/*
  Author: Lumberjacks
  Template: Coffee Break (Coming Soon)
  Version: 1.0
  URL: http://themeforest.net/user/Lumberjacks/
*/

"use strict";

  $(document).ready(function (){


    // Backstretch
    $(".lj-background").backstretch("static/dark_theme/img/bg.jpg");

    // Text rotator
    $('.rotate').textillate({ 
      minDisplayTime: 3000,
      in: { effect: 'fadeInUp',
            shuffle: true },
      out: { effect: 'fadeOutUp',
            shuffle: true },
      loop: true
    });

    // Gallery
    $('.grid').masonry({
      itemSelector: '.grid-item',
      gutter: 30
    });
    $('.grid-item').magnificPopup({
      type: 'image',
      mainClass: 'mfp-with-zoom',
      zoom: {
        enabled: true,
        duration: 300,
        easing: 'ease-in-out',
      }
    });

    // Retina display
    $('img[data-retina-src]').retinaDisplay();
    
    // E-mail validation
    function isValidEmailAddress(emailAddress) {
      var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
      return pattern.test(emailAddress);
    };

    // Phone validation
    function isValidPhone(phone) {
      var pattern = new RegExp(/^\+?\d{8}$/);
      return pattern.test(phone);
    };

    // Contact form
    $("#contact").on('submit', function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      var name = $("input#name");
      var email = $("input#email");
      var message = $("textarea#message");


      $.ajax({
          type: "POST",
          url: url_form,
          data: $('form').serialize(),
//          data: {
//            contact_email:email.val().serialize(),
//            contact_name:name.val().serialize(),
//            //contact_phone:phone.val(),
//            contact_message:message.val().serialize()
//          },
          success: function (data) {
            console.log(data);
            $('input#name').val('').blur();
            $('input#phone').val('').blur();
            $('input#email').val('').blur();
            $('textarea#message').val('').blur();
            $('#contact .contact-message').css({ display: 'block' }).velocity({
              opacity: '1',
              left: '0px'
            }, 1000, 'easeOutQuint', function() {
              $(this).delay(7000).velocity({
                opacity: '0'
              }, 1000, function() {
                $(this).css({ left: '90px', display: 'none' });
              });
            });
          }
        });
    });

    // Navigation
    $('nav').hover(
      function() {
      if($(window).outerWidth() >= 767) {
        $('header > .container, footer').velocity({ left: '100px' }, 150);
        $('nav').addClass('active').velocity({ width: '150px' }, 150);
      }
    }, function() {
      $('header > .container, footer').velocity({ left: '0px' }, 150);
      $('nav').removeClass('active').velocity({ width: '50px' }, 150);
    });

    // Content changer
    $('nav a').on('click', function(event) {
      var changer = $('.lj-changer');
      event.preventDefault();

      var slide = $(this).attr('href');
      var activeSlide = $('.lj-changer > .active');

      if(!changer.hasClass('animating') && !$(slide).is($(activeSlide))) {
        $(changer).addClass('animating');
        $(this).addClass('active').siblings().removeClass('active');

        $(activeSlide).velocity({
          opacity: 0,
          left: '30px'
        }, 350, 'easeInQuint', function() {
          $(slide).css({ opacity: '0', left: '-30px' }).addClass('active').siblings().removeClass('active');
          if(slide == '#gallery') { $('.grid').masonry('layout'); }
          $(slide).velocity({
            opacity: 1,
            left: '0px'
          }, 350, 'easeOutQuint', function() {
            $(changer).removeClass('animating');
          });
        });

      }

    });

    // Input validation
    $('#contact input, #contact textarea').on('focus', function() {
      $(this).prev('label').addClass('active');
    });
    $('#contact input, #contact textarea').on('blur', function() {
      if(!$(this).val()) {
        $(this).removeClass('validated').prev('label').removeClass('active').children('span').html('');
      }
    });
    $('#contact input, #contact textarea').on('input', function() {
      if($(this).is($('#name'))) {
        if(!$(this).val()) {
          $(this).removeClass('validated').prev('label').children('span').html('');
        }
        else {
          $(this).addClass('validated').prev('label').children('span').html('<i class="fa fa-check"></i>');
        }
      }
      else if($(this).is($('#phone'))) {
        if(!isValidPhone($(this).val())) {
          if(!$(this).val()) {
            $(this).prev('label').children('span').html('');
          }
          else {
            $(this).prev('label').children('span').html('<i class="fa fa-close"></i>');
          }
        }
        else {
          if(!$(this).val()) {
            $(this).removeClass('validated').prev('label').children('span').html('');
          }
          else {
            $(this).addClass('validated').prev('label').children('span').html('<i class="fa fa-check"></i>');
          }
        }
      }
      else if($(this).is($('#email'))) {
        if(!isValidEmailAddress($(this).val())) {
          if(!$(this).val()) {
            $(this).prev('label').children('span').html('');
          }
          else {
            $(this).prev('label').children('span').html('<i class="fa fa-close"></i>');
          }
        }
        else {
          if(!$(this).val()) {
            $(this).removeClass('validated').prev('label').children('span').html('');
          }
          else {
            $(this).addClass('validated').prev('label').children('span').html('<i class="fa fa-check"></i>');
          }
        }
      }
      else if($(this).is($('#message'))) {
        if(!$(this).val()) {
          $(this).removeClass('validated').prev('label').children('span').html('');
        }
        else {
          $(this).addClass('validated').prev('label').children('span').html('<i class="fa fa-check"></i>');
        }
      }
    });
      
    // Scroll page top on refresh
    $(window).on('beforeunload', function() {
      $(this).scrollTop(0);
    });

    // Preloader animations
    $(window).load(function() {

      $('.lj-preloader img.progress').delay(700).velocity({
        opacity: 0
      },  1000, 'easeInQuint');
      
      $('.lj-preloader').delay(1200).velocity({
        height: 0
      },  1000,
        'easeInOutQuint',
        function() {
          $('.lj-preloader').remove()
      });

      $('header').css({ height: 'auto' }).delay(1200).velocity({
        top: 0
      }, 1000, 'easeInOutQuint',
        function() {
          $('.lj-background').css({ position: 'fixed' });
      })
      
      $('footer').css({ bottom: '-100px' }).delay(1600).velocity({
        bottom: 0
      }, 1000, 'easeInOutQuint',
        function() {
          $(this).css({ bottom: 'auto' });
          $('body').css({ overflowY: 'auto' });
      })
      
      $('nav').delay(2200).velocity({
        left: 0
      }, 1500, 'easeInOutQuint')

      var filler = $('.lj-progress-bar .filler');
      var fillerWidth = filler.width() / filler.parent().width() * 100;
      filler.css({ width: '0%' }).delay(1800).animate({
        width: fillerWidth + '%'
      }, 3000, 'easeInOutQuint');

    });

  });