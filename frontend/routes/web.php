<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

use App\Http\Controllers\FormController;
Route::get('/create-user', [FormController::class, 'showCreateUserForm']);
Route::get('/login', [FormController::class, 'showLoginForm']);
Route::get('/datos', [FormController::class, 'mostrarDatosPagina']);