<?php
// seu_script.php

// Acessando os dados enviados pelo formulário
$nome = $_POST['name'];
$email = $_POST['email'];
$mensagem = $_POST['message'];

// Enviando um email (exemplo usando PHPMailer)
require 'PHPMailer/PHPMailerAutoload.php';

$mail = new PHPMailer;
$mail->isSMTP();
// ... configurar as demais opções do PHPMailer ...
$mail->send();
?>