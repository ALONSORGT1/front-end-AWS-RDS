<?php
// IpAddress.php

class IpAddress {
    private string $ip;

    public function __construct() {
        $this->ip = $this->detectIp();
    }

    private function detectIp(): string {
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            return $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            return $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            return $_SERVER['REMOTE_ADDR'];
        }
    }

    public function getIp(): string {
        return $this->ip;
    }
}
