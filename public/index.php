<?php
require_once "../src/vendor/autoload.php"; //composer
use Jenssegers\Blade\Blade; //Blade template
use \PlugRoute\PlugRoute;
use \PlugRoute\RouteContainer;
use \PlugRoute\Http\RequestCreator;

$blade = new Blade('../app/View/', '../app/View/cache');

$route = new PlugRoute(new RouteContainer(), RequestCreator::create());

$route->notFound(function() use ($blade){
    echo $blade->render('errors.404');
});

$route->get('/home', function() use ($blade) {
    echo $blade->render('home.home');
});

$route->get('/cadastro', function() use ($blade) {
    echo $blade->render('cadastro.cadastro');
});


$route->on();


