<?php
	
	$name = trim($_POST['name']);
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$subject = $_POST['subject'];
	$message = $_POST['message'];
	
	$to = 'you@youremail.com'; // Replace this with your own email address
	
	if (strlen($name) < 2) {
		return false;
	}
	
	if (!preg_match('/^[a-z0-9&\'\.\-_\+]+@[a-z0-9\-]+\.([a-z0-9\-]+\.)*+[a-z]{2}/is', $email)) {
		return false;
	}
	
	if (strlen($message) < 3) {
		return false;
	}
	
	if (!$error) {
		
		$headers =  'From: Brick and Mortar <no-reply@bam.com>'. "\r\n" .
					'Reply-To: '.$email.'' . "\r\n" .
					'X-Mailer: PHP/' . phpversion();
		$email_subject = "Website Contact Form: $email";
		$message="Name: $name \n\nEmail: $email \n\nPhone: $phone \n\nSubject: $subject \n\nMessage:\n\n $message";
	
		mail($to, $email_subject, $message, $headers);
		echo "true";
		
	} # end if no error
	else {
		echo "error";
	} # end if there was an error sending

?>