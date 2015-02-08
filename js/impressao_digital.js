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
			output += '<li id="' + impressao_digital[i].id + '" data-id="' + impressao_digital[i].id + '"><a href="#"><h2>' + formata_data(impressao_digital[i].data) + ', ' + impressao_digital[i].hora + '</h2><p>' + impressao_digital[i].descricao + '</p></a><a href="#" class="excluir">Excluir</a></li>';
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

//$(document).on('pagebeforeshow', '#impressao_digital', function()
//{
//	Caman("#img-caman", function () {
		//this.greyscale();
		//this.threshold(200);
		//this.stackBlur(2);
		//this.rotate(45);
		//this.render();
//	});
//});

///////// IMPRESSÃO DIGITAL FIM