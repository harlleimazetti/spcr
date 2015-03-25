<?php
	//$connection = mysql_connect("186.202.152.73","hlcontabil","hlsgc102030");
	//$db = mysql_select_db("hlcontabil",$connection);
	
	$connection = mysql_connect("localhost","root","");
	$db = mysql_select_db("spcr",$connection);

	$s = "
			INSERT INTO re (
				codigo,
				data,
				hora,
				logradouro,
				numero,
				complemento,
				bairro,
				cidade,
				uf,
				coordenadas,
				crime,
				obs,
				novo
			) VALUES (
				'".$_POST['codigo']."',
				'".formata_data_bd($_POST['data'])."',
				'".$_POST['hora']."',
				'".$_POST['logradouro']."',
				'".$_POST['numero']."',
				'".$_POST['complemento']."',
				'".$_POST['bairro']."',
				'".$_POST['cidade']."',
				'".$_POST['uf']."',
				'".$_POST['coordenadas']."',
				'".$_POST['crime']."',
				'".$_POST['obs']."',
				'1'
			)
		";
	$s = mb_convert_encoding($s, 'ISO-8859-1', 'UTF-8');
	$q = mysql_query($s);
	$re_id = mysql_insert_id();
	$s = "	INSERT INTO administrativa (
				re_id,
				bo_tc,
				dp,
				data_requisicao,
				hora_requisicao
			) VALUES (
				'".$re_id."',
				'".$_POST['bo_tc']."',
				'".$_POST['dp']."',
				'".formata_data_bd($_POST['data'])."',
				'".$_POST['hora']."'
			)";
	$q = mysql_query($s);
	if (!mysql_error()) {
		echo "Registro Salvo com sucesso.";
	} else {
		echo "Problemas na gravação do registro: " . mysql_error();
	}
	
    function formata_data($var_data) {
         $var_dia = substr($var_data, 8, 2);
         $var_mes = substr($var_data, 5, 2);
         $var_ano = substr($var_data, 0, 4);
         $data_formatada = "$var_dia";
         $data_formatada.= "/"; 
         $data_formatada.= "$var_mes";
         $data_formatada.= "/";
         $data_formatada.= "$var_ano";
         return $data_formatada;
    }
		
    function formata_data_bd($var_data) {
         $var_dia = substr($var_data, 0, 2);
         $var_mes = substr($var_data, 3, 2);
         $var_ano = substr($var_data, 6, 4);
         $data_formatada = "$var_ano";
         $data_formatada.= "-"; 
         $data_formatada.= "$var_mes";
         $data_formatada.= "-";
         $data_formatada.= "$var_dia";
         return $data_formatada;
    }
?>