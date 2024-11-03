<?php
// IpService.php
require_once 'IpAddress.php';

class IpService {
    private IpAddress $ipAddress;

    public function __construct() {
        $this->ipAddress = new IpAddress();
    }

    public function getIpJson(): string {
        return json_encode([
            'ip' => $this->ipAddress->getIp()
        ]);
    }

    public function getIPSingle(): string {
        return $this->ipAddress->getIp();
         
    }
}
