function get_all_impressao_digital(fn) 
{
	var re_id = sessionStorage.re_id;
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM impressao_digital WHERE re_id = '" + re_id + "' ORDER BY numero_ordem, id, data, hora";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var impressao_digital = new Array;
				for (var i = 0; i < result.rows.length; i++) 
				{
					var row = result.rows.item(i);
					impressao_digital[i] = new Object();
					impressao_digital[i].id					= row.id;
					impressao_digital[i].re_id				= row.re_id;
					impressao_digital[i].numero_ordem		= row.numero_ordem;
					impressao_digital[i].data				= row.data;
					impressao_digital[i].hora				= row.hora;
					impressao_digital[i].coordenadas		= row.coordenadas;
					impressao_digital[i].descricao			= row.descricao;
					impressao_digital[i].localizacao		= row.localizacao;
					impressao_digital[i].imagem_uri			= row.imagem_uri;
				}
				fn(impressao_digital);
			}
		});
	});
}

function get_all_impressao_digital_t(fn) 
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM impressao_digital ORDER BY numero_ordem, id, data, hora";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var impressao_digital = new Array;
				for (var i = 0; i < result.rows.length; i++) 
				{
					var row = result.rows.item(i);
					impressao_digital[i] = new Object();
					impressao_digital[i].id					= row.id;
					impressao_digital[i].re_id				= row.re_id;
					impressao_digital[i].numero_ordem		= row.numero_ordem;
					impressao_digital[i].data				= row.data;
					impressao_digital[i].hora				= row.hora;
					impressao_digital[i].coordenadas		= row.coordenadas;
					impressao_digital[i].descricao			= row.descricao;
					impressao_digital[i].localizacao		= row.localizacao;
					impressao_digital[i].imagem_uri			= row.imagem_uri;
				}
				fn(impressao_digital);
			}
		});
	});
}

function get_impressao_digital(id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM impressao_digital WHERE id = " + id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var impressao_digital = new Object();
				var row = result.rows.item(0);
				impressao_digital.id				= row.id;
				impressao_digital.re_id				= row.re_id;
				impressao_digital.numero_ordem		= row.numero_ordem;
				impressao_digital.data				= row.data;
				impressao_digital.hora				= row.hora;
				impressao_digital.coordenadas		= row.coordenadas;
				impressao_digital.descricao			= row.descricao;
				impressao_digital.localizacao		= row.localizacao;
				impressao_digital.imagem_uri		= row.imagem_uri;
				fn(impressao_digital);
			}
		});
	});
}

function get_no_impressao_digital(re_id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM impressao_digital WHERE re_id = '" + re_id + "' ORDER BY id DESC LIMIT 0,1";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var row = result.rows.item(0);
				var numero_ordem = parseInt(row.numero_ordem);
				numero_ordem++;
				fn(numero_ordem);
			} else {
				fn(1);
			}
		});
	});
}

function get_last_impressao_digital(fn)
{
	db.transaction(function (tx)
	{
		var sql = "SELECT * FROM impressao_digital ORDER BY id DESC LIMIT 1";
		tx.executeSql (sql, undefined, function (tx, result)
		{
			if (result.rows.length)
			{
				var impressao_digital = new Object();
				var row = result.rows.item(0);
				impressao_digital.id	= row.id;
				fn(impressao_digital);
			}
		});
	});
}

function salvar_impressao_digital(impressao_digital, operacao_bd, fn)
{
	db.transaction(function (tx)
	{
		if (operacao_bd == 'novo')
		{
			var sql = "INSERT INTO impressao_digital (" +
					"re_id, " + 
					"numero_ordem, " + 
					"data, " + 
					"hora, " + 
					"coordenadas, " + 
					"descricao, " + 
					"localizacao, " + 
					"imagem_uri " + 
				") VALUES ( " +
					"'" + impressao_digital.re_id + "', " + 
					"'" + impressao_digital.numero_ordem + "', " + 
					"'" + formata_data_db(impressao_digital.data) + "', " + 
					"'" + impressao_digital.hora + "', " + 
					"'" + impressao_digital.coordenadas + "', " + 
					"'" + impressao_digital.descricao + "', " + 
					"'" + impressao_digital.localizacao + "', " + 
					"'" + impressao_digital.imagem_uri + "'" + 
				")";
		} else {
			var sql = "UPDATE impressao_digital SET " +
						"re_id = '" + impressao_digital.re_id + "', " +  
						"numero_ordem = '" + impressao_digital.numero_ordem + "', " + 
						"data = '" + formata_data_db(impressao_digital.data) + "', " + 
						"hora = '" + impressao_digital.hora + "', " + 
						"coordenadas = '" + impressao_digital.coordenadas + "', " + 
						"descricao = '" + impressao_digital.descricao + "', " + 
						"localizacao = '" + impressao_digital.localizacao + "', " + 
						"imagem_uri = '" + impressao_digital.imagem_uri + "'" + 
					" WHERE id = " + impressao_digital.id;
		}
		tx.executeSql(sql);
		var resultado = new Object();
		resultado.status = 1;
		resultado.mensagem = 'Registro salvo com sucesso';	
		fn(resultado);
	});
}

function excluir_impressao_digital(id, fn)
{
	db.transaction(function (tx)
	{
		var sql = "DELETE FROM impressao_digital WHERE id = " + id;
		tx.executeSql (sql, undefined, function (tx, result)
		{
			var resultado = new Object();
			resultado.status = 1;
			resultado.mensagem = 'Registro excluído com sucesso';	
			fn(resultado);
		});
	});
}

function reordena_impressao_digital()
{
	get_all_impressao_digital(function(impressao_digital) {
		var x = 1;
		for (var i = 0; i < impressao_digital.length; i++) 
		{
			impressao_digital[i].numero_ordem = x;
			salvar_impressao_digital(impressao_digital[i], 'editar', function(resultado) {});
			x++;
		}		
	});
}

///////// IMPRESSÃO DIGITAL INÍCIO

$(document).on('pageshow', '#impressao_digital_lista', function()
{
	var output = '';
	$('#lista_impressao_digital').empty();
	get_all_impressao_digital(function(impressao_digital) {
		for (var i = 0; i < impressao_digital.length; i++)
		{
			output += '<li id="' + impressao_digital[i].id + '" data-id="' + impressao_digital[i].id + '"><a href="#"><img src="' + impressao_digital[i].imagem_uri + '" /><h2>' + formata_data(impressao_digital[i].data) + ', ' + impressao_digital[i].hora + '</h2><p>' + impressao_digital[i].descricao + '</p></a><a href="#" class="excluir">Excluir</a></li>';
		}
		$('#lista_impressao_digital').append(output).listview('refresh');
	});
});

$(document).on('click', '#lista_impressao_digital li', function()
{
	impressao_digital_id = $(this).data('id');
	sessionStorage.impressao_digital_id = impressao_digital_id;
	sessionStorage.operacao_bd = 'editar';
	$.mobile.changePage( "#impressao_digital_formulario", {transition : 'none'} );
});

$(document).on('click', '#lista_impressao_digital li .excluir', function()
{
	$el = $(this).closest('li');
	impressao_digital_id = $el.data('id');
	sessionStorage.impressao_digital_id = impressao_digital_id;
	var resp = confirm('Excluir o registro?');
	if (resp == true) {
		excluir_impressao_digital(impressao_digital_id, function(resultado) {
			reordena_impressao_digital();
			$($el).remove();
		});
	}
	$('#lista_impressao_digital').listview('refresh');
	event.preventDefault();
	return false;
});

$(document).on('pagebeforeshow', '#impressao_digital_formulario', function()
{
	var operacao_bd = sessionStorage.operacao_bd;
	if (operacao_bd == 'editar')
	{
		var impressao_digital_id = sessionStorage.impressao_digital_id;
		get_impressao_digital(impressao_digital_id, function(impressao_digital) {
			$('#impressao_digital_form #operacao_bd').val(operacao_bd);
			$('#impressao_digital_form #id').val(impressao_digital.id);
			$('#impressao_digital_form #re_id').val(sessionStorage.re_id);
			$('#re_codigo', $.mobile.activePage).html('RE: ' + sessionStorage.re_codigo);
			$('#numero_ordem_texto', $.mobile.activePage).html(impressao_digital.numero_ordem);
			$('#impressao_digital_form #numero_ordem').val(impressao_digital.numero_ordem);
			$('#impressao_digital_form #data').val(formata_data(impressao_digital.data));
			$('#impressao_digital_form #hora').val(impressao_digital.hora);
			$('#impressao_digital_form #coordenadas').val(impressao_digital.coordenadas);
			$('#impressao_digital_form #descricao').val(impressao_digital.descricao);
			$('#impressao_digital_form #localizacao').val(impressao_digital.localizacao);
			$('#impressao_digital_form #imagem_uri').val(impressao_digital.imagem_uri);
			$('#impressao_digital_form #visualizacao_imagem').attr('src', impressao_digital.imagem_uri);
		});
	} else {
		var impressao_digital_id = sessionStorage.impressao_digital_id;
		get_no_impressao_digital(sessionStorage.re_id, function(numero_ordem) {
			$('#impressao_digital_form #operacao_bd').val(operacao_bd);
			$('#impressao_digital_form #id').val(impressao_digital_id);
			$('#impressao_digital_form #re_id').val(sessionStorage.re_id);
			$('#re_codigo', $.mobile.activePage).html('RE: ' + sessionStorage.re_codigo);
			$('#numero_ordem_texto', $.mobile.activePage).html(numero_ordem);
			$('#impressao_digital_form #numero_ordem').val(numero_ordem);
			$('#impressao_digital_form #data').val('');
			$('#impressao_digital_form #hora').val('');
			$('#impressao_digital_form #coordenadas').val('');
			$('#impressao_digital_form #descricao').val('');
			$('#impressao_digital_form #localizacao').val('');
			$('#impressao_digital_form #imagem_uri').val('');
			$('#impressao_digital_form #visualizacao_imagem').attr('src', '');
			
			var data = data_atual();
			var hora = hora_atual();
			$('#impressao_digital_form #data').val(data);
			$('#impressao_digital_form #hora').val(hora);
			$('#impressao_digital_form #capturar_coordenadas').trigger('click');
		});
	}
});

$(document).on('click', '#btn_impressao_digital_novo', function(event)
{
	event.preventDefault();
	sessionStorage.impressao_digital_id = 0;
	sessionStorage.operacao_bd = 'novo';
	$.mobile.changePage( "#impressao_digital_formulario", {transition : 'none'} );
});

$(document).on('click', '#btn_impressao_digital_salvar', function(event)
{
	event.preventDefault();
	var dados = $("#impressao_digital_form").serializeJSON();
	salvar_impressao_digital(dados, dados.operacao_bd, function(resultado) {
		toast(resultado.mensagem);
		if (dados.operacao_bd == 'novo') {
			get_last_impressao_digital(function(impressao_digital) {
				var id = impressao_digital.id;
				$('#impressao_digital_form #operacao_bd').val('editar');
				$('#impressao_digital_form #id').val(id);
			});
		}
		//history.back();
	});
});

$(document).on('click', '#btn_impressao_digital_transmitir', function(event)
{
	event.preventDefault();
	var id = $("#impressao_digital_form #id").val();
	transmitir_impressao_digital(id);
});

$(document).on('click', '#btn_impressao_digital_limpar', function(event)
{
	event.preventDefault();
	$('#impressao_digital_form #data').val('');
	$('#impressao_digital_form #hora').val('');
	$('#impressao_digital_form #coordenadas').val('');
	$('#impressao_digital_form #descricao').val('');
	$('#impressao_digital_form #localizacao').val('');
	$('#impressao_digital_form #imagem_uri').val('');
	$('#impressao_digital_form #visualizacao_imagem').attr('src', '');
});

$(document).on('pagebeforeshow1', '#impressao_digital', function()
{
	Caman("#img-caman", function () {
		//this.greyscale();
		this.threshold(125);
		//this.stackBlur(1);
		//this.rotate(90);
		this.render();
	});
});

var context;
var base_image;
var imageData;
var canvas;
var width = 320;//base_image.width;
var height = 240;//base_image.height;
	
$(document).on('pagebeforeshow', '#impressao_digital', function()
{
	var img_uri = 'http://localhost/spcr/img/samsung1.jpg';
	$('#digital_preview').attr('src', img_uri).attr('width', '320').attr('height','240');
	processarImagem(img_uri);
	//desenharImagemCanvas(img_uri);
	//grayScale();
});

function desenharImagemCanvas(img_uri) {
	canvas = document.getElementById('canvas_jsfeat'),
	context = canvas.getContext('2d');
	base_image = new Image();
	base_image.src = img_uri;
	base_image.onload = function() {
		context.drawImage(base_image, 0, 0, width, height);
	}
}

function grayScale() {
	imageData = context.getImageData(0, 0, width, height);
	gray_img = new jsfeat.matrix_t(width, height, jsfeat.U8_t | jsfeat.C1_t);
	code = jsfeat.COLOR_RGBA2GRAY;
	jsfeat.imgproc.grayscale(imageData.data, width, height, gray_img, code);
	jsfeat.imgproc.box_blur_gray(gray_img, gray_img, 2, 0);

	// render result back to canvas
	var data_u32 = new Uint32Array(imageData.data.buffer);
	var alpha = (0xff << 24);
	var i = gray_img.cols*gray_img.rows, pix = 0;
	while(--i >= 0) {
		pix = gray_img.data[i];
		data_u32[i] = alpha | (pix << 16) | (pix << 8) | pix;
	}        
	context.putImageData(imageData, 0, 0);	
}

function processarImagem(img_uri)
{
	var canvas = document.getElementById('canvas_jsfeat'),
	context = canvas.getContext('2d');
	
	base_image = new Image();
	base_image.src = img_uri;

	base_image.onload = function() {
       	var width = 320;//base_image.width;
       	var height = 240;//base_image.height;
		context.drawImage(base_image, 0, 0, width, height);
		var imageData = context.getImageData(0, 0, width, height);
		var gray_img = new jsfeat.matrix_t(width, height, jsfeat.U8_t | jsfeat.C1_t);
		var code = jsfeat.COLOR_RGBA2GRAY;
		jsfeat.imgproc.grayscale(imageData.data, width, height, gray_img, code);
		jsfeat.imgproc.box_blur_gray(gray_img, gray_img, 2, 0);

		// render result back to canvas
		var data_u32 = new Uint32Array(imageData.data.buffer);
		var alpha = (0xff << 24);
		var i = gray_img.cols*gray_img.rows, pix = 0;
		while(--i >= 0) {
			pix = gray_img.data[i];
			data_u32[i] = alpha | (pix << 16) | (pix << 8) | pix;
		}        
		context.putImageData(imageData, 0, 0);

		var corners = [],
			laplacian_threshold = 50,
			min_eigen_value_threshold = 80;

		// choose threshold values
		jsfeat.yape06.laplacian_threshold = laplacian_threshold;
		jsfeat.yape06.min_eigen_value_threshold = min_eigen_value_threshold;
 
		// you should use preallocated keypoint_t array
		for (var i = 0; i < gray_img.cols*gray_img.rows; ++i) {
			corners[i] = new jsfeat.keypoint_t(0,0,0,0);
		}
					
		// perform detection
		// returns the amount of detected corners
		var count = jsfeat.yape06.detect(gray_img, corners, border = 1);
		console.log(count);
		//console.log(corners);
			
		// render result back to canvas
		var data_u32 = new Uint32Array(imageData.data.buffer);
		render_corners(corners, count, data_u32, width);
		context.putImageData(imageData, 0, 0);
			
		function render_corners(corners, count, img, step) {
			var pix = (0xff << 24) | (0x00 << 16) | (0xff << 8) | 0x00;
			for(var i=0; i < count; ++i)
			{
				console.log('Ponto ' + i + ': ' + 'X: ' + corners[i].x + ', Y: ' + corners[i].y);
				var x = corners[i].x;
				var y = corners[i].y;
				var off = (x + y * step);
				img[off] = pix;
				img[off-1] = pix;
				img[off+1] = pix;
				img[off-step] = pix;
				img[off+step] = pix;
			}
		}

		function getCantosQuadro1() {
			var canto = {'a':0, 'b':1, 'c':count - 1, 'd':count - 2};
			return canto;
		}
		
		function getCantosQuadro2() {
			var canto = {'a':2, 'b':3, 'c':count - 3, 'd':count - 4};
			return canto;
		}
		
		var topLeft, topRight, bottomLeft, bottomRight;
		var canto = getCantosQuadro2();
		identificarCantos(a = canto.a, b = canto.b, c = canto.c, d = canto.d);
		
		function identificarCantos() {
			if (corners[a].x > corners[b].x) {
				topLeft = {'x':corners[b].x, 'y':corners[b].y};
				topRight = {'x':corners[a].x, 'y':corners[a].y};
			} else {
				topLeft = {'x':corners[a].x, 'y':corners[a].y};
				topRight = {'x':corners[b].x, 'y':corners[b].y};
			}

			if (corners[c].x < corners[d].x) {
				bottomLeft = {'x':corners[c].x, 'y':corners[c].y};
				bottomRight = {'x':corners[d].x, 'y':corners[d].y};
			} else {
				bottomLeft = {'x':corners[d].x, 'y':corners[d].y};
				bottomRight = {'x':corners[c].x, 'y':corners[c].y};
			}
		}
			
		console.log('Coordenadas antes do ajuste');
		console.log(topLeft);
		console.log(topRight);
		console.log(bottomLeft);
		console.log(bottomRight);
			
		function recortarFora(topLeft, topRight, bottomLeft, bottomRight) {
			if (topLeft.y < topRight.y) {
				topRight.y = topLeft.y;
			} else {
				topLeft.y = topRight.y;
			}
			
			if (topLeft.x < bottomLeft.x) {
				bottomLeft.x = topLeft.x;	
			} else {
				topLeft.x = bottomLeft.x;
			}
			
			if (topRight.x < bottomRight.x) {
				topRight.x = bottomRight.x;	
			} else {
				bottomRight.x = topRight.x;
			}

			if (bottomLeft.y < bottomRight.y) {
				bottomLeft.y = bottomRight.y;
			} else {
				bottomRight.y = bottomLeft.y;
			}
			recortar();
		}
			
		function recortarDentro(topLeft, topRight, bottomLeft, bottomRight) {
			if (topLeft.y < topRight.y) {
				topLeft.y = topRight.y;
			} else {
				topRight.y = topLeft.y;
			}
			
			if (topLeft.x < bottomLeft.x) {
				topLeft.x = bottomLeft.x;	
			} else {
				bottomLeft.x = topLeft.x;
			}
			
			if (topRight.x < bottomRight.x) {
				bottomRight.x = topRight.x;	
			} else {
				topRight.x = bottomRight.x;
			}

			if (bottomLeft.y < bottomRight.y) {
				bottomRight.y = bottomLeft.y;
			} else {
				bottomLeft.y = bottomRight.y;
			}
			recortar();
		}
			
		function recortar() {
			Caman("#canvas_jsfeat", function () {
				// width, height, x, y
				this.crop(q1Width, q1Height, topLeft.x, topLeft.y);
				this.render();
			});
		}
		
		//recortarFora(topLeft, topRight, bottomLeft, bottomRight);
		recortarDentro(topLeft, topRight, bottomLeft, bottomRight);
			
		console.log('Coordenadas depois do ajuste (INSIDE)');
		console.log(topLeft);
		console.log(topRight);
		console.log(bottomLeft);
		console.log(bottomRight);
			
		var q1Width = topRight.x - topLeft.x;
		var q1Height = bottomLeft.y - topLeft.y;
		
		var co = 180 / Math.PI;
		var dx = topLeft.x - topRight.x;
		var dy = topLeft.y - topRight.y;
		var angulo = Math.atan2(dy, dx) * co;
		
		console.log('Angulo');
		console.log(angulo);
		
		//////////////
	}
}

///////// IMPRESSÃO DIGITAL FIM