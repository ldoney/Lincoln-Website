<?php
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use React\Socket\SecureServer as SecureReactor;
use MyApp\Chat;

    require dirname(__DIR__) . '/vendor/autoload.php';
    $loop   = React\EventLoop\Factory::create();
    $webSock = new React\Socket\SecureServer(
	new React\Socket\Server('0.0.0.0:8080', $loop),
	$loop,
	array(
	  'local_cert' => '/etc/letsencrypt/live/lincolndoney.com/fullchain.pem',
	  'local_pk'   => '/etc/letsencrypt/live/lincolndoney.com/privkey.pem',
          'allow_self_signed' => TRUE,
          'verify_peer' => FALSE
	)
   );

   $webServer = new Ratchet\Server\IoServer(
	new Ratchet\Http\HttpServer(
		new Ratchet\WebSocket\WsServer(
   	         new Chat()
		)
	),
	$webSock
   );
   $loop->run();
?>

