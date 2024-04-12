import network
import time
import socket
from html import get_webpage
from io import write_secrets, read_secrets, reset_secrets
from machine import Pin, reset

MIN_RSSI = -67
LED = machine.Pin("LED", machine.Pin.OUT)

class Wifimgr:
    def __init__(self, ap_ssid=b'RBPPIW', ap_pwd=b'defaultpass', debug=True):
        self.ap_ssid = ap_ssid
        self.ap_pwd = ap_pwd
        self.debug = debug

        self.ap_if = network.WLAN(network.AP_IF) # Access Point Interface
        self.wlan_if = network.WLAN(network.STA_IF) # Wlan Interface
        
        # Deactivate both interfaces
        self.ap_if.active(False)
        self.wlan_if.active(False)
        
        self.credentials = None

        self.URL_ENCODE = {
            "+": ' ',
            '%2D': '-',
            '%5F': '_',
            '%22': '"',
            '%27': "'"
        }
        
        self.ACTIVATE_INTERFACE = 1
        self.DEACTIVATE_INTERFACE = 0

    def __decode_url_syntax(self, encoded):
        decoded = encoded.decode('utf-8')
        for encode, decode in self.URL_ENCODE.items():
            decoded = decoded.replace(encode, decode)
        return decoded
    

    def __parse_form_data(self, request):
        self.credentials = {}
        lines = request.split(b'\r\n')
        for line in lines:
            if line.startswith(b'Content-Length'):
                content_length = int(line.split(b': ')[1])
                data = lines[-1 * content_length:]
                for item in data:
                    if (b'ssid' in item) and (b'pass' in item):
                        form_data = item.split(b'&')
                        self.credentials['SSID'] = self.__decode_url_syntax(form_data[0].split(b'=')[1])
                        self.credentials['PASSWORD'] = self.__decode_url_syntax(form_data[1].split(b'=')[1])
                        self.credentials['BROKER'] = self.__decode_url_syntax(form_data[2].split(b'=')[1])
        if self.debug:
            print('Successfully parsed credentials.')
        return True


    def __scan_wlan(self):
        self.wlan_if.active(True)
        networks = [(network[0], network[3]) for network in self.wlan_if.scan() if network[3] >= MIN_RSSI]
        self.wlan_if.active(False)
        if self.debug:
            print('Successfully network scan.')
        return sorted(networks, key=lambda x: x[1], reverse=True)
    

    def __connect_to_network(self, ssid, pwd):
        self.wlan_if.active(True)
        self.wlan_if.connect(ssid, pwd)
        seconds = 0
        while not self.wlan_if.isconnected():
            if seconds > 10:
                if self.debug:
                    print('Failed to connect to the network.')
                return False
            if self.debug:
                print('Trying to connect to ' + ssid + '.')
            time.sleep(1)
            seconds += 1
        LED.on()
        if self.debug:
            print('Connected to network: ', ssid, ' | Network config: ', self.wlan_if.ifconfig())
        return True


    def ap_mode(self):

        self.credentials, valid = read_secrets()
        if self.credentials:
            if self.debug:
                print('Stored credentials found: ', self.credentials)
            wlan = self.__connect_to_network(self.credentials['SSID'], self.credentials['PASSWORD'])
            if wlan:
                if self.debug:
                    print('Connection successfull.')
                    return (self.credentials, wlan)
            else:
                if self.debug:
                    print('Bad credentials. reseting device in 5 seconds...')
                    reset_secrets()
                    time.sleep(5)
                    reset()

        self.ap_if.config(essid=self.ap_ssid, password=self.ap_pwd)
        self.ap_if.active(True)
        
        scanned_wlans = self.__scan_wlan() # (ssid, bssid, channel, RSSI, security, hidden)
        ssids = []
        for scanned_wlan in scanned_wlans:
            ssid, _ = scanned_wlan
            ssids.append(ssid.decode('utf-8'))
        
        while not self.ap_if.active():
            pass
        if self.debug:
            print('AP mode activated: ' + self.ap_if.ifconfig()[0])
        
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind(('', 80))
        s.listen(1)
        while True:
            conn, _ = s.accept()
            request = conn.recv(1024)   
            if self.credentials:
                if self.debug:
                    print('Received SSID:', self.credentials['SSID'])
                    print('Received Password:', self.credentials['PASSWORD'])
                    print('Received Password:', self.credentials['BROKER'])
                wlan = self.__connect_to_network(self.credentials['SSID'], self.credentials['PASSWORD'])
                if wlan:
                    conn.send(b'HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<h1>Success!</h1>')
                    conn.close()
                    self.ap_if.active(False)
                    if self.debug:
                        print('AP handler has finished.')
                    break 
            self.__parse_form_data(request)
            conn.send(get_webpage(ssids))
            conn.close()
        write_secrets(credentials)
        return (self.credentials, wlan)

    
    def manage_wlan_if(self, mode):
        self.wlan_if.active(mode)
        
    
    def manage_ap_if(self, mode):
        self.ap_if.active(mode)