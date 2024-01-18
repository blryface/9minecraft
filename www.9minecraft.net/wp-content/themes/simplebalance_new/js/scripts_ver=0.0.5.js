(function ($) {
	("use strict");
	/*==============================
        Is mobile
    ==============================*/
	var isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (
				isMobile.Android() ||
				isMobile.BlackBerry() ||
				isMobile.iOS() ||
				isMobile.Opera() ||
				isMobile.Windows()
			);
		},
	};
	var windowWidth = window.innerWidth,
		windowHeight = $(window).height();

	function headerFixedScroll() {
		var headerFixed = $(".header-logo");
		$(window).scroll(function () {
			var scroll = $(window).scrollTop();

			if (scroll >= 100) {
				headerFixed.addClass("header-fixed");
			} else {
				headerFixed.removeClass("header-fixed");
			}
		});
	}

	// READY FUNCTION
	$(document).ready(function () {
		if (isMobile.any()) {
			$("html").addClass("ismobile");
		}

		/* Wrap offcanvas */
		$("#page").wrapInner('<div class="page-wrap-offcanvas"></div>');

		// Show search box on moible device
		$("#header-search-icon").click(function () {
			$(".header-right").toggle();
		});

		if (window.innerWidth > 992) {
			// Fixed header when scrolling
			// headerFixedScroll();
		}
	});

	function navrespon() {
		/* Menu style */
		$(".navigation").each(function () {
			var menu = $(this),
				menuType = menu.data("menu-responsive"),
				openMenu = menu.find(".open-menu"),
				closeMenu = menu.find(".close-menu"),
				wrapCanvas = $("#page").children(".page-wrap-offcanvas"),
				navigationRespon = $("#cssmenu").find(".navigation"),
				menuList = wrapCanvas.closest("body").find(".navlist"),
				mobilemenuextra = $('.mobile-menu-extra'),
				// logorespon = navigationRespon.closest('body').find('.header-logo .left'),
				subMenu = menu.find(".sub-menu");
			// wrapCanvas.parent().css('padding', 0);
			// wrapCanvas.css('padding-top', 82 + 'px');

			if (window.innerWidth < menuType) {
				openMenu.show();
				menuList.prependTo(wrapCanvas);
				menuList.wrap('<div class="off-canvas"></div>');
				var offcanvas = $('.page-wrap-offcanvas .off-canvas');
				offcanvas.each(function(index, el) {
					var t = $(this);
					if ( t.find('.navlist').length == 0 ) {
						t.remove();
					} else {
						mobilemenuextra.removeClass('hide').appendTo(t);
					}
				});
				// logorespon
				//     .prependTo(navigationRespon);

				if (menuList.find(".submenu-toggle").length === 0) {
					$(".off-canvas .menu-item-has-children")
						.children("a")
						.after(
							'<span class="submenu-toggle">\
                                    <i class="fa fa-angle-down"></i>\
                                </span>\
                            '
						);
					menuList.on("click", ".submenu-toggle", function (evt) {
						evt.preventDefault();
						$(this).closest('.menu-item-has-children').toggleClass("sub-menu-active");
					});
				}
				openMenu.click(function () {
					$(".page-wrap-offcanvas").addClass("off-canvas-active");
					$(this).addClass("toggle-active");
					$(".menu-item-has-children").removeClass("sub-menu-active");
					$('body').addClass('noscroll');
					closeMenu.show();
				});
				closeMenu.on("click", function () {
					$(".page-wrap-offcanvas").removeClass("off-canvas-active");
					openMenu.removeClass("toggle-active");
					$(".menu-item-has-children").removeClass("sub-menu-active");
					$(this).hide();
					$('body').removeClass('noscroll');
				});
				// $('html').click(function() {
				//     $('.page-wrap-offcanvas').removeClass('off-canvas-active');
				//     openMenu.removeClass('toggle-active');
				//     $('.sub-menu').removeClass('sub-menu-active');
				//     closeMenu.hide();
				// });
				$("#cssmenu").on("click", ".navlist, .open-menu", function (evt) {
					evt.stopPropagation();
				});
			} else {
				openMenu.hide();
				menuList.removeClass("off-canvas").appendTo(menu);
				mobilemenuextra.addClass("hide").appendTo('body');

				$(".submenu-toggle, .back-mb").remove();
				$('.page-wrap-offcanvas .off-canvas').remove();
			}
		});
	}

	$(document).ready(navrespon);

	$(window).on("load resize", navrespon);

	// Relate post responsive
	function relateMobile() {
		var ww = $(document).width();
		// $('#content .content-preview').each(function(){
		//     var postImage = $(this).prev();
		//     if(ww < 500){
		//         var postTitle = $(this).children('.postTitle_archive');
		//         postImage.before(postTitle);
		//     }else {
		//         var postTitle = postImage.prev();
		//         $(this).prepend(postTitle);
		//     }
		// });
		if (ww < 660) {
			$("#related_post_widget ul").addClass("slider-responsive");
			$(".slider-responsive").owlCarousel({
				itemsTablet: [660, 3],
				itemsMobile: [450, 2],
				navigation: true,
				pagination: false,
				navigationText: ["", ""],
			});
		} else {
			var owl = $(document).find("#related_post_widget ul").data("owlCarousel");
			if (owl) {
				owl.destroy();
			}
		}
	}
	relateMobile();
	$(window).resize(function () {
		relateMobile();
	});

	$("#stickyunit").affix({
		offset: {
			bottom: 600,
			top: function () {
				return (this.top = $("#stickyunit").offset().top + 568);
			},
		},
	});
})(jQuery);
