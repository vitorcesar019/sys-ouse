<?php
require_once '../app/View/login/check-login.php';

function formatBytes($bytes)
{
    $base = log($bytes, 1024);
    return round(pow(1024, $base - floor($base)));
}

$unidade = ".";
//Sabendo o espaço livre em disco em GB
$freeSpace =  formatBytes(disk_total_space($unidade)) - formatBytes(disk_free_space($unidade));

$percentualSpaceUsed = ($freeSpace / formatBytes(disk_total_space($unidade))) * 100;
$percentualSpaceUsed = round($percentualSpaceUsed, 0); //% estao sendo usados

?>
@extends('templates.default')
@section('title', 'Home')

@section('head')
@endsection

@section('css')
<style>
    .progress-bar-striped {
        background-image: none !important;
        background-color: #FE5000 !important;
    }
    sup{
        top: .0em !important;
    }
</style>
@endsection

@section('content')
<div class="row">
    <div class="col-lg-3 col-6">
        <div class="small-box bg-info">
            <div class="inner">
                <p>Armazenamento utilizado</p>
                <h3><?= $percentualSpaceUsed ?><sup style="font-size: 20px">%</sup></h3>
                <div class="progress progress-xs">
                    <div class="progress-bar bg-sucess progress-bar-striped" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width:<?= $percentualSpaceUsed ?>%">
                    </div>
                </div>
            </div>
            <div class="icon">
                <i class="ion">
                    <ion-icon name="cloud-outline"></ion-icon>
                </i>
                <!-- <i class="far fa-hdd"></i> -->
            </div>
            
            <a href="malito:boraousar@gmail.com" class="small-box-footer" target="_blank">Adquira mais espaço</a>
        </div>
    </div>
</div>
@endsection

@section('script')
@endsection