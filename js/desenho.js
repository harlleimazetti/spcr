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
	} else if (opcao == 'eletro') {
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
		$('#desenho_container').append('<div class="item_desenho parede" id="' + id + '"></div>');
	} else if (opcao == 'arma_fogo') {
		$('#desenho_container').append('<div class="item_desenho arma_fogo" id="' + id + '"><span class="icone-arma_fogo icon-3x teste"></span></div>');
	} else if (opcao == 'corpo') {
		$('#desenho_container').append('<div class="item_desenho corpo" id="' + id + '"><span class="icon-male icon-3x teste"></span></div>');
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
	$('.desenho_menu').hide('fast');
	$('#desenho_parametros').show('fast');
	var id = $(this).attr('id');
	sessionStorage.el_desenho = '#' + id;
	inicializa_desenho();
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
	var items = document.querySelectorAll('.item_desenho');
	for ( var i = 0, len = items.length; i < len; i++ ) {
		var item = items[i];
		var draggie = new Draggabilly(item, { grid: [20,20] } );
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

function DoRotate(el, d) {
	$(el).css({ rotate: d + 'deg' });
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

///////// DESENHO FIM