document.addEventListener("deviceready", onDeviceReady, false); 
function onDeviceReady() {
	$.mobile.defaultPageTransition = 'none';
	$.mobile.defaultDialogTransition = 'none';
	$.mobile.allowCrossDomainPages = true;
	$.mobile.phonegapNavigationEnabled = true;
	$.support.cors = true;
	//sincronizar();
}

$(document).on('pagecreate','#mapa',function() {
	var latitude = -15.797891799999999;
	var longitude = -47.8866393;
	var latLong = new google.maps.LatLng(latitude, longitude);
	var mapOptions = {zoom: 8, center: latLong};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	var infowindow = new google.maps.InfoWindow({
		content: '<h1 style="color:#333; text-shadow:none">RE: <span style="color:#f00; text-shadow:none">123456</span></h1><h2 style="color:#333; text-shadow:none;">Furto em residencia</h2><p style="color:#333">Ocorrencia registrada no 2o. Distrito de Policia - Residencia foi invadida e varios objetos foram subtraidos do local, bem como, joias e dinheiro que estavam guardados no local.</p>'
	});
	var marker = new google.maps.Marker({
		position: latLong,
		map: map,
		icon: "data:image/png;base64,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",
		title: 'Localização',
		animation: google.maps.Animation.DROP
	});
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});
});

$(document).on('focus', '#evidencia_form input', function() 
{
	sessionStorage.campo_foco = $(this).attr('id');
});

$(document).on('click', '#scan', function()
{
	var scanner = cordova.require("cordova/plugin/BarcodeScanner");
	scanner.scan( function (result)
	{
		try
		{
			var ev = jQuery.parseJSON(result.text);
			$('#evidencia_form #numero_lacre').val(ev.numero_lacre);
			$('#evidencia_form #nome_perito').val(ev.nome_perito);
			$('#evidencia_form #unidade').val(ev.unidade);
		}
		catch(e)
		{
			var campo = '#' + sessionStorage.campo_foco;
			$(campo).val(result.text);
		}
		/*alert("We got a barcode\n" +
		"Result: " + result.text + "\n" +
		"Format: " + result.format + "\n" +
		"Cancelled: " + result.cancelled);*/
	}, function (error) { 
		console.log("Scanning failed: ", error); 
	});
});

$(document).on('click', '.capturar_imagem', function()
{
	sessionStorage.img_uri = $(this).data('img-uri');
	sessionStorage.img_vis = $(this).data('img-vis');
	navigator.camera.getPicture(onSuccess, onFail, { quality: 50, 
	destinationType: Camera.DestinationType.FILE_URI }); 
});

function onSuccess(imageURI) {
    //var image = document.getElementById('visualizacao_imagem');
    //image.src = imageURI;
	var img_uri = '#' + sessionStorage.img_uri;
	var img_vis = '#' + sessionStorage.img_vis; 
	$(img_vis, $.mobile.activePage).attr('src', imageURI);
	$(img_uri, $.mobile.activePage).val(imageURI);
}

function onFail(message) {
    toast('Falha: ' + message);
}

$(document).on('click', '#capturar_coordenadas', function(event)
{
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(onGPSSuccess, onGPSError, {enableHighAccuracy : true});
});

var onGPSSuccess = function(position) {
	var coordenadas = position.coords.latitude + ', ' + position.coords.longitude;
	$('#coordenadas', $.mobile.activePage).val(coordenadas);
    /*alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');*/
};

// onError Callback receives a PositionError object
//
function onGPSError(error) {
    toast('Erro: ' + error.code + ', Descrição: ' + error.message);
}

$(document).on('click', '#menu_transmitir_dados', function(event)
{
	transmitir_dados();
});

$(document).on('click', '#menu_receber_dados', function(event)
{
	receber_dados();
});

function transmitir_imagem(imagem_uri, tb, cp, id) {
	//alert(imagem_uri + ', ' + tb + ', ' + cp + ', ' + id);
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		var options	= new FileUploadOptions();
		options.fileKey	= "arquivo";
		options.mimeType = "image/jpeg";
		//options.fileName = imagem_uri.substr(imageURI.lastIndexOf('/')+1);
		options.fileName = "nome_arquivo";
	
		var params = new Object();
		params.id = id;
		params.tb = tb;
		params.cp = cp;
		params.acao = 'upload_imagem';
	
		options.params = params;
		options.chunkedMode = false;
		
		options.headers = {
			Connection: "close"
		};
	
		var ft = new FileTransfer();
		ft.upload(imagem_uri, encodeURI(url_servidor), win, fail, options);
	});
}
 
function win(r) {
	console.log("Code = " + r.responseCode);
	console.log("Response = " + r.response);
	console.log("Sent = " + r.bytesSent);
	//toast(r.response);
}
 
function fail(error) {
	toast("Ocorreu um erro: Código = " + error.code);
}

function transmitir_acesso_coisa(id) {
	alert('Trasmitir dados');
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		get_acesso_coisa(id, function(acesso_coisa) {
			if (acesso_coisa) {
				$.ajax({
					url: url_servidor,
					data: {acao: 'acesso_coisa', dados : acesso_coisa},
					dataType: 'jsonp',
					jsonp: 'callback',
					success: function(resultado) {
						//console.log(resultado.mensagem);
						//console.log(resultado.registro);
						toast(resultado.mensagem);
						transmitir_imagem(acesso_coisa.res_imagem1_uri, 'acesso_coisa', 'res_imagem1', acesso_coisa.id);
						transmitir_imagem(acesso_coisa.res_imagem2_uri, 'acesso_coisa', 'res_imagem2', acesso_coisa.id);
						transmitir_imagem(acesso_coisa.com_imagem1_uri, 'acesso_coisa', 'com_imagem1', acesso_coisa.id);
						transmitir_imagem(acesso_coisa.com_imagem2_uri, 'acesso_coisa', 'com_imagem2', acesso_coisa.id);
						transmitir_imagem(acesso_coisa.ind_imagem1_uri, 'acesso_coisa', 'ind_imagem1', acesso_coisa.id);
						transmitir_imagem(acesso_coisa.ind_imagem2_uri, 'acesso_coisa', 'ind_imagem2', acesso_coisa.id);
						transmitir_imagem(acesso_coisa.esco_imagem1_uri, 'acesso_coisa', 'esco_imagem1', acesso_coisa.id);
						transmitir_imagem(acesso_coisa.esco_imagem2_uri, 'acesso_coisa', 'esco_imagem2', acesso_coisa.id);
						transmitir_imagem(acesso_coisa.escr_imagem1_uri, 'acesso_coisa', 'escr_imagem1', acesso_coisa.id);
						transmitir_imagem(acesso_coisa.escr_imagem2_uri, 'acesso_coisa', 'escr_imagem2', acesso_coisa.id);
					},
					error: function (xhr, textStatus, thrownError) {
						//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
						toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
					}
				});
			}
		});
	});
}

function transmitir_acesso_local(id) {
	alert('Trasmitir dados');
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		get_acesso_local(id, function(acesso_local) {
			if (acesso_local) {
				$.ajax({
					url: url_servidor,
					data: {acao: 'acesso_local', dados : acesso_local},
					dataType: 'jsonp',
					jsonp: 'callback',
					success: function(resultado) {
						//console.log(resultado.mensagem);
						//console.log(resultado.registro);
						toast(resultado.mensagem);
						transmitir_imagem(acesso_local.imagem1_uri, 'acesso_local', 'imagem1', acesso_local.id);
						transmitir_imagem(acesso_local.imagem2_uri, 'acesso_local', 'imagem2', acesso_local.id);
					},
					error: function (xhr, textStatus, thrownError) {
						//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
						toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
					}
				});
			}
		});
	});
}

function transmitir_administrativa(id) {
	alert('Trasmitir dados');
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		get_administrativa(id, function(administrativa) {
			if (administrativa) {
				$.ajax({
					url: url_servidor,
					data: {acao: 'administrativa', dados : administrativa},
					dataType: 'jsonp',
					jsonp: 'callback',
					success: function(resultado) {
						//console.log(resultado.mensagem);
						//console.log(resultado.registro);
						toast(resultado.mensagem);
					},
					error: function (xhr, textStatus, thrownError) {
						//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
						toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
					}
				});
			}
		});
	});
}

function transmitir_carac_coisa(id) {
	alert('Trasmitir dados');
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		get_carac_coisa(id, function(carac_coisa) {
			if (carac_coisa) {
				$.ajax({
					url: url_servidor,
					data: {acao: 'carac_coisa', dados : carac_coisa},
					dataType: 'jsonp',
					jsonp: 'callback',
					success: function(resultado) {
						//console.log(resultado.mensagem);
						//console.log(resultado.registro);
						toast(resultado.mensagem);
					},
					error: function (xhr, textStatus, thrownError) {
						//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
						toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
					}
				});
			}
		});
	});
}

function transmitir_carac_vitima(id) {
	alert('Trasmitir dados');
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		get_carac_vitima(id, function(carac_vitima) {
			if (carac_vitima) {
				$.ajax({
					url: url_servidor,
					data: {acao: 'carac_vitima', dados : carac_vitima},
					dataType: 'jsonp',
					jsonp: 'callback',
					success: function(resultado) {
						//console.log(resultado.mensagem);
						//console.log(resultado.registro);
						transmitir_imagem(carac_vitima.imagem1_uri, 'carac_vitima', 'imagem1', carac_vitima.id);
						transmitir_imagem(carac_vitima.imagem2_uri, 'carac_vitima', 'imagem2', carac_vitima.id);
						toast(resultado.mensagem);
					},
					error: function (xhr, textStatus, thrownError) {
						//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
						toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
					}
				});
			}
		});
	});
}

function transmitir_evidencia(id) {
	alert('Trasmitir dados');
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		get_evidencia(id, function(evidencia) {
			if (evidencia) {
				$.ajax({
					url: url_servidor,
					data: {acao: 'evidencia', dados : evidencia},
					dataType: 'jsonp',
					jsonp: 'callback',
					success: function(resultado) {
						//console.log(resultado.mensagem);
						//console.log(resultado.registro);
						toast(resultado.mensagem);
						transmitir_imagem(evidencia.imagem_uri, 'evidencia', 'imagem', evidencia.id);
					},
					error: function (xhr, textStatus, thrownError) {
						//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
						toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
					}
				});
			}
		});
	});
}

function transmitir_informe(id) {
	alert('Trasmitir dados');
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		get_informe(id, function(informe) {
			if (informe) {
				$.ajax({
					url: url_servidor,
					data: {acao: 'informe', dados : informe},
					dataType: 'jsonp',
					jsonp: 'callback',
					success: function(resultado) {
						//console.log(resultado.mensagem);
						//console.log(resultado.registro);
						toast(resultado.mensagem);
						transmitir_imagem(informe.imagem_uri, 'informe', 'imagem', informe.id);
					},
					error: function (xhr, textStatus, thrownError) {
						//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
						toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
					}
				});
			}
		});
	});
}

function transmitir_vestigio(id) {
	alert('Trasmitir dados');
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		get_vestigio(id, function(vestigio) {
			if (vestigio) {
				$.ajax({
					url: url_servidor,
					data: {acao: 'vestigio', dados : vestigio},
					dataType: 'jsonp',
					jsonp: 'callback',
					success: function(resultado) {
						//console.log(resultado.mensagem);
						//console.log(resultado.registro);
						toast(resultado.mensagem);
						transmitir_imagem(vestigio.imagem_uri, 'vestigio', 'imagem', vestigio.id);
					},
					error: function (xhr, textStatus, thrownError) {
						//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
						toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
					}
				});
			}
		});
	});
}

function transmitir_impressao_digital(id) {
	alert('Trasmitir dados');
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		get_impressao_digital(id, function(impressao_digital) {
			if (impressao_digital) {
				$.ajax({
					url: url_servidor,
					data: {acao: 'impressao_digital', dados : impressao_digital},
					dataType: 'jsonp',
					jsonp: 'callback',
					success: function(resultado) {
						//console.log(resultado.mensagem);
						//console.log(resultado.registro);
						toast(resultado.mensagem);
						transmitir_imagem(impressao_digital.imagem_uri, 'impressao_digital', 'imagem', impressao_digital.id);
					},
					error: function (xhr, textStatus, thrownError) {
						//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
						toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
					}
				});
			}
		});
	});
}

function transmitir_dados() {
	alert('Trasmitir dados');
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		get_all_re(function(re) {
			for (i = 0; i < re.length; i++) {
				console.log(re[i].id);
				get_acesso_coisa_re(re[i].id, function(acesso_coisa) {
					if (acesso_coisa) {
						$.ajax({
							url: url_servidor,
							data: {acao: 'acesso_coisa', dados : acesso_coisa},
							dataType: 'jsonp',
							jsonp: 'callback',
							success: function(resultado) {
								//console.log(resultado.mensagem);
								//console.log(resultado.registro);
								toast(resultado.mensagem);
							},
							error: function (xhr, textStatus, thrownError) {
								//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
								toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
							}
						});
					}
				});
				get_acesso_local_re(re[i].id, function(acesso_local) {
					if (acesso_local) {
						$.ajax({
							url: url_servidor,
							data: {acao: 'acesso_local', dados : acesso_local},
							dataType: 'jsonp',
							jsonp: 'callback',
							success: function(resultado) {
								//console.log(resultado.mensagem);
								//console.log(resultado.registro);
								toast(resultado.mensagem);
							},
							error: function (xhr, textStatus, thrownError) {
								//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
								toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
							}
						});
					}
				});
				get_administrativa_re(re[i].id, function(administrativa) {
					if (administrativa) {
						$.ajax({
							url: url_servidor,
							data: {acao: 'administrativa', dados : administrativa},
							dataType: 'jsonp',
							jsonp: 'callback',
							success: function(resultado) {
								//console.log(resultado.mensagem);
								//console.log(resultado.registro);
								toast(resultado.mensagem);
							},
							error: function (xhr, textStatus, thrownError) {
								//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
								toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
							}
						});
					}
				});
				get_carac_coisa_re(re[i].id, function(carac_coisa) {
					if (carac_coisa) {
						$.ajax({
							url: url_servidor,
							data: {acao: 'carac_coisa', dados : carac_coisa},
							dataType: 'jsonp',
							jsonp: 'callback',
							success: function(resultado) {
								//console.log(resultado.mensagem);
								//console.log(resultado.registro);
								toast(resultado.mensagem);
							},
							error: function (xhr, textStatus, thrownError) {
								//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
								toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
							}
						});
					}
				});
				get_carac_vitima_re(re[i].id, function(carac_vitima) {
					if (carac_vitima) {
						$.ajax({
							url: url_servidor,
							data: {acao: 'carac_vitima', dados : carac_vitima},
							dataType: 'jsonp',
							jsonp: 'callback',
							success: function(resultado) {
								//console.log(resultado.mensagem);
								//console.log(resultado.registro);
								toast(resultado.mensagem);
							},
							error: function (xhr, textStatus, thrownError) {
								//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
								toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
							}
						});
					}
				});
			}
		});
						get_all_evidencia_t(function(evidencia) {
							if (evidencia) {
								$.ajax({
									url: url_servidor,
									data: {acao: 'evidencia_t', dados : evidencia},
									dataType: 'jsonp',
									jsonp: 'callback',
									success: function(resultado) {
										//console.log(resultado.mensagem);
										//console.log(resultado.registro);
										toast(resultado.mensagem);
									},
									error: function (xhr, textStatus, thrownError) {
										//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
										toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
									}
								});
							}
						});
						
						get_all_informe_t(function(informe) {
							if (informe) {
								$.ajax({
									url: url_servidor,
									data: {acao: 'informe_t', dados : informe},
									dataType: 'jsonp',
									jsonp: 'callback',
									success: function(resultado) {
										//console.log(resultado.mensagem);
										//console.log(resultado.registro);
										toast(resultado.mensagem);
									},
									error: function (xhr, textStatus, thrownError) {
										//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
										toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
									}
								});
							}
						});
						
						get_all_vestigio_t(function(vestigio) {
							if (vestigio) {
								$.ajax({
									url: url_servidor,
									data: {acao: 'vestigio_t', dados : vestigio},
									dataType: 'jsonp',
									jsonp: 'callback',
									success: function(resultado) {
										//console.log(resultado.mensagem);
										//console.log(resultado.registro);
										toast(resultado.mensagem);
									},
									error: function (xhr, textStatus, thrownError) {
										//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
										toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
									}
								});
							}
						});
	});
}

function receber_dados() { 
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		$.ajax({
			url: url_servidor,
			data: {acao : 'receber_dados', dados : ''},
			dataType: 'jsonp',
			jsonp: 'callback',
			success: function(resultado) {
				if (resultado.status == 'ok') {
					var n = resultado.registro.length;
						if (n > 0) {
							toast('Novo Registro de entrada!');
							for (i = 0; i < n; i++) {
								salvar_re(resultado.registro[i], 'novo', function(resultado) {});
								salvar_administrativa(resultado.administrativa[i], 'novo', function(resultado) {});
							}
						} else {
							toast('Não há novos registros.');
						}
				} else {
					toast(resultado.mensagem);
				}
			},
			error: function (xhr, textStatus, thrownError) {
				//console.log('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
				toast('textStatus: ' + textStatus + ', thrownError: ' + thrownError);
			}
		});
	});
}

function sincronizar() { 
	get_config(1, function(config) {
		var url_servidor = config.url_servidor;
		$.ajax({
			url: url_servidor,
			data: {acao : 'sincronizar'},
			dataType: 'jsonp',
			jsonp: 'callback',
			jsonpCallback: 'resultado_sincronizar',
			success: function(){},
			error: function(){}
		});
		window.setTimeout(sincronizar, 30000);
	});
}

function resultado_sincronizar(resultado) {
	if (resultado.status == 'ok') {
		//toast(resultado.mensagem);
		var n = resultado.registro.length;
		if (n > 0) {
			toast('Novo Registro de entrada!');
			for (i = 0; i < n; i++) {
				salvar_re(resultado.registro[i], 'novo', function(resultado) {});
			}
		}
	} else {
		//toast(resultado.mensagem);
	}
}