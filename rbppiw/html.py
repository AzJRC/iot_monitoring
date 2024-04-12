
def get_webpage(ssids):
    css = """
        <style>
            h1 { font-size: 70px;}
            table {width:600px; margin:auto}
            img {height:35px;}
            td {padding:8px;font-size:40px;}
            p {font-size: 50px;}
            tr:hover {background-color: coral;}
            input[type="radio"] {
                height:40px;
                width:40px;
            }            
        </style>
    """
    
    html = """
        <!DOCTYPE html>
        <html>
            <head>
                <title>Pico W WiFi Manager</title>
                {styles}
            </head>
            <body>
                <h1>Pico W WiFi Manager</h1>
                <p>Please select a SSID:</p>
                <form method="post" action="/">
                    <table>
                        {buttons}
                    </table>  
                    <p align="center">
                        Password: <input style="height:40px;width:300px;font-size: 35px;" type="password" name="pass" required maxlength="30">
                    </p>
                    <p align="center">
                        Broker IP: <input style="height:40px;width:300px;font-size: 35px;" type="text" name="broker" placeholder="0.0.0.0" required minlength="7" maxlength="16">
                    </p>
                    <p align="center"> 
                        <input style="height:70px;width:250px;font-size:40px;margin:0 20px" type="submit" name="button" value="Save">
                    </p>
                </form>       
           </body>
        </html>
    """.format(styles=css, buttons='\n'.join(f'<tr><td><input type="radio" name="ssid" value="{ssid}">{ssid}</td></tr>' for ssid in ssids))
    
    return html