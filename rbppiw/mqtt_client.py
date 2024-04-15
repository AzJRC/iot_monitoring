import time
import ubinascii
from umqtt.simple import MQTTClient
import machine
import random

# Default  MQTT_BROKER to connect to
CLIENT_ID = ubinascii.hexlify(machine.unique_id())

# Setup built in PICO LED as Output
led = machine.Pin("LED",machine.Pin.OUT)

# Publish MQTT messages after every set timeout
last_publish = time.time()
publish_interval = 5

# Received messages from subscriptions will be delivered to this callback
def sub_cb(topic, msg):
    print((topic, msg))
    if msg.decode() == "ON":
        led.value(1)
    else:
        led.value(0)
        
def reset():
    print("Resetting...")
    time.sleep(5)
    machine.reset()
    
# Generate dummy random temperature readings    
def get_temperature_reading():
    return random.randint(20, 50)
    
def run_mqtt_client(BROKER_IP, BROKER_USR, BROKER_PWD, SUB_T = 'sub/default', PUB_T = 'pub/default'):
    print(f"Begin connection with MQTT Broker :: {BROKER_IP}")
    mqttClient = MQTTClient(CLIENT_ID, BROKER_IP, keepalive=120)
    mqttClient.set_callback(sub_cb)
    mqttClient.connect()
    mqttClient.subscribe(SUB_T)
    print(f'Device subscribed to topic: ', SUB_T)
    print(f'Device publishing to topic: ', PUB_T)
    print(f"Connected to MQTT  Broker :: {BROKER_IP}, and waiting for callback function to be called!")
    while True:
            # Non-blocking wait for message
            mqttClient.check_msg()
            global last_publish
            if (time.time() - last_publish) >= publish_interval:
                random_temp = get_temperature_reading()
                print(random_temp)
                mqttClient.publish(PUB_T, str(random_temp).encode())
                last_publish = time.time()
            time.sleep(1)
