<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FormController extends Controller
{
    public function showCreateUserForm()
    {
        return view('form');
    }
    public function showLoginForm(){
        return view('login');
    }

    public function mostrarDatosPagina(){
        return view('datos');
    }

    public function mostrarExamen2(){
        return view('examen2');
    }

}