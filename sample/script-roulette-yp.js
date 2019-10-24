$(function () {

	$('.roulette').find('img').hover(function () {
		console.log($(this).height());
	});
	var appendLogMsg = function (msg) {
		$('#msg')
			.append('<p class="muted">' + msg + '</p>')
			.scrollTop(100000000);
	}

	var p = {
		startCallback: function () {													/* fonction des parametres de la roulette */
			appendLogMsg('start');
			$('#speed, #duration').slider('disable');									/* renvoie les parametres speed et duration à la function start */
			$('#stopImageNumber').spinner('disable');									/* renvoie de resultat de la roulette */
			$('.start').attr('disabled');             									/* true permet de lancer une seule fois la roulette */
			$('.stop').removeAttr('disabled'); 											/* permet de stopper la roulette  */
		},
		slowDownCallback: function () {													/* function effet de ralentissement */
			appendLogMsg('slowdown');
		},
	}
	var rouletter = $('div.roulette');													/* fonction lancement de la roulette */
	rouletter.roulette(p);

	$('.start').on('click.dismiss', function () {											/* chainage du btn à la fonction roulette */
		rouletter.roulette('start');
											
	});

	var updateParamater = function () {													/* fonction des modifications des parametres de la roulette */
		p['speed'] = Number($('.speed_param').eq(0).text());							/* paramètre de vitesse  */
		p['duration'] = Number($('.duration_param').eq(0).text());						/* paramètre de temps */
		/*p['stopImageNumber'] = Number($('.stop_image_number_param').eq(0).text());*/
		rouletter.roulette('option', p);
	}
	var updateSpeed = function (speed) {													/* evenement des modifications speed */
		$('.speed_param').text(speed);
	}
	$('#speed').slider({																/* récuparation de la valeur choisis */
		min: 1,
		max: 30,
		value: 10,
		slide: function (event, ui) {
			updateSpeed(ui.value);														/* nouvelle valeur speed récupéré */
			updateParamater();
		}
	});
	updateSpeed($('#speed').slider('value'));											/* update de la valeur choisis */

	var updateDuration = function (duration) {											/*  evenement des modifs duration */
		$('.duration_param').text(duration);
	}
	$('#duration').slider({																/* recuperation de la valeur */
		min: 2,
		max: 15,
		value: 5,
		slide: function (event, ui) {													/* nouvelle valeur speed récupéré */
			updateDuration(ui.value);
			updateParamater();
		}
	});
	updateDuration($('#duration').slider('value'));	 									/* update de la valeur */


	var updateStopImageNumber = function (stopImageNumber) {
		$('.image_sample').children().css('opacity', 0.2);
		$('.image_sample').children().filter('[data-value="' + stopImageNumber + '"]').css('opacity', 1);
		$('.stop_image_number_param').text(stopImageNumber);
		updateParamater();
	}

	$('#stopImageNumber').spinner({
		spin: function (event, ui) {
			var imageNumber = ui.value;
			if (ui.value > 7) {
				$(this).spinner("value", -1);
				imageNumber = -1;
				updateStopImageNumber(-1);
				return false;
			} else if (ui.value < -1) {
				$(this).spinner("value", 7);
				imageNumber = 7;
				updateStopImageNumber(7);
				return false;
			}
			updateStopImageNumber(imageNumber);
		}
	});

	$('#stopImageNumber').spinner('value', -1);                          /* la valeur -1 est aléatoire ET par défaut */
	updateStopImageNumber($('#stopImageNumber').spinner('value'));
	
	$('.image_sample').children().click(function () {
		var stopImageNumber = $(this).attr('data-value');
		$('#stopImageNumber').spinner('value', stopImageNumber);
		updateStopImageNumber(stopImageNumber);
	});
});

