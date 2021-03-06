var scene = document.getElementById('scene');
var parallax = new Parallax(scene);
new WOW().init();
jQuery(document).ready(function($) {
    $(function() {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });
    $(".mobile-menu-btn").click(function() {
        $(".body-wrap").toggleClass("body-left");
        $(".mobile-menu").toggleClass("menu-left");
        $(".mobile-menu-btn").toggleClass("menu-btn-left");
    });
    $(".godown").click(function(e) {
        $('html, body').animate({
            scrollTop: $("section").first().offset().top
        }, 1500);
    });
    $(".header .txt-focus").click(function(e) {
        $('html, body').animate({
            scrollTop: $("#contact").offset().top - 115
        }, 1500);
    });
    //google maps show event
    $(".view_map,.map-overlay").click(function(e) {
        e.preventDefault();
        //$(".footer").slideUp();
        $(".map-overlay").fadeOut();
        $(".close1").fadeIn();
    });
    //
    $(".close1").click(function() {
        $(".map-overlay").fadeIn();
        $(".close1").fadeOut();
    });
    //scroll and hightlight menu
    $(".mobile-menu ul li a, .nav1 ul li a").click(function(e) {
        e.preventDefault();
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        $('html, body').animate({
            scrollTop: $(refElement).offset().top
        }, 1500);
    });
    $(window).scroll(function(event) {
        var nav1_height = $(".nav1").height();
        var scrollPos = $(document).scrollTop() + nav1_height;
        $('.nav1 ul li a').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.nav1 ul li a').removeClass("nav1hover");
                currLink.addClass("nav1hover");
            } else {
                currLink.removeClass("nav1hover");
            }
            if ($(window).width() > 900) {
                if (scrollPos > $(".section1").position().top) {
                    $(".nav1").css({
                        background: 'rgba(0,0,0,.9)'
                    });
                } else if (scrollPos <= $(".section1").position().top) {
                    $(".nav1").css({
                        background: 'rgba(0,0,0,.3)'
                    });
                }
            }
        });
    });
    $(window).scroll(function() {
        if ($('.body-wrap').hasClass('body-left')) {
            $('.mobile-menu-btn').css({
                opacity: 1
            })
        } else {
            if ($(document).scrollTop() > 30) {
                $('.mobile-menu-btn').css({
                    opacity: 0
                });
            } else {
                $('.mobile-menu-btn').css({
                    opacity: 1
                });
            }
        }
    });
    $("#tm").owlCarousel({
        items: 1,
        //        navigation: true,
        autoPlay: true,
        //        pagination: false
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [980, 1],
        itemsTablet: [768, 1],
    });

    function header_height() {
        var windowHeight = $(window).height();
        $(".header").css({
            height: windowHeight + "px"
        });
    }
    $(window).resize(function() {
        if ($(window).width() < 1025) {
            header_height();
        }
    });
    header_height();
    $(".tools-item").hover(function() {
        $(this).children(".overlay").fadeToggle();
    });
});

function initialize() {
    var headOfficeLatLng = new google.maps.LatLng(27.7069179, 85.3375574);
    var chakupatBranchLatLng = new google.maps.LatLng(27.6787366, 85.3224274);
    var styles = [{
        "stylers": [{
            "hue": "#00a1ff"
        }, {
            "saturation": 2
        }]
    }];
    var styledMap = new google.maps.StyledMapType(styles, {
        name: "Styled Map"
    });
    var mapOptions = {
        zoom: 14,
        navigationControl: true,
        draggable: true,
        mapTypeControl: true,
        scaleControl: true,
        scrollwheel: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: new google.maps.LatLng(27.695702, 85.329218),
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var image = 'img/marker.png';
    var headOfficeInfoWindow = new google.maps.InfoWindow({
        content: "<b>Enliv Information Technologies</b> <br/> Ratopul, Kathmandu"
    });
    var chakupatBranchInfoWindow = new google.maps.InfoWindow({
        content: "<b>Enliv Information Technologies</b> <br/> Chakupat, Lalitpur"
    });
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
    var headOfficeMarker = new google.maps.Marker({
        position: headOfficeLatLng,
        map: map,
        title: 'Enliv Information Technologies',
        icon: image
    });
    var chakupatBranchMarker = new google.maps.Marker({
        position: chakupatBranchLatLng,
        map: map,
        title: 'Enliv Information Technologies',
        icon: image
    });
    google.maps.event.addListener(headOfficeMarker, 'click', function() {
        headOfficeInfoWindow.open(map, headOfficeMarker);
    });
    google.maps.event.addListener(chakupatBranchMarker, 'click', function() {
        chakupatBranchInfoWindow.open(map, chakupatBranchMarker);
    });
}
google.maps.event.addDomListener(window, 'load', initialize);
