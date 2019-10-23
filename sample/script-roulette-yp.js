$(function(){

	$('.roulette').find('img').hover(function(){
		console.log($(this).height());
	});
	var appendLogMsg = function(msg) {
		$('#msg')
	.append('<p class="muted">' + msg + '</p>')
	.scrollTop(100000000);
	}

	var p = {
		startCallback : function() {							/* fonction d'appel des parametres de la roulette */ 
			appendLogMsg('start');
			$('#speed, #duration').slider('disable');			
			$('#stopImageNumber').spinner('disable');
			$('.start').attr('disabled',);              /* true permet de lancer une seule fois la roulette */ 
			$('.stop').removeAttr('disabled'); 
		},
		slowDownCallback : function() {
			appendLogMsg('slowdown');
		},
	}
	var rouletter = $('div.roulette');
	rouletter.roulette(p);
	$('.start').on('click.dismiss', function(){
		rouletter.roulette('start');
		postRouletteTextUpdate();
	});

	var updateParamater = function(){
		/* p['speed'] = Number($('.speed_param').eq(0).text());
		p['duration'] = Number($('.duration_param').eq(0).text()); */
		p['speed'] = 20; //Fixé en dur 
		p['duration'] = 1;
	/*	p['stopImageNumber'] = Number($('.stop_image_number_param').eq(0).text()); */
		rouletter.roulette('option', p);	
	}
	var updateSpeed = function(speed){
		$('.speed_param').text(speed);
	}
	$('#speed').slider({
		min: 1,
		max: 30,
		value : 10,
		slide: function( event, ui ) {
			updateSpeed(ui.value);
			updateParamater();
		}
	});
	updateSpeed($('#speed').slider('value'));

	var updateDuration = function(duration){
		$('.duration_param').text(duration);
	}
	$('#duration').slider({
		min: 2,
		max: 15,
		value : 5,
		slide: function( event, ui ) {
			updateDuration(ui.value);
			updateParamater();
		}
	});
	updateDuration($('#duration').slider('value'));

	$('#stopImageNumber').spinner({
		spin: function( event, ui ) {
			var imageNumber = ui.value;
			if ( ui.value > 7 ) {
				$( this ).spinner( "value", -1 );
				imageNumber = -1;	
				updateStopImageNumber(-1);		
				return false;
			} else if ( ui.value < -1 ) {
				$( this ).spinner( "value", 7 );
				imageNumber = 7;	
				updateStopImageNumber(7);		
				return false;
			}
			updateStopImageNumber(imageNumber);
		}
	});

	$('#stopImageNumber').spinner('value', -1);                          /* la valeur -1 est aléatoire ET par défaut */ 
	updateStopImageNumber($('#stopImageNumber').spinner('value'));		
	
	

});

