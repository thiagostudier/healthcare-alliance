$(function(){

	/* ================
	   SELECT LANGUAGE
	==================*/
    $('.select-language').flagStrap({
    	placeholder:{
    		text: null,
    	},
        onSelect: function (value, element) {
            alert(value);
            console.log(element);
        }
    });
    /* ================
	end SELECT LANGUAGE
	==================*/

    /* ================
	   CALC DISTÂNCIA
	==================*/
	$('.distancia-calc :radio').change(function() {
		esvaziarEstrela();
			preencherEstrela(this.value);
	});

	function preencherEstrela(number){
		$(".star-"+number).removeClass("fa-star-o");
			$(".star-"+number).addClass("fa-star");
	}

	function esvaziarEstrela(){
		$(".star i").addClass("fa-star-o");
		$(".star i").removeClass("fa-star");
	}
	/* ================
	end CALC DISTÂNCIA
	==================*/

	/* ================
	       	MODAL
	==================*/
	var videoSrc;  

	$('.video-btn').click(function() {
	    videoSrc = $(this).data("src");
	});

	$('#modal-video').on('hidden.bs.modal', function () {
		$('#video').each(function(){
			var el_src = $(this).attr("src");
        	$(this).attr("src",el_src);
		});
	}); 
	/* ================
	      END MODAL
	==================*/

	/* ================
	       SCROLL
	==================*/
	$('.scroll').on("click", function(){
    	id = $(this).data("scroll");	
    	scroll('#'+id);
    });
    function scroll(id){
    	$(window).on('mousewheel', function() {
			$('html, body').stop();
		});
        $('html, body').stop().animate({
            scrollTop: $(id).offset().top
        }, 1000, 'easeInOutExpo');
    }
    /* ================
	      END SCROLL
	==================*/

	/* ================
      NAVTABS REGISTER
	==================*/

	$('body').on('shown.bs.modal', '#loginModal', function () {
	    $('input:visible:enabled:first', this).focus();
	});

	$('body').on('shown.bs.modal', '#createModal', function () {
	    $('input:visible:enabled:first', this).focus();
	});

	$(".toogle-button").on("click", function(){
		$(".toogle-button").removeClass("active");
		$(this).addClass("active");
		// PEGAR ID DO ELEMENTO
		element = "#"+$(this).data("element");
		// PEGAR CLASSE DO ELEMENTO
		classe = "."+$(this).data("show");
		// MOSTRAR A PENAS ELEMENTO SELECIONADO
		$(classe).slideUp(200, function(){
			$(element).slideDown();
			$(classe+" input").val("");
			$(element+" .autofocus").focus();
		});
	})

	/* ================
    end NAVTABS REGISTER
	==================*/


	/* ================
    	  ACCORDION
	==================*/
	$(".item_accordion").on("click", function(){
		$(".item_accordion").removeClass("active");
		// SE O ACCORDION ESTIVER ABERTO
		if($(this).next().css("display") == 'block'){
			$('.body_accordion').slideUp("swing");
		}else{
			// SE O ACCORDION ESTIVER FECHADO
			$(this).addClass("active");
			$('.body_accordion').slideUp("swing");
			$(this).next().slideToggle("swing")
  		}
  	});	
    /* ================
       end ACCORDION
	==================*/

	/*================
         INPUT RANGE
	==================*/

	function getVals(){
	  	// Get slider values
	  	var parent = this.parentNode;
	  	var slides = parent.getElementsByTagName("input");
	    var slide1 = parseFloat( slides[0].value );
	    var slide2 = parseFloat( slides[1].value );
	  	// Neither slider will clip the other, so make sure we determine which is larger
	  	if( slide1 > slide2 ){ var tmp = slide2; slide2 = slide1; slide1 = tmp; }
	  
	  	var displayElement = parent.getElementsByClassName("rangeValues")[0];
	    displayElement.innerHTML = slide1 + "km - " + slide2 + "km";
	}

  	// Initialize Sliders
  	var sliderSections = document.getElementsByClassName("range-slider");
    for( var x = 0; x < sliderSections.length; x++ ){
        var sliders = sliderSections[x].getElementsByTagName("input");
        for( var y = 0; y < sliders.length; y++ ){
          	if( sliders[y].type ==="range" ){
            	sliders[y].oninput = getVals;
            	// Manually trigger event first time to display values
            	sliders[y].oninput();
          	}
        }
    }

	/*================
	  end INPUT RANGE
	==================*/

});