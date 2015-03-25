<?php
	include('JSON.php');
	header("content-type: text/javascript");

	//$connection = mysql_connect("186.202.152.73","hlcontabil","hlsgc102030");
	//$db = mysql_select_db("hlcontabil",$connection);
	
	$connection = mysql_connect("localhost","root","");
	$db = mysql_select_db("spcr",$connection);
	
	if (isset($_POST['acao'])) {
		$acao = $_POST['acao'];
		$dados = $_POST;
		$callback = '';
	} else if (isset($_GET['acao'])) {
		$acao = $_GET['acao'];
		$dados = $_GET['dados'];
		$callback = $_GET['callback'];
	} else {
		$acao = '';
		$dados = '';
		$callback = '';
	}
	
	if ($acao == 'acesso_coisa') {
		$resultado = acesso_coisa($dados);
	} else if ($acao == 'acesso_local') {
		$resultado = acesso_local($dados);
	} else if ($acao == 'administrativa') {
		$resultado = administrativa($dados);
	} else if ($acao == 'carac_coisa') {
		$resultado = carac_coisa($dados);
	} else if ($acao == 'carac_vitima') {
		$resultado = carac_vitima($dados);
	} else if ($acao == 'evidencia') {
		$resultado = evidencia($dados);
	} else if ($acao == 'informe') {
		$resultado = informe($dados);
	} else if ($acao == 'vestigio') {
		$resultado = vestigio($dados);
	} else if ($acao == 'impressao_digital') {
		$resultado = impressao_digital($dados);
	} else if ($acao == 'evidencia_t') {
		$resultado = evidencia_t($dados);
	} else if ($acao == 'informe_t') {
		$resultado = informe_t($dados);
	} else if ($acao == 'vestigio_t') {
		$resultado = vestigio_t($dados);
	} else if ($acao == 'upload_imagem') {
		$resultado = upload_imagem($dados);
	} else if ($acao == 'receber_dados') {
		$resultado = receber_dados($dados);
	}
	
	if ($callback != '') {
		echo $_GET['callback'].'(' . json_encode($resultado).');';
	} else {
		echo json_encode($resultado);
	}
	exit;
	
	function sql($tabela, $dados) {
		$resultado = array();
		mysql_query('SET CHARACTER SET utf8');
		if(is_array($dados)) {
			$s = "SELECT * FROM `".$tabela."` WHERE id = '".$dados['id']."' AND re_id='".$dados['re_id']."'";
			$q = mysql_query($s);
			$n = mysql_num_rows($q);
			if ($n <= 0) {
				$campos = implode(", ", array_keys($dados));
				$valores = array_map('mysql_real_escape_string', array_values($dados));
				$valores = "'" . implode("', '", $valores) . "'";
				$sql = "INSERT INTO `".$tabela."` ($campos) VALUES ($valores)";
    			mysql_query($sql);
			} else {
				foreach ($dados as $key => $value) {
					$value = mysql_real_escape_string($value); // this is dedicated to @Jon
					$value = "'$value'";
					$updates[] = "$key = $value";
				}
				$implodeArray = implode(', ', $updates);
				$sql = "UPDATE `".$tabela."` SET $implodeArray WHERE id='".$dados['id']."'";
				mysql_query($sql);
			}
			if (!mysql_error()) {
				$resultado['status'] = 'ok';
				$resultado['mensagem'] = 'Registros gravados com sucesso';
				$resultado['registro'] = $dados;
			} else {
				$resultado['status'] = 'er';
				$resultado['mensagem'] = 'Problema na gravação dos registros: ' . mysql_error() . ', ' . $sql;
				$resultado['registro'] = $dados;
			}
		} else {
			$resultado['status'] = 'er';
			$resultado['mensagem'] = 'Dados inválidos';
			$resultado['registro'] = $dados;
		}
		return $resultado;
	}
	
	function acesso_coisa($dados) {
		$resultado = sql('acesso_coisa', $dados);
		return $resultado;
	}
	
	function acesso_local($dados) {
		$resultado = sql('acesso_local', $dados);
		return $resultado;
	}
	
	function administrativa($dados) {
		$resultado = sql('administrativa', $dados);
		return $resultado;
	}
	
	function carac_coisa($dados) {
		$resultado = sql('carac_coisa', $dados);
		return $resultado;
	}
	
	function carac_vitima($dados) {
		$resultado = sql('carac_vitima', $dados);
		return $resultado;
	}
	
	function evidencia($dados) {
		//foreach ($dados as $k => $registro) {
			$resultado = sql('evidencia', $dados);
		//}
		return $resultado;
	}
	
	function informe($dados) {
		//foreach ($dados as $k => $registro) {
			$resultado = sql('informe', $dados);
		//}
		return $resultado;
	}
	
	function vestigio($dados) {
		//foreach ($dados as $k => $registro) {
			$resultado = sql('vestigio', $dados);
		//}
		return $resultado;
	}
	
	function impressao_digital($dados) {
		//foreach ($dados as $k => $registro) {
			$resultado = sql('impressao_digital', $dados);
		//}
		return $resultado;
	}
	
	function evidencia_t($dados) {
		foreach ($dados as $k => $registro) {
			$resultado = sql('evidencia', $registro);
		}
		return $resultado;
	}
	
	function informe_t($dados) {
		foreach ($dados as $k => $registro) {
			$resultado = sql('informe', $registro);
		}
		return $resultado;
	}
	
	function vestigio_t($dados) {
		foreach ($dados as $k => $registro) {
			$resultado = sql('vestigio', $registro);
		}
		return $resultado;
	}
	
	function upload_imagem($dados) {
		$arquivo	= $_FILES["arquivo"]["tmp_name"]; 
		$tamanho	= $_FILES["arquivo"]["size"];
		$tipo		= $_FILES["arquivo"]["type"];
		$nome		= $_FILES["arquivo"]["name"];

		$fp = fopen($arquivo, "rb");
		$conteudo = fread($fp, $tamanho);
		$conteudo = addslashes($conteudo);
		fclose($fp);
		$s = "UPDATE ".$dados['tb']." SET ".$dados['cp']." = '".$conteudo."' WHERE id = ".$dados['id'];
		$q = mysql_query($s);
		
		//$resultado['status'] = 'ok';
		//$resultado['mensagem'] = $s;
		//$resultado['registro'] = $dados;
		return $s;
	}
	
	function receber_dados() {
		$resultado = array();
		mysql_query('SET CHARACTER SET utf8');
		
		$s = "	SELECT
					ad.*,
					ad.id AS administrativa_id,
					re.*
				FROM re AS re
				LEFT JOIN administrativa AS ad ON ad.re_id = re.id
				WHERE re.novo = 1";
		$q = mysql_query($s);
		$x = mysql_num_rows($q);
		if (!mysql_error()) {
			$registro = array();
			$administrativa = array();
			$n = 0;
			while ($r = mysql_fetch_array($q)) {
				$registro[$n]['id']				= $r['id'];
				$registro[$n]['codigo']			= $r['codigo'];
				$registro[$n]['data']			= formata_data($r['data']);
				$registro[$n]['hora']			= $r['hora'];
				$registro[$n]['endereco']		= $r['endereco'];
				$registro[$n]['logradouro']		= $r['logradouro'];
				$registro[$n]['numero']			= $r['numero'];
				$registro[$n]['complemento']	= $r['complemento'];
				$registro[$n]['bairro']			= $r['bairro'];
				$registro[$n]['cidade']			= $r['cidade'];
				$registro[$n]['uf']				= $r['uf'];
				$registro[$n]['coordenadas']	= $r['coordenadas'];
				$registro[$n]['crime']			= $r['crime'];
				$registro[$n]['obs']			= $r['obs'];
				$registro[$n]['novo']			= $r['novo'];
				
				$administrativa[$n]['id']				= $r['administrativa_id'];
				$administrativa[$n]['re_id']			= $r['re_id'];
				$administrativa[$n]['cidade_id']		= $r['cidade_id'];
				$administrativa[$n]['bo_tc']			= $r['bo_tc'];
				$administrativa[$n]['dp']				= $r['dp'];
				$administrativa[$n]['data_requisicao']	= formata_data($r['data_requisicao']);
				$administrativa[$n]['hora_requisicao']	= $r['hora_requisicao'];
				$administrativa[$n]['data_atendimento']	= formata_data($r['data_atendimento']);
				$administrativa[$n]['hora_atendimento']	= $r['hora_atendimento'];
				$administrativa[$n]['preservacao']		= $r['preservacao'];
				$administrativa[$n]['logradouro']		= $r['logradouro'];
				$administrativa[$n]['numero']			= $r['numero'];
				$administrativa[$n]['complemento']		= $r['complemento'];
				$administrativa[$n]['bairro']			= $r['bairro'];
				$administrativa[$n]['coordenadas']		= $r['coordenadas'];
				$administrativa[$n]['obs']				= $r['obs'];
				$administrativa[$n]['hipoteses']		= $r['hipoteses'];
				$n++;
			}
			if ($x > 0) {
				$s1 = "UPDATE re SET novo = 0 WHERE id IN (";
				foreach($registro as $i => $reg) {
					$s1 .= $reg['id'] . ', ';
				}
				$s1 = substr($s1, 0, (strlen($s1) - 2));
				$s1 .= ")";
				$q1 = mysql_query($s1);
			}
			$resultado['status'] = 'ok';
			$resultado['mensagem'] = 'Dados recebidos com sucesso.';
			$resultado['registro'] = $registro;
			$resultado['administrativa'] = $administrativa;
		} else {
			$resultado['status'] = 'er';
			$resultado['mensagem'] = 'Problemas na recepção dos dados.';
			$resultado['registro'] = array();
			$resultado['administrativa'] = array();
		}
		return $resultado;
	}
	
	exit;
	
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