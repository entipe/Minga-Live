<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load composer's autoloader
require '../vendor/autoload.php';

class Form {
    const HAS_CAPTCHA = FALSE;
    const CAPTCHA_NAME = 'g-recaptcha-response';
    const REQUIRED_FIELDS = 'name|email|message|privacy';
    const OPTIONAL_FIELDS = false;
    const EMAIL_SUBJECT = 'Minga-docu.net - Nouveau message';
    const EMAIL_BODY = "
        <p>De la part de <strong>{name}</strong> ({email})</p>
        <p><br>-----</p>
        <p><i>{message}</i></p>
        <p>-----<br></p>
        <p>Envoyé le {date}</p>
    ";

    const EMAIL_FROM = "postmaster@minga-docu.net";
    const EMAIL_FROM_NAME = "Minga";

    //const EMAIL_TO = "contact@minga-docu.net";
    const EMAIL_TO = "gauthier.depaoli@gmail.com";
    const EMAIL_TO_NAME = "Minga";

    private $finalFields;
    private $captchaDebug;

    public function __construct() {
        $this->getFields();
    }

    private function getFields() {
        $requiredFieldList = explode('|', self::REQUIRED_FIELDS);
        $optionalFieldList = explode('|', self::OPTIONAL_FIELDS);

        $this->finalFields = array();

        if (self::HAS_CAPTCHA && !$this->captcha()) {
            return $this->response(false,'captcha_fields');
        }

        foreach ($requiredFieldList as $requiredField) {
            if ( $this->post($requiredField) ) {
                $this->finalFields[$requiredField] = $this->post($requiredField);
            } else {
                break;
            }
        }

        if (count($this->finalFields) !== count($requiredFieldList)) {
            return $this->response(false,'required_fields');
        }

        foreach ($optionalFieldList as $optionalField) {
            $this->finalFields[$optionalField] = $this->post($optionalField);
        }

        $this->sendForm();
    }

    private function captcha() {
        if ( !$this->post(self::CAPTCHA_NAME)) {
            return false;
        }

        $url = "https://www.google.com/recaptcha/api/siteverify";
        $secret = ""; //TODO ADD CAPTCHA KEY

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, [
            'secret' => $secret,
            'response' => $this->post(self::CAPTCHA_NAME),
            'remoteip' => $_SERVER['REMOTE_ADDR']
        ]);

        // receive server response ...
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $output = curl_exec ($ch);

        curl_close ($ch);

        $output = json_decode($output);

        if ( $output->success === FALSE) {
            $this->captchaDebug = $output->{'error-codes'};
        }
        return $output->success;
    }

    private function sendForm() {
        $mail = new PHPMailer(true);

        $mail->setFrom(self::EMAIL_FROM, self::EMAIL_FROM_NAME);
        $mail->addAddress(self::EMAIL_TO, self::EMAIL_TO_NAME);
        $mail->addReplyTo($this->finalFields['email'], $this->finalFields['firstname']. " " .strtoupper($this->finalFields['lastname']));

        $mail->isHTML(true);

        $mail->Subject = $this->getSubject();
        $mail->Body    = $this->getBody();
        $mail->AltBody = $this->getBody(true);

        if(!$mail->send()) {
            return $this->response(false,$mail->ErrorInfo);
        } else {
            return $this->response(true, 'mail_sent');
        }
    }

    private function getSubject() {
        return self::EMAIL_SUBJECT;
    }

    private function getBody($strip_tags = false) {
        $replace = [];

        foreach ($this->finalFields as $key => $value) {
            if ($key === 'message') {
                $value = nl2br($value);
            }
            $replace['{'.$key.'}'] = $value === FALSE ? '' : $value;
        }

        $replace['{date}'] = date('Y-m-d H:i:s');

        $body = str_replace(array_keys($replace), array_values($replace), self::EMAIL_BODY);

        return $strip_tags ? strip_tags($body) : $body;
    }

    private function response($status,$msg) {
        header('Content-Type: application/json');

        if ($msg === 'captcha_fields') {
            $msg = $this->captchaDebug;
        }
        echo json_encode(array(
                'success' => $status ? true : false,
                'msg'    => $msg,
            ));
        return;
    }

    private function post($name) {
        if ( !isset($_POST[$name] ) ) {
            return false;
        }

        return htmlspecialchars(strip_tags(trim($_POST[$name])));
    }
}


$form = new Form();