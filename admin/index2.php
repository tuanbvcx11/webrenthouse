<?php

	$curl = curl_init();
	// Set some options - we are passing in a useragent too here
	curl_setopt_array($curl, [
	    CURLOPT_RETURNTRANSFER => 1,
	    CURLOPT_URL => 'http://localhost/web/admin-chat.html',
	    CURLOPT_USERAGENT => 'Codular Sample cURL Request'
	]);
	// Send the request & save response to $resp
	$resp = curl_exec($curl);
	print_r($resp);
	// Close request to clear up some resources
	curl_close($curl);
?>