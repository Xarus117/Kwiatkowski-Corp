<?php

use Illuminate\Http\Request;
use App\Http\Controllers\CustomAuthController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('registerProfessor', [CustomAuthController::class, 'registerProfessor']);
Route::post('registerStudent', [CustomAuthController::class, 'registerStudent']);
Route::post('login', [CustomAuthController::class, 'login']);


Route::group(['middleware' => ["auth:sanctum"]], function () {
    Route::get('userProfile', [CustomAuthController::class, 'userProfile']);
    Route::get('logout', [CustomAuthController::class, 'logout']);
});