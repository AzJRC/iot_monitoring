class Credentials:
    def __init__(self, ssid = None, pwd = None, broker_ip = None, sub_t = None, pub_t = None, broker_usr = None, broker_pwd = None):
        self.SSID = ssid
        self.PWD = pwd
        self.BROKER_IP = broker_ip
        self.SUB_T = sub_t
        self.PUB_T = pub_t
        self.BROKER_USR = broker_usr
        self.BROKER_PWD = broker_pwd
        
    def get_wlan_credentials(self):
        return (self.SSID, self.PWD)
    
    def get_mqtt_params(self):
        return (self.BROKER_IP, self.BROKER_USR, self.BROKER_PWD, self.SUB_T, self.PUB_T)
    
    
    def __repr__(self):
        return f"""
            Credentials(
                SSID='{self.SSID}', 
                PWD='{self.PWD}', 
                BROKER_IP='{self.BROKER_IP}', 
                SUB_T='{self.SUB_T}', 
                PUB_T='{self.PUB_T}', 
                BROKER_USR='{self.BROKER_USR}', 
                BROKER_PWD='{self.BROKER_PWD}'
            )
        """

CREDENTIALS_FILE = 'secrets'

def write_secrets(ssid = None, pwd = None, broker_ip = None, sub_t = None, pub_t = None, broker_usr = None, broker_pwd = None):
    try:
        with open(CREDENTIALS_FILE, 'w') as f:
            f.write(f'SSID={ssid}\n')
            f.write(f'PWD={pwd}\n')
            f.write(f'BROKER_IP={broker_ip}\n')
            f.write(f'SUB_T={sub_t}\n')
            f.write(f'PUB_T={pub_t}\n')
            f.write(f'BROKER_USR={broker_usr}\n')
            f.write(f'BROKER_PWD={broker_pwd}\n')
    except Exception as e:
        print(f'An error occurred while writing to file: {e}')

def read_secrets(credentials):
        try:
            with open(CREDENTIALS_FILE, 'r') as f:
                for line in f:
                    parameter, value = line.rstrip('\r\n').split('=')
                    setattr(credentials, parameter.strip(), value.strip() if value else None)
        except Exception as e:
            print(f'An error ocurred while reading the file: {e}')

        
def reset_secrets(credentials = None):
    try:
        write_secrets(ssid = '', pwd = '', broker_ip = '', sub_t = '', pub_t = '', broker_usr = '', broker_pwd = '') # Write nothing but the keys only
        if credentials:
            read_secrets(credentials) # Read the secrets to delete any previous stored parameter in the Credentials class
    except Exception as e:
        print(f'An error occurred while resetting file: {e}')

