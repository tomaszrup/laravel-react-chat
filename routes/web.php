<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::any('/home/{query}',
  function() { return redirect('/home'); })
  ->where('query', '.*');

Route::prefix('api')->group(function() {
  Route::get('/conversation/{user}', 'Api\ConversationController@index');
  Route::post('/conversation/{user}', 'Api\ConversationController@store');
  
  Route::get('/user', function() {
    return Auth::user();
  });
});
