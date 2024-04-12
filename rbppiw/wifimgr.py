import network
import time
import socket
from html import get_webpage
from machine import Pin

MIN_RSSI = -67
LED = Pin("LED", Pin.OUT)

def decode_url_syntax(encoded):
        decoded = encoded.decode('utf-8')
        decoded = decoded.replace('+', ' ')  # Replace '+' with space
        decoded = decoded.replace('%2D', '-')  # Replace '%2D' with -
        decoded = decoded.replace('%5F', '_')  # Replace '%5F' with _
        decoded = decoded.replace('%22', '"')  # Replace '%22' with "
        decoded = decoded.replace('%27', "'")  # Replace '%27' with '
        return decoded

def parse_form_data(request):
    credentials = {}
    lines = request.split(b'\r\n')
    for line in lines:
        if line.startswith(b'Content-Length'):
            content_length = int(line.split(b': ')[1])
            data = lines[-1 * content_length:]
            for item in data:
                if (b'ssid' in item) and (b'pass' in item):
                    form_data = item.split(b'&')
                    credentials['SSID'] = decode_url_syntax(form_data[0].split(b'=')[1])
                    credentials['PASSWORD'] = decode_url_syntax(form_data[1].split(b'=')[1])
                    credentials['BROKER'] = decode_url_syntax(form_data[2].split(b'=')[1])
    return credentials

def scan_wlan():
    wlan = network.WLAN()
    wlan.active(True)
    networks = [(network[0], network[3]) for network in wlan.scan() if network[3] >= MIN_RSSI]
    return sorted(networks, key=lambda x: x[1], reverse=True)


def connect_to_network(ssid, pwd):
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(ssid, pwd)
    seconds = 0
    while not wlan.isconnected():
        if seconds > 10:
            print('Unable to connect after 10s')
            return False
        print('trying to connect to ' + ssid)
        time.sleep(1)
        seconds += 1
    LED.on()
    print('Connected to network:', ssid)
    print('Network config:', wlan.ifconfig())
    return wlan


def ap_mode(ssid = 'RBPPIW', pwd = 'defaultpass'):
    ap_if = network.WLAN(network.AP_IF)
    ap_if.config(essid=ssid, password=pwd)
    ap_if.active(True)
    
    close_wlans = scan_wlan() # (ssid, bssid, channel, RSSI, security, hidden)
    ssids = []
    for close_wlan in close_wlans:
        ssid, _ = close_wlan
        ssids.append(ssid.decode('utf-8'))
    
    while not ap_if.active():
        pass
    print('AP mode activated: ' + ap_if.ifconfig()[0])
    
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    s.bind(('', 80))
    s.listen(1)
    
    while True:
        conn, addr = s.accept()
        request = conn.recv(1024)        
        credentials = parse_form_data(request)
        if credentials:
            print('Received SSID:', credentials['SSID'])
            print('Received Password:', credentials['PASSWORD'])
            wlan = connect_to_network(credentials['SSID'], credentials['PASSWORD'])
            if wlan:
                conn.send(b'HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<h1>Success!</h1>')
                time.sleep(1)
                conn.close()
                ap_if.active(False)
                break 
        conn.send(get_webpage(ssids))
        conn.close()
    return (credentials, wlan)