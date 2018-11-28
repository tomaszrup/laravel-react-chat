<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ApiController extends Controller
{
  protected $statusCode = 200;


  public function getStatusCode() {
    return $this->statusCode;
  }

  public function setStatusCode($code) {
    $this->statusCode = $code;

    return $this;
  }

  public function respondNotFound($message = "Resource not found.") {
    return $this->setStatusCode(404)->respondWithError($message);
  }

  public function respondUnprocessable($message = "Unprocessable entity.") {
    return $this->setStatusCode(422)->respondWithError($message);
  }

  public function respondUnathorized($message = "These credentials do not match.") {
    return $this->setStatusCode(401)->respondWithError($message);
  }

  public function respond($data) {
    return response($data, $this->getStatusCode());
  }

  public function respondWithError($message) {
    return response($message, $this->getStatusCode());
  }

}
