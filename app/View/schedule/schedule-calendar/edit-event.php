<?php
session_start();
include '../app/Model/connection-pdo.php';
//include '../app/Model/connection-mysqli.php';

# Recebendo os dados que o Js esta enviando 
$dados = filter_input_array(INPUT_POST, FILTER_DEFAULT);

$mesageSuccess = '<div id="toast-container" class="toast-top-right"><div class="toast toast-success" aria-live="polite" style=""><div class="toast-message">Sucesso: evento editado!</div></div></div>';
$mesageError   = '<div id="toast-container" class="toast-top-right"><div class="toast toast-error" aria-live="assertive" style=""><div class="toast-message">Erro: evento não editado!</div></div></div>';

# Converter a Data no padrão americano 
$dateStart = str_replace('/', '-', $dados['startDateEdit']);
$convertDateStart = date("Y-m-d", strtotime($dateStart));

# Unir a Data Inicial e a Hora Inicial
$hourStart = $dados['startTimeEdit'];
$joinDataHourStart = $convertDateStart . " " . $hourStart;

# Unir a Data Inicial e a Hora Final (obs: data inicial e final sempre serao as mesmas)
$hourEnd = $dados['endTimeEdit'];
$joinDataHourEnd = $convertDateStart . " " . $hourEnd;

/* Pegando o numero do orçamento para o update
$sqlEvent = " SELECT * FROM tb_eventos WHERE even_codigo = '".$dados['id']."' ";
$query = mysqli_query($connectionDataBase, $sqlEvent);
$dataTbEventos = mysqli_fetch_assoc($query); */

$queryUpdateEvent =
" UPDATE tb_eventos SET even_titulo=:even_titulo, even_datahorai=:even_datahorai, even_datahoraf=:even_datahoraf WHERE even_codigo=:even_codigo ";

$updateEvent = $connectionDataBase->prepare($queryUpdateEvent);
$updateEvent->bindParam(':even_titulo',    $dados['selectionTitleEdit']);
$updateEvent->bindParam(':even_datahorai', $joinDataHourStart);
$updateEvent->bindParam(':even_datahoraf', $joinDataHourEnd);
$updateEvent->bindParam(':even_codigo',    $dados['id']);

if ($updateEvent->execute()) {
    $retorna = ['sit' => true, 'msg' => $mesageSuccess];
    $_SESSION['msg'] = $mesageSuccess;
} else {
    $retorna = ['sit' => true, 'msg' => $mesageError];
}

header('Content-Type: application/json');
echo json_encode($retorna);

/*
$updateEvent->bindParam(':orca_nome', $dados['nameEdit']);
$updateEvent->bindParam(':orca_sobrenome', $dados['surnameEdit']);

orca_nome=:orca_nome,
orca_sobrenome=:orca_sobrenome,
orca_tel=:orca_tel, 
orca_cel=:orca_cel, 
orca_email=:orca_email, 
orca_logradouro=:orca_logradouro, 
orca_log_numero=:orca_log_numero, 
orca_bairro=:orca_bairro, 
orca_cidade=:orca_cidade, 
orca_estado=:orca_estado, 
orca_edificio=:orca_edificio, 
orca_bloco=:orca_bloco, 
orca_apartamento=:orca_apartamento, 
orca_logradouro_condominio=:orca_logradouro_condominio, 
orca_cep=:orca_cep
*/