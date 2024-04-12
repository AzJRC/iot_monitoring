import uasyncio as asyncio
import time
import network
import socket
from machine import Pin
from wifimgr import ap_mode, connect_to_network
from io import read_secrets, write_secrets, reset_secrets
from mqtt_client import run_mqtt_client

# from wifimgr import WifiManager  # Assuming your class is defined in a module named wifi_manager


LED = Pin("LED", Pin.OUT)



def main():
#     wifi_manager = WifiManager()
#     LED.off()
#     credentials = wifi_manager.ap_mode()
#     if credentials:
#         print('successfully connected to the internet: ' + credentials)
    
    credentials, valid = read_secrets()

    if valid:
        wlan = connect_to_network(credentials.get('SSID'), credentials.get('PASSWORD'))
        if not wlan:
            reset_secrets()
            credentials, wlan = ap_mode()
    else:
        credentials, wlan = ap_mode()
    
    write_secrets(credentials)
    print(credentials)
           
    while True:
        try:
            print('Running mqtt client...')
            print(credentials)
            run_mqtt_client(credentials['BROKER'])
            break
        except OSError as e:
            print("Error: " + str(e))
            time.sleep(5)
        
        

if __name__ == "__main__":
    main()