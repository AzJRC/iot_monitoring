import time
from machine import Pin
from mqtt_client import run_mqtt_client
from wifimgr import Wifimgr 

LED = Pin("LED", Pin.OUT)
LED.off()

def main():
    wifi_manager = Wifimgr()
    wifi_manager.ap_mode()
    retries = 0
    if wifi_manager.credentials.SSID and wifi_manager.credentials.PWD and wifi_manager.credentials.BROKER_IP:
        while True:
            if (wifi_manager.verify_wlan_if()):
                LED.on()
                try:
                    BROKER_IP, BROKER_USR, BROKER_PWD, SUB_T, PUB_T = wifi_manager.credentials.get_mqtt_params()
                    print('Running mqtt client...', BROKER_IP, BROKER_USR, BROKER_PWD, SUB_T, PUB_T)
                    run_mqtt_client(BROKER_IP, BROKER_USR, BROKER_PWD)
                    wifi_manager.manage_wlan_if(wifi_manager.DEACTIVATE_INTERFACE)
                except OSError as e:
                    print("Error: " + str(e))
                    LED.off()
                    
                    wifi_manager.manage_wlan_if(wifi_manager.DEACTIVATE_INTERFACE)
                    time.sleep(3)
                    wifi_manager.manage_wlan_if(wifi_manager.ACTIVATE_INTERFACE)
                    
                    if retries > 3:
                        reset_secrets(wifi_manager.credentials)
                        print('secrets have been reseted')
                        break
                    retries += 1
                    

if __name__ == "__main__":
    main()