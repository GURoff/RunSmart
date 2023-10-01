// Tiny slider
const slider = tns({
  container: ".carousel__inner",
  items: 1,
  slideBy: "page",
  autoplay: false,
  controls: false,
  nav: false,
  responsive: {
    640: {
      edgePadding: 20,
      gutter: 20,
      items: 1,
    },
    700: {
      gutter: 30,
    },
    900: {
      items: 1,
    },
  },
});

document.querySelector(".prev").addEventListener("click", function () {
  slider.goTo("prev");
});

document.querySelector(".next").addEventListener("click", function () {
  slider.goTo("next");
});
//------------------

// Script for tabs

$(document).ready(function () {
  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab_active)",
    function () {
      $(this)
        .addClass("catalog__tab_active")
        .siblings()
        .removeClass("catalog__tab_active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content_active")
        .eq($(this).index())
        .addClass("catalog__content_active");
    }
  );

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item__content")
          .eq(i)
          .toggleClass("catalog-item__content_active");
        $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
      });
    });
  }

  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");

  //Modal windows ------
  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("fast");
  });

  $(".modals__close").on("click", function () {
    $(".overlay, #consultation, #thanks, #order").fadeOut("fast");
  });

  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modals__descr").text(
        $(".catalog-item__subtitle").eq(i).text()
      );
      $(".overlay, #order").fadeIn("fast");
    });
  });

  //validate forms --------------------
  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "Please specify your name",
          minlength: jQuery.validator.format(
            "At least {0} characters required!"
          ),
        },
        phone: "Please specify your phone number",
        email: {
          required: "We need your email address to contact you",
          email: "Your email address must be in the format of name@domain.com",
        },
      },
    });
  }

  validateForms("#consultation-form");
  validateForms("#consultation form");
  validateForms("#order form");
  //------------

  //masked input
  $("input[name=phone]").mask("+420 999-999-999");
});
