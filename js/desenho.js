/////// DESENHO INÍCIO

$(document).on('click', '#desenho_categorias .item', function()
{
	var opcao = $(this).data('opcao');
	$('#desenho_categorias').hide('fast');
	if (opcao == 'eixos') {
		$('#desenho_eixos').show('fast');
	} else if (opcao == 'grades') {
		$('#desenho_grades').show('fast');
	} else if (opcao == 'paredes') {
		$('#desenho_paredes').show('fast');
	} else if (opcao == 'vaos') {
		$('#desenho_vaos').show('fast');
	} else if (opcao == 'janelas') {
		$('#desenho_janelas').show('fast');
	} else if (opcao == 'portas') {
		$('#desenho_portas').show('fast');
	} else if (opcao == 'eletrodomesticos') {
		$('#desenho_eletro').show('fast');
	} else if (opcao == 'corpos') {
		$('#desenho_corpos').show('fast');
	} else if (opcao == 'armas') {
		$('#desenho_armas').show('fast');
	}
});

$(document).on('click', '.desenho_menu .item', function()
{
	var opcao = $(this).data('opcao');
	var n = $('.item_desenho').length;
	var id = 'item_desenho' + n;
	if (opcao == 'parede_horizontal') {
		$('#desenho_container').append('<div id="container_desenho1" class="container_desenho"><div class="item_desenho parede" id="' + id + '"></div></div>');
	} if (opcao == 'parede_vertical') {
		$('#desenho_container').append('<div id="container_desenho1" class="container_desenho"><div class="item_desenho parede_vertical" id="' + id + '"></div></div>');
	} else if (opcao == 'arma_fogo') {
		$('#desenho_container').append('<div id="container_desenho1" class="container_desenho"><div class="item_desenho arma_fogo" id="' + id + '"></div></div>');
	} else if (opcao == 'corpo') {
		$('#desenho_container').append('<div id="container_desenho1" class="container_desenho"><div class="item_desenho corpo" id="' + id + '"></div></div>');
	} else if (opcao == 'porta') {
		$('#desenho_container').append('<div id="container_desenho1" class="container_desenho"><div class="item_desenho porta" id="' + id + '"></div></div>');
	} else if (opcao == 'eletro') {
		$('#desenho_container').append('<div id="container_desenho1" class="container_desenho"><div class="item_desenho eletro" id="' + id + '"></div></div>');
	}
	inicializa_desenho();
});

$(document).on('click', '.desenho_menu .voltar', function()
{
	$(this).closest('.desenho_menu').hide('fast');
	$('#desenho_categorias').show('fast');
});

$(document).on('tap', '.item_desenho', function()
{
	if (!$('#desenho_parametros').is(':visible')) {
		$('.desenho_menu').hide('fast');
		$('#desenho_parametros').show('fast');
	}
	var id = $(this).attr('id');
	sessionStorage.el_desenho = '#' + id;
	var altura = $(sessionStorage.el_desenho).css('height');
	var largura = $(sessionStorage.el_desenho).css('width');
	var rotate = $(sessionStorage.el_desenho).attr('data-rotate');
	var nome = $(sessionStorage.el_desenho).attr('data-nome');
	console.log('Altura: ' + altura + ', Largura: ' + largura + ', Rotate: ' + rotate);
	$('#knob-height').val(altura).trigger('change');
	$('#knob-width').val(largura).trigger('change');
	$('#knob-rotate').val(rotate).trigger('change');
	$('#item_desenho_nome').val(nome);
	inicializa_desenho();
});

$(document).on('blur', '#item_desenho_nome', function() {
	DoNome(sessionStorage.el_desenho, $(this).val());
});

function inicializa_desenho() {
	$(function() {
    	$(".knob.rotate").knob({
			change : function (value) {
				DoRotate(sessionStorage.el_desenho, value);
			}
		});
	});
	$(function() {
    	$(".knob.scale").knob({
			change : function (value) {
				DoScale(sessionStorage.el_desenho, value);
			}
		});
	});
	$(function() {
    	$(".knob.width").knob({
			change : function (value) {
				DoWidth(sessionStorage.el_desenho, value);
			}
		});
	});
	$(function() {
    	$(".knob.height").knob({
			change : function (value) {
				DoHeight(sessionStorage.el_desenho, value);
			}
		});
	});
	//var elem = document.querySelector('#drag_element');
	Draggabilly.prototype.positionDrag = Draggabilly.prototype.setLeftTop;
	//var items = document.querySelectorAll('.item_desenho');
	var items = document.querySelectorAll('.container_desenho');
	for ( var i = 0, len = items.length; i < len; i++ ) {
		var item = items[i];
		var draggie = new Draggabilly(item);
		draggie.on( 'dragMove', function( instance, event, pointer ) {
			//console.log( 'dragMove on ' + event.type + pointer.pageX + ', ' + pointer.pageY + ' position at ' + instance.position.x + ', ' + instance.position.y );
			$('.info_x').html('X: ' + instance.position.x);
			$('.info_y').html('Y: ' + instance.position.y);
		});
	}
	//var draggie = new Draggabilly( document.querySelector('.item_desenho') );
	//var draggie = new Draggabilly( elem, {
		//options...
		//containment: '#desenho_container'
	//});	
}

$(document).on('pagebeforeshow', '#desenho', function()
{
	inicializa_desenho();
});

$(document).on('click', '.move-up', function()
{
	//alert($(sessionStorage.el_desenho).attr('id'));
	//alert($(sessionStorage.el_desenho).closest('div.container_desenho').css('left') + ', ' + $(sessionStorage.el_desenho).closest('div.container_desenho').css('top'));
	$(sessionStorage.el_desenho).closest('div.container_desenho').css({top: '-=1px'});
});

$(document).on('click', '.move-right', function()
{
	$(sessionStorage.el_desenho).closest('div.container_desenho').css({left: '+=1px'});
});

$(document).on('click', '.move-left', function()
{
	$(sessionStorage.el_desenho).closest('div.container_desenho').css({left: '-=1px'});
});

$(document).on('click', '.move-down', function()
{
	$(sessionStorage.el_desenho).closest('div.container_desenho').css({top: '+=1px'});
});

function DoRotate(el, d) {
	$(el).css({ rotate: d + 'deg' });
	$(el).attr('data-rotate',d);
}

function DoScale(el, v) {
	v = v / 100;
	$(el).css({ scale: v });
}

function DoWidth(el, v) {
	$(el).css({ width : v + 'px' });
}

function DoHeight(el, v) {
	$(el).css({ height : v + 'px' });
}

function DoNome(el, v) {
	$(el).attr('data-nome', v);
}

///////// DESENHO FIM