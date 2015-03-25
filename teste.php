<!DOCTYPE html>
<html>
<head>
	<title>SPCR</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<script src="js/jquery-1.9.1.min.js"></script>
	<script src="js/jquery.mobile-1.3.2.min.js"></script>
    
    <link rel="stylesheet" href="css/jquery.mobile-1.3.2.min.css" />
    <link rel="stylesheet" href="css/jquery.mobile.structure-1.3.2.min.css" />
    <link rel="stylesheet" href="css/font-awesome/font-awesome.min.css" />
    <link rel="stylesheet" href="css/spcr.css" />
    
    <script>
		$(document).on('click', '#btn-salvar', function() {
			var dados = $('#form_re').serialize();
			var url = 'teste_salvar.php';
			$.post(url, dados, function(resultado) {
				alert(resultado);
			});
			event.preventDefault();
		});
	</script>
    
    <meta charset="utf-8">
</head>
<body>
    
	<div data-role="page" id="evidencia_formulario" data-theme="a">
        
        <div data-role="header">
            <h1>Registro de Entrada</h1>
        </div><!-- /header -->

		<div data-role="content">

        	<form action="teste" method="post" id="form_re" name="form_re">

				<label for="codigo">RE:</label>
                <input type="text" name="codigo" id="codigo" value="" placeholder="RE">
                
                <label for="logradouro">Logradouro:</label>
                <input type="text" name="logradouro" id="logradouro" value="" placeholder="Logradouro">
                
                <label for="numero">Número:</label>
                <input type="text" name="numero" id="numero" value="" placeholder="Número">
                
                <label for="complemento">Complemento:</label>
                <input type="text" name="complemento" id="complemento" value="" placeholder="Complemento">
                
                <label for="bairro">Bairro:</label>
                <input type="text" name="bairro" id="bairro" value="" placeholder="Bairro">
                
                <label for="cidade">Cidade:</label>
                <input type="text" name="cidade" id="cidade" value="" placeholder="Cidade">
                
                <label for="uf">UF:</label>
                <input type="text" name="uf" id="uf" value="" placeholder="UF">
                
                <label for="coordenadas">Coordenadas do GPS:</label>
                <input type="text" name="coordenadas" id="coordenadas" value="" placeholder="Coordenadas do GPS">
                
                <label for="crime">Descrição:</label>
                <input type="text" name="crime" id="crime" value="" placeholder="Descrição">
                
                <label for="bo_tc">BO/TC:</label>
                <input type="text" name="bo_tc" id="bo_tc" value="">
                
                <label for="dp">DP:</label>
                <input type="text" name="dp" id="dp" value="">
                
                <label for="data">Data da Requisição:</label>
                <input type="text" name="data" id="data" value="" placeholder="Data da Requisição">
                
                <label for="hora">Hora da Requisição:</label>
                <input type="text" name="hora" id="hora" value="" placeholder="Hora da Requisição">
                
                <label for="obs" class="ui-hidden-accessible">Observações:</label>
                <input type="text" name="obs" id="obs" value="" placeholder="Observações">

				<div class="ui-grid-a">
					<div class="ui-block-a"><button data-theme="b" id="btn-salvar">Salvar</button></div>
					<div class="ui-block-b"></div>
				</div><!-- /grid-a -->

				<img style="display:block;width:100%;" id="visualizacao_imagem" src="" />
				<img style="display:none;" id="largeImage" src="" />
            
			</form>
            
		</div><!-- /content -->
	</div><!-- /page -->

</body>
</html>