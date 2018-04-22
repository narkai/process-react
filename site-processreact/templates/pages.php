<?php

require_once './inc/rest.php';
require_once './inc/pagefields.php';

// set vars with the default output
$statuscode = 200;
$response = [];

if (Rest\Request::is('get')) {
  $p = null;
  $urlSegments = $input->urlSegments();

  if (count($urlSegments)) {
    $segments = implode($urlSegments, '/');
    if (is_numeric($segments)) {
      $p = $pages->get($segments);
    } else {
      $p = $pages->get('/'.$segments.'/');
    }
  } else {
    // get home if there are no segments
    $p = $pages->get('/');
  }

  if ($p->id) {
    // page exist, get fields
    $pageFields = new PageFields($p, [
      'queries' => $input->get->getArray()
    ]);
    // $pageFields = new PageFields($p, [
    //   'queries' => ['parent_included' => true, 'listing' => true, 'children' => true]
    // ]);
    $response = $pageFields->getPageFields($p);
  } else {
    // page does not exist
    $response['error'] = 'The page does not exist';
    $statuscode = 404; // Not Found (see /site/templates/inc/Rest.php)
  }
} else {
  // Not a get request
  $response['error'] = 'Wrong request';
  $statuscode = 404; // Not Found (see /site/templates/inc/Rest.php)
}

// enable debug mode
if ($input->get('debug') && $config->debug) return;

// render the response and body
http_response_code($statuscode);
header(Rest\Header::mimeType('json'));

// CORS
// header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin: http://localhost:3030');

// output everything
echo json_encode($response);
