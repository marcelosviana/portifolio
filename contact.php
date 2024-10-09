<?php
// seu_script.php

// Acessando os dados enviados pelo formulário
$nome = $_POST['name'];
$email = $_POST['email'];
$mensagem = $_POST['message'];

// Carrega o autoload do Composer para usar o dotenv
require 'vendor/autoload.php';

// Carrega as variáveis de ambiente do arquivo .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Carregar o PHPMailer
require 'PHPMailer/PHPMailerAutoload.php';

$mail = new PHPMailer;
$mail->isSMTP();                        // Usar SMTP
$mail->Host = 'smtp.gmail.com';         // Servidor SMTP do Gmail
$mail->SMTPAuth = true;                 // Habilitar autenticação SMTP

// Acessa as variáveis de ambiente para o email e senha
$mail->Username = $_ENV['EMAIL_USERNAME']; // Variável de ambiente para o email
$mail->Password = $_ENV['EMAIL_PASSWORD']; // Variável de ambiente para a senha

$mail->SMTPSecure = 'tls';              // Usar TLS (pode ser SSL para a porta 465)
$mail->Port = 587;                      // Porta para TLS (587)

// Configurações do e-mail
$mail->setFrom($_ENV['EMAIL_USERNAME'], 'Marcelo Viana'); // Remetente
$mail->addAddress($email, $nome);        // Destinatário
$mail->isHTML(true);                     // Enviar como HTML
$mail->Subject = 'Contato Portifolio';   // Assunto
$mail->Body    = 'Olá ' . $nome . ',<br><br>' . $mensagem;  // Corpo do email (HTML)

// Verifica se o e-mail foi enviado
if ($mail->send()) {
    echo 'E-mail enviado com sucesso!';
} else {
    echo 'Erro ao enviar e-mail: ' . $mail->ErrorInfo;
}
?>
