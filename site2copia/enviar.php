<html>
<title> Envio de Email></title>
<head> </head>
<?php

$mensagem = "
Nome: $_POST[nome_txt];

Email: $_POST[email_txt];
Mensagem: $_POST[comentarios_txt]";

$assunto = $_POST[assunto_txt];

$dest = 'marcelo.alves@sp.senai.br';

$enviar = mail($dest, $assunto, $mensagem)

?>

<script>alert('Email enviado com Sucesso');</script>
<meta http-equiv="refresh" content="0; url=contatos.html">

</html>