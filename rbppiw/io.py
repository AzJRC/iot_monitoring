def read_secrets():
    credentials = {}
    valid_secret = True
    try:
        with open('secrets', 'r') as f:
            for line in f:
                parameter, value = line.rstrip('\r\n').split('=')
                credentials[parameter] = value if value else None
                if not value:
                    valid_secret = False
    except FileNotFoundError:
        valid_secret = False
    return credentials, valid_secret


def write_secrets(credentials):
    with open('secrets', 'w') as f:
        f.write(f'SSID={credentials['SSID']}\n')
        f.write(f'PASSWORD={credentials['PASSWORD']}\n')
        f.write(f'BROKER={credentials['BROKER']}\n')
        
        
def reset_secrets():
    with open('secrets', 'w') as f:
        f.write(f'SSID=\n')
        f.write(f'PASSWORD=\n')
        f.write(f'BROKER=\n')