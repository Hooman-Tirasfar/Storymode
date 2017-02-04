<script> 
    google.maps.event.addDomListener(window, 'load', init);
    var map, markersArray = [];

    function bindInfoWindow(marker, map, location) {
        google.maps.event.addListener(marker, 'click', function() {
            function close(location) {
                location.ib.close();
                location.infoWindowVisible = false;
                location.ib = null;
            }

            if (location.infoWindowVisible === true) {
                close(location);
            } else {
                markersArray.forEach(function(loc, index){
                    if (loc.ib && loc.ib !== null) {
                        close(loc);
                    }
                });

                var boxText = document.createElement('div');
                boxText.style.cssText = 'background: #fff;';
                boxText.classList.add('md-whiteframe-2dp');

                function buildPieces(location, el, part, icon) {
                    if (location[part] === '') {
                        return '';
                    } else if (location.iw[part]) {
                        switch(el){
                            case 'photo':
                                if (location.photo){
                                    return '<div class="iw-photo" style="background-image: url(' + location.photo + ');"></div>';
                                 } else {
                                    return '';
                                }
                                break;
                            case 'iw-toolbar':
                                return '<div class="iw-toolbar"><h3 class="md-subhead">' + location.title + '</h3></div>';
                                break;
                            case 'div':
                                switch(part){
                                    case 'email':
                                        return '<div class="iw-details"><i class="material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span><a href="mailto:' + location.email + '" target="_blank">' + location.email + '</a></span></div>';
                                        break;
                                    case 'web':
                                        return '<div class="iw-details"><i class="material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span><a href="' + location.web + '" target="_blank">' + location.web_formatted + '</a></span></div>';
                                        break;
                                    case 'desc':
                                        return '<label class="iw-desc" for="cb_details"><input type="checkbox" id="cb_details"/><h3 class="iw-x-details">Details</h3><i class="material-icons toggle-open-details"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><p class="iw-x-details">' + location.desc + '</p></label>';
                                        break;
                                    default:
                                        return '<div class="iw-details"><i class="material-icons"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span>' + location[part] + '</span></div>';
                                    break;
                                }
                                break;
                            case 'open_hours':
                                var items = '';
                                for (var i = 0; i < location.open_hours.length; ++i) {
                                    if (i !== 0){
                                        items += '<li><strong>' + location.open_hours[i].day + '</strong><strong>' + location.open_hours[i].hours +'</strong></li>';
                                    }
                                    var first = '<li><label for="cb_hours"><input type="checkbox" id="cb_hours"/><strong>' + location.open_hours[0].day + '</strong><strong>' + location.open_hours[0].hours +'</strong><i class="material-icons toggle-open-hours"><img src="//cdn.mapkit.io/v1/icons/keyboard_arrow_down.svg"/></i><ul>' + items + '</ul></label></li>';
                                }
                                return '<div class="iw-list"><i class="material-icons first-material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><ul>' + first + '</ul></div>';
                                 break;
                         }
                    } else {
                        return '';
                    }
                }

                boxText.innerHTML = 
                    buildPieces(location, 'photo', 'photo', '') +
                    buildPieces(location, 'iw-toolbar', 'title', '') +
                    buildPieces(location, 'div', 'address', 'location_on') +
                    buildPieces(location, 'div', 'web', 'public') +
                    buildPieces(location, 'div', 'email', 'email') +
                    buildPieces(location, 'div', 'tel', 'phone') +
                    buildPieces(location, 'div', 'int_tel', 'phone') +
                    buildPieces(location, 'open_hours', 'open_hours', 'access_time') +
                    buildPieces(location, 'div', 'desc', 'keyboard_arrow_down');

                var myOptions = {
                    alignBottom: true,
                    content: boxText,
                    disableAutoPan: true,
                    maxWidth: 0,
                    pixelOffset: new google.maps.Size(-140, -40),
                    zIndex: null,
                    boxStyle: {
                        opacity: 1,
                        width: '280px'
                    },
                    closeBoxMargin: '0px 0px 0px 0px',
                    infoBoxClearance: new google.maps.Size(1, 1),
                    isHidden: false,
                    pane: 'floatPane',
                    enableEventPropagation: false
                };

                location.ib = new InfoBox(myOptions);
                location.ib.open(map, marker);
                location.infoWindowVisible = true;
            }
        });
    }

    function init() {
        var mapOptions = {
            center: new google.maps.LatLng(35.74378005118981,51.3765066924988),
            zoom: 15,
            gestureHandling: 'auto',
            fullscreenControl: false,
            zoomControl: true,
            disableDoubleClickZoom: true,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            },
            scaleControl: true,
            scrollwheel: true,
            streetViewControl: true,
            draggable : true,
            clickableIcons: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        }
        var mapElement = document.getElementById('mapkit-1682');
        var map = new google.maps.Map(mapElement, mapOptions);
        var locations = [
            {"title":"Milad Tower","address":"","desc":"برج میلاد :)","tel":"","int_tel":"","email":"","web":"","web_formatted":"","open":"","time":"","lat":35.7448416,"lng":51.37532119999992,"photo":"https://lh5.googleusercontent.com/-3c9OOIISk6o/Vu75t17-dXI/AAAAAAAAB8U/Mo1clCZJhJAtwNlbtooz23ZdTgqm7JKDwCJkC/w1280-h853-k/","vicinity":"Tehran","open_hours":[{"day":"Monday","hours":"9am–11pm","$$hashKey":"object:2473"},{"day":"Tuesday","hours":"9am–11pm","$$hashKey":"object:2474"},{"day":"Wednesday","hours":"9am–11pm","$$hashKey":"object:2475"},{"day":"Thursday","hours":"9am–11pm","$$hashKey":"object:2476"},{"day":"Friday","hours":"9am–11pm","$$hashKey":"object:2477"},{"day":"Saturday","hours":"9am–11pm","$$hashKey":"object:2478"},{"day":"Sunday","hours":"9am–11pm","$$hashKey":"object:2479"}],"marker":{"fillColor":"#8E24AA","fillOpacity":1,"strokeWeight":0,"scale":1.5,"path":"M10.2,2.5v4.2c0,0,0,0,0,0L10.2,2.5c-6,0-10.9,4.9-10.9,10.9s10.9,23.8,10.9,23.8v0c0,0,10.9-17.8,10.9-23.8 S16.2,2.5,10.2,2.5z M10.2,17.9c-2.5,0-4.6-2.1-4.6-4.6s2.1-4.6,4.6-4.6s4.6,2.1,4.6,4.6S12.8,17.9,10.2,17.9z M16.8,14.1 c0-0.2,0-0.3,0-0.5C16.9,13.8,16.9,14,16.8,14.1z","anchor":{"x":10,"y":30},"origin":{"x":0,"y":0},"style":0},"iw":{"address":false,"desc":false,"email":false,"enable":true,"int_tel":false,"open":true,"open_hours":true,"photo":true,"tel":false,"title":true,"web":false}}
        ];
        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                icon: locations[i].marker,
                position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
                map: map,
                title: locations[i].title,
                address: locations[i].address,
                desc: locations[i].desc,
                tel: locations[i].tel,
                int_tel: locations[i].int_tel,
                vicinity: locations[i].vicinity,
                open: locations[i].open,
                open_hours: locations[i].open_hours,
                photo: locations[i].photo,
                time: locations[i].time,
                email: locations[i].email,
                web: locations[i].web,
                iw: locations[i].iw
            });
            markersArray.push(marker);

            if (locations[i].iw.enable === true){
                bindInfoWindow(marker, map, locations[i]);
            }
        }
    }
</script>
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// jQuery
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var resizeId;
var lastModal;
var customizerEnabled = 1;
var defaultColor;
$(document).ready(function($) {
    "use strict";

    if( $("body").hasClass("navigation-fixed") ){
        fixedNavigation(true);
    }
    else {
        fixedNavigation(false);
    }

    if( customizerEnabled == 1 ){
        $.getScript( "assets/misc/customizer.js", function( data, textStatus, jqxhr ) {
            loadColor("load_default_color");
        });
    }

    if( $(".tse-scrollable").length ){
        $(".tse-scrollable").TrackpadScrollEmulator();
    }

    if( $(".date-picker").length ){
        $(".date-picker").datepicker();
    }

    if( viewport.is('xs') ){
        $(".map-wrapper").height( $(window).height() - $("#page-header").height() );
        $(".has-background").css( "min-height", $(window).height() - $("#page-header").height() + "px" );
    }
    else {
        if( $("body").hasClass("navigation-fixed") ){
            $(".hero-section.full-screen").height( $(window).height() - $("#page-header nav").height() );
        }
        else {
            $(".hero-section.full-screen").height( $(window).height() - $("#page-header").height() );
        }
    }

//  Social Share -------------------------------------------------------------------------------------------------------

    if( $(".social-share").length ){
        socialShare();
    }

//  Count down  --------------------------------------------------------------------------------------------------------

    if( $(".count-down").length ){
        /*

        REMOVE THIS COMMENT IN YOUR PROJECT

        var year = parseInt( $(".count-down").attr("data-countdown-year"), 10 );
        var month = parseInt( $(".count-down").attr("data-countdown-month"), 10 ) - 1;
        var day = parseInt( $(".count-down").attr("data-countdown-day"), 10 );
         $(".count-down").countdown( {until: new Date(year, month, day), padZeroes: true, format: 'HMS'} );
        */
        var date = new Date();
        $(".count-down").countdown( {until: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2 ), padZeroes: true, format: 'HMS'} );
    }

// Render hero search form ---------------------------------------------------------------------------------------------

    $("select").on("rendered.bs.select", function () {
        $('head').append( $('<link rel="stylesheet" type="text/css">').attr('href', 'assets/css/bootstrap-select.min.css') );
        if( !viewport.is('xs') ){
            $(".search-form.vertical").css( "top", ($(".hero-section").height()/2) - ($(".search-form .wrapper").height()/2) );
        }
        trackpadScroll("initialize");
    });

    if( !viewport.is('xs') ){
        $(".search-form.vertical").css( "top", ($(".hero-section").height()/2) - ($(".search-form .wrapper").height()/2) );
        trackpadScroll("initialize");
    }

//  iCheck -------------------------------------------------------------------------------------------------------------

    if ($("input[type=checkbox]").length > 0) {
        $("input").iCheck();
    }

    if ($("input[type=radio]").length > 0) {
        $("input").iCheck();
    }

//  Smooth Scroll ------------------------------------------------------------------------------------------------------

    $('.main-nav a[href^="#"], a[href^="#"].scroll').on('click',function (e) {
        e.preventDefault();
        var target = this.hash,
            $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 2000, 'swing', function () {
            window.location.hash = target;
        });
    });

//  Modal after click --------------------------------------------------------------------------------------------------

    $("[data-modal-external-file], .quick-detail").live("click", function(e){
        e.preventDefault();
        var modalTarget, modalFile;
        if( $(this).closest(".item").attr("data-id") ){
            modalTarget = $(this).closest(".item").attr("data-id");
            modalFile = "modal_item.php";
        }
        else {
            modalTarget = $(this).attr("data-target");
            modalFile = $(this).attr("data-modal-external-file");
        }
        if( $(this).attr("data-close-modal") == "true" ){
            lastModal.modal("hide");
            setTimeout(function() {
                openModal(modalTarget, modalFile);
            }, 400);
        }
        else {
            openModal(modalTarget, modalFile);
        }
    });

//  Multiple modal hack ------------------------------------------------------------------------------------------------

    $(document).on('show.bs.modal', '.modal', function () {
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        setTimeout(function() {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    });

//  Map in Row listing -------------------------------------------------------------------------------------------------

    $(".item.item-row").each(function() {
        var element = "map"+$(this).attr("data-id");
        var place;
        $(this).find(".map").attr("id", element );
        var _latitude = $(this).attr("data-latitude");
        var _longitude = $(this).attr("data-longitude");
        if( $(this).attr("data-address") ){
            place = $(this).attr("data-address");
        }
        else {
            place = false;
        }
        simpleMap(_latitude,_longitude, element, false, place);
    });

//  Close "More" menu on click anywhere on page ------------------------------------------------------------------------

    $(document).on("click", function(e){
        if( e.target.className == "controls-more" ){
            $(".controls-more.show").removeClass("show");
            $(e.target).addClass("show");

        }
        else {
            $(".controls-more.show").each(function() {
                $(this).removeClass("show");
            });
        }
    });

// Mobile navigation button --------------------------------------------------------------------------------------------

    $(".nav-btn").on("click", function(){
        $(this).toggleClass("active");
        $(".primary-nav").toggleClass("show");
    });

//  Duplicate desired element ------------------------------------------------------------------------------------------

    $(".duplicate").live("click", function(e){
        e.preventDefault();
        var duplicateElement = $(this).attr("href");
        var parentElement = $(duplicateElement)[0].parentElement;
        $(parentElement).append( $(duplicateElement)[0].outerHTML );
    });

//  Enable image previews in multi file input --------------------------------------------------------------------------

    if( $("input[type=file].with-preview").length ){
        $("input.file-upload-input").MultiFile({
            list: ".file-upload-previews"
        });
    }

//  No UI Slider -------------------------------------------------------------------------------------------------------

    if( $('.ui-slider').length > 0 ){
        $('.ui-slider').each(function() {
            if( $("body").hasClass("rtl") ) var rtl = "rtl";
            else rtl = "ltr";

            var step;
            if( $(this).attr('data-step') ) {
                step = parseInt( $(this).attr('data-step') );
            }
            else {
                step = 10;
            }
            var sliderElement = $(this).attr('id');
            var element = $( '#' + sliderElement);
            var valueMin = parseInt( $(this).attr('data-value-min') );
            var valueMax = parseInt( $(this).attr('data-value-max') );
            $(this).noUiSlider({
                start: [ valueMin, valueMax ],
                connect: true,
                direction: rtl,
                range: {
                    'min': valueMin,
                    'max': valueMax
                },
                step: step
            });
            if( $(this).attr('data-value-type') == 'price' ) {
                if( $(this).attr('data-currency-placement') == 'before' ) {
                    $(this).Link('lower').to( $(this).children('.values').children('.value-min'), null, wNumb({ prefix: $(this).attr('data-currency'), decimals: 0, thousand: '.' }));
                    $(this).Link('upper').to( $(this).children('.values').children('.value-max'), null, wNumb({ prefix: $(this).attr('data-currency'), decimals: 0, thousand: '.' }));
                }
                else if( $(this).attr('data-currency-placement') == 'after' ){
                    $(this).Link('lower').to( $(this).children('.values').children('.value-min'), null, wNumb({ postfix: $(this).attr('data-currency'), decimals: 0, thousand: ' ' }));
                    $(this).Link('upper').to( $(this).children('.values').children('.value-max'), null, wNumb({ postfix: $(this).attr('data-currency'), decimals: 0, thousand: ' ' }));
                }
            }
            else {
                $(this).Link('lower').to( $(this).children('.values').children('.value-min'), null, wNumb({ decimals: 0 }));
                $(this).Link('upper').to( $(this).children('.values').children('.value-max'), null, wNumb({ decimals: 0 }));
            }
        });
    }

//  Calendar

    if( $(".calendar").length ){
        var date = new Date();
        var month = date.getMonth();
        for( var i = 1 ; i<=12 ; i++ ){
            $('.calendar-wrapper').append('<div id="month_'+i+'" class="month"></div>');
            $("#month_"+i).zabuto_calendar({
                ajax: {
                    url: "assets/php/calendar.php",
                    modal: true
                },
                action: function () {
                    var date = $("#" + this.id).data("date");
                    $("#modal-date").val(date);
                    return checkDate(this.id);
                },
                language: "en",
                month: i,
                show_previous: false,
                show_next: false,
                today: true,
                nav_icon: {
                    prev: '<i class="arrow_left"></i>',
                    next: '<i class="arrow_right"></i>'
                }
            });
        }
        $(".calendar-wrapper").owlCarousel({
            items: 2,
            nav: true,
            autoHeight: true,
            navText: [],
            startPosition: month
        });
    }

//  Form Validation

    $(".form-email .btn[type='submit']").on("click", function(){
        var button = $(this);
        var form = $(this).closest("form");
        button.prepend("<div class='status'></div>");
        form.validate({
            submitHandler: function() {
                $.post("assets/external/email.php", form.serialize(),  function(response) {
                    //console.log(response);
                    button.find(".status").append(response);
                    form.addClass("submitted");
                });
                return false;
            }
        });
    });

    equalHeight(".container");
    ratingPassive("body");
    bgTransfer();
    responsiveNavigation();

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// On Load
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).load(function(){
    initializeOwl();
});

$(window).resize(function(){
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 250);
    responsiveNavigation();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function openModal(target, modalPath){

    $("body").append('<div class="modal modal-external fade" id="'+ target +'" tabindex="-1" role="dialog" aria-labelledby="'+ target +'"><i class="loading-icon fa fa-circle-o-notch fa-spin"></i></div>');

    $("#" + target + ".modal").on("show.bs.modal", function () {
        var _this = $(this);
        lastModal = _this;
        $.ajax({
            url: "assets/external/" + modalPath,
            method: "POST",
            //dataType: "html",
            data: { id: target },
            success: function(results){
                _this.append(results);
                $('head').append( $('<link rel="stylesheet" type="text/css">').attr('href', 'assets/css/bootstrap-select.min.css') );
                $(".selectpicker").selectpicker();
                _this.find(".gallery").addClass("owl-carousel");
                ratingPassive(".modal");
                var img = _this.find(".gallery img:first")[0];
                if( img ){
                    $(img).load(function() {
                        timeOutActions(_this);
                    });
                }
                else {
                    timeOutActions(_this);
                }
                socialShare();
                _this.on("hidden.bs.modal", function () {
                    $(lastClickedMarker).removeClass("active");
                    $(".pac-container").remove();
                    _this.remove();
                });
            },
            error : function (e) {
                console.log(e);
            }
        });

    });

    $("#" + target + ".modal").modal("show");

    function timeOutActions(_this){
        setTimeout(function(){
            if( _this.find(".map").length ){
                if( _this.find(".modal-dialog").attr("data-address") ){
                    simpleMap( 0, 0, "map-modal", _this.find(".modal-dialog").attr("data-marker-drag"), _this.find(".modal-dialog").attr("data-address") );
                }
                else {
                    simpleMap( _this.find(".modal-dialog").attr("data-latitude"), _this.find(".modal-dialog").attr("data-longitude"), "map-modal", _this.find(".modal-dialog").attr("data-marker-drag") );
                }
            }
            initializeOwl();
            initializeFitVids();
            initializeReadMore();
            _this.addClass("show");
        }, 200);

    }

}

//  Transfer "img" into CSS background-image

function bgTransfer(){
    //disable-on-mobile
    if( viewport.is('xs') ){

    }
    $(".bg-transfer").each(function() {
        $(this).css("background-image", "url("+ $(this).find("img").attr("src") +")" );
    });
}

function ratingPassive(element){
    $(element).find(".rating-passive").each(function() {
        for( var i = 0; i <  5; i++ ){
            if( i < $(this).attr("data-rating") ){
                $(this).find(".stars").append("<figure class='active fa fa-star'></figure>")
            }
            else {
                $(this).find(".stars").append("<figure class='fa fa-star'></figure>")
            }
        }
    });
}

function socialShare(){
    var socialButtonsEnabled = 1;
    if ( socialButtonsEnabled == 1 ){
        $('head').append( $('<link rel="stylesheet" type="text/css">').attr('href', 'assets/css/jssocials.css') );
        $('head').append( $('<link rel="stylesheet" type="text/css">').attr('href', 'assets/css/jssocials-theme-minima.css') );
        $.getScript( "assets/js/jssocials.min.js", function( data, textStatus, jqxhr ) {
            $(".social-share").jsSocials({
                shares: ["twitter", "facebook", "googleplus", "linkedin", "pinterest"]
            });
        });
    }
}

function initializeFitVids(){
    if ($(".video").length > 0) {
        $(".video").fitVids();
    }
}

function initializeOwl(){
    if( $(".owl-carousel").length ){
        $(".owl-carousel").each(function() {

            var items = parseInt( $(this).attr("data-owl-items"), 10);
            if( !items ) items = 1;

            var nav = parseInt( $(this).attr("data-owl-nav"), 2);
            if( !nav ) nav = 0;

            var dots = parseInt( $(this).attr("data-owl-dots"), 2);
            if( !dots ) dots = 0;

            var center = parseInt( $(this).attr("data-owl-center"), 2);
            if( !center ) center = 0;

            var loop = parseInt( $(this).attr("data-owl-loop"), 2);
            if( !loop ) loop = 0;

            var margin = parseInt( $(this).attr("data-owl-margin"), 2);
            if( !margin ) margin = 0;

            var autoWidth = parseInt( $(this).attr("data-owl-auto-width"), 2);
            if( !autoWidth ) autoWidth = 0;

            var navContainer = $(this).attr("data-owl-nav-container");
            if( !navContainer ) navContainer = 0;

            var autoplay = $(this).attr("data-owl-autoplay");
            if( !autoplay ) autoplay = 0;

            var fadeOut = $(this).attr("data-owl-fadeout");
            if( !fadeOut ) fadeOut = 0;
            else fadeOut = "fadeOut";

            if( $("body").hasClass("rtl") ) var rtl = true;
            else rtl = false;

            $(this).owlCarousel({
                navContainer: navContainer,
                animateOut: fadeOut,
                autoplaySpeed: 2000,
                autoplay: autoplay,
                autoheight: 1,
                center: center,
                loop: loop,
                margin: margin,
                autoWidth: autoWidth,
                items: items,
                nav: nav,
                dots: dots,
                autoHeight: true,
                rtl: rtl,
                navText: []
            });
        });
    }
}

function trackpadScroll(method){
    if( method == "initialize" ){
        if( $(".results-wrapper").find("form").length ) {
            $(".results-wrapper .results").height( $(".results-wrapper").height() - $(".results-wrapper .form")[0].clientHeight );
        }
    }
    else if ( method == "recalculate" ){
        setTimeout(function(){
            if( $(".tse-scrollable").length ){
                $(".tse-scrollable").TrackpadScrollEmulator("recalculate");
            }
        }, 1000);
    }
}

// Do after resize

function doneResizing(){
    var $equalHeight = $('.container');
    for( var i=0; i<$equalHeight.length; i++ ){
        equalHeight( $equalHeight );
    }
    responsiveNavigation()
}

// Responsive Navigation

function responsiveNavigation(){
    if( viewport.is('xs') ){
        $("body").addClass("nav-btn-only");
    }
    if( $("body").hasClass("nav-btn-only") ){
        $(".primary-nav .has-child").children("a").attr("data-toggle", "collapse");
        $(".primary-nav .has-child").find(".nav-wrapper").addClass("collapse");
        $(".mega-menu .heading").each(function(e) {
            $(this).wrap("<a href='" + "#mega-menu-collapse-"+e + "'></a>");
            $(this).parent().attr("data-toggle", "collapse");
            $(this).parent().addClass("has-child");
            $(this).parent().attr("aria-controls", "mega-menu-collapse-"+e);
        });
        $(".mega-menu ul").each(function(e) {
            $(this).attr("id", "mega-menu-collapse-"+e);
            $(this).addClass("collapse");
        });
    }
}

function equalHeight(container){
    if( !viewport.is('xs') ){
        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = new Array(),
            $el,
            topPosition = 0;

        $(container).find('.equal-height').each(function() {
            $el = $(this);
            //var marginBottom = $el.css("margin-bottom").replace("px", "");
            //console.log( $el.css("margin-bottom").replace("px", "") );
            $($el).height('auto');
            topPostion = $el.position().top;
            if (currentRowStart != topPostion) {
                for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
                rowDivs.length = 0; // empty the array
                currentRowStart = topPostion;
                currentTallest = $el.height();
                rowDivs.push($el);
            } else {
                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
            }
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
        });
    }
}

// Viewport ------------------------------------------------------------------------------------------------------------

var viewport = (function() {
    var viewPorts = ['xs', 'sm', 'md', 'lg'];

    var viewPortSize = function() {
        return window.getComputedStyle(document.body, ':before').content.replace(/"/g, '');
    };

    var is = function(size) {
        if ( viewPorts.indexOf(size) == -1 ) throw "no valid viewport name given";
        return viewPortSize() == size;
    };

    var isEqualOrGreaterThan = function(size) {
        if ( viewPorts.indexOf(size) == -1 ) throw "no valid viewport name given";
        return viewPorts.indexOf(viewPortSize()) >= viewPorts.indexOf(size);
    };

    // Public API
    return {
        is: is,
        isEqualOrGreaterThan: isEqualOrGreaterThan
    }

})();

// Rating --------------------------------------------------------------------------------------------------------------

function rating(element){
    var ratingElement =
            '<span class="stars">'+
                '<i class="fa fa-star s1" data-score="1"></i>'+
                '<i class="fa fa-star s2" data-score="2"></i>'+
                '<i class="fa fa-star s3" data-score="3"></i>'+
                '<i class="fa fa-star s4" data-score="4"></i>'+
                '<i class="fa fa-star s5" data-score="5"></i>'+
                '<i class="fa fa-star s6" data-score="6"></i>'+
                '<i class="fa fa-star s7" data-score="7"></i>'+
                '<i class="fa fa-star s8" data-score="8"></i>'+
                '<i class="fa fa-star s9" data-score="9"></i>'+
                '<i class="fa fa-star s10" data-score="10"></i>'+
                '</span>'
        ;
    if( !element ) { element = ''; }
    $.each( $(element + ' .star-rating'), function(i) {
        $(this).append(ratingElement);
        if( $(this).hasClass('active') ){
            $(this).append('<input readonly hidden="" name="score_' + $(this).attr('data-name') +'" id="score_' + $(this).attr('data-name') +'">');
        }
        // If rating exists
        var rating = $(this).attr('data-rating');
        for( var e = 0; e < rating; e++ ){
            var rate = e+1;
            console.log("a");
            $(this).children('.stars').children( '.s' + rate ).addClass('active');
        }
    });

    var ratingActive = $('.star-rating.active i');

    ratingActive.mouseenter(function() {
        for( var i=0; i<$(this).attr('data-score'); i++ ){
            var a = i+1;
            $(this).parent().children('.s'+a).addClass('hover');
        }
    })
    .mouseleave(function() {
        for( var i=0; i<$(this).attr('data-score'); i++ ){
            var a = i+1;
            $(this).parent().children('.s'+a).removeClass('hover');
        }
    });

    ratingActive.on('click', function(){
        $(this).parents(".star-rating").find("input").val( $(this).attr('data-score') );
        $(this).parent().children('.fa').removeClass('active');
        for( var i=0; i<$(this).attr('data-score'); i++ ){
            var a = i+1;
            $(this).parent().children('.s'+a).addClass('active');
        }
        return false;
    });
}

// Read more -----------------------------------------------------------------------------------------------------------

function initializeReadMore(){

    $.ajax({
        type: "GET",
        url: "assets/js/readmore.min.js",
        success: readMoreCallBack,
        dataType: "script",
        cache: true
    });

    function readMoreCallBack(){
        var collapseHeight;
        var $readMore = $(".read-more");
        if( $readMore.attr("data-collapse-height") ){
            collapseHeight =  parseInt( $readMore.attr("data-collapse-height"), 10 );
        }else {
            collapseHeight = 55;
        }
        $readMore.readmore({
            speed: 500,
            collapsedHeight: collapseHeight,
            blockCSS: 'display: inline-block; width: auto; min-width: 120px;',
            moreLink: '<a href="#" class="btn btn-primary btn-xs btn-light-frame btn-framed btn-rounded">More<i class="icon_plus"></i></a>',
            lessLink: '<a href="#" class="btn btn-primary btn-xs btn-light-frame btn-framed btn-rounded">Less<i class="icon_minus-06"></i></a>'
        });
    }
}

function fixedNavigation(state){
    if( state == true ){
        $("body").addClass("navigation-fixed");
        var headerHeight = $("#page-header").height();
        $("#page-header").css("position", "fixed");
        $("#page-content").css({
            "-webkit-transform" : "translateY(" + headerHeight + "px)",
            "-moz-transform"    : "translateY(" + headerHeight + "px)",
            "-ms-transform"     : "translateY(" + headerHeight + "px)",
            "-o-transform"      : "translateY(" + headerHeight + "px)",
            "transform"         : "translateY(" + headerHeight + "px)"
        });
    }
    else if( state == false ) {
        $("body").removeClass("navigation-fixed");
        $("#page-header").css("position", "relative");
        $("#page-content").css({
            "-webkit-transform" : "translateY(0px)",
            "-moz-transform"    : "translateY(0px)",
            "-ms-transform"     : "translateY(0px)",
            "-o-transform"      : "translateY(0px)",
            "transform"         : "translateY(0px)"
        });
    }
}

//  Show element after desired time ------------------------------------------------------------------------------------

if( !viewport.is('xs') ){
    var messagesArray = [];
    $("[data-toggle=popover]").popover({
        template: '<div class="popover" role="tooltip"><div class="close"><i class="fa fa-close"></i></div><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    $(".popover .close").live('click',function () {
        $(this).closest(".popover").popover("hide");
    });
    $("[data-show-after-time]").each(function() {
        var _this = $(this);
        setTimeout(function(){
            if( _this.attr("data-toggle") == "popover" ){
                _this.popover("show");
            }
            else {
                for( var i=0; i < messagesArray.length; i++ ){
                    $(messagesArray[i]).css("bottom", parseInt( $(messagesArray[i]).css("bottom") ) + _this.context.clientHeight + 10 );
                }
                messagesArray.push(_this);
                _this.addClass("show");
                if( _this.attr("data-close-after-time") ){
                    setTimeout(function(){
                        closeThis();
                    }, _this.attr("data-close-after-time") );
                }
            }
        }, _this.attr("data-show-after-time") );
        $(this).find(".close").on("click",function () {
            closeThis();
        });
        function closeThis(){
            _this.removeClass("show");
            setTimeout(function(){
                _this.remove();
            }, 400 );
        }
    });

}

//  Show element when scrolled desired amount of pixels ----------------------------------------------------------------

$("[data-show-after-scroll]").each(function() {
    var _this = $(this);
    var scroll = _this.attr("data-show-after-scroll");
    var offsetTop = $(this).offset().top;
    $(window).scroll(function() {
        var currentScroll = $(window).scrollTop();
        if (currentScroll >= scroll) {
            _this.addClass("show");
        }
        else {
            _this.removeClass("show");
        }
    });
});