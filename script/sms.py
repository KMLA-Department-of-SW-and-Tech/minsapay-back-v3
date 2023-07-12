import hashlib
import hmac
import base64
import time
import json
import requests
import time
import keys
from tqdm import tqdm
import pandas as pd

def make_signature(uri): 
    timestamp = str(int(float(time.time()) * 1000))
    secret_key = bytes(keys.secret_key, 'UTF-8')
    access_key = keys.access_key
    message = "POST " + uri + "\n" + timestamp + "\n" + access_key
    message = bytes(message, 'UTF-8')
    signingKey = base64.b64encode(
        hmac.new(secret_key, msg=message, digestmod=hashlib.sha256).digest()).decode()
    
    return signingKey


def smssend(message_to, message_content):
    url = "https://sens.apigw.ntruss.com"
    uri = "/sms/v2/services/" + keys.service_id + "/messages"
    send_url = url+uri
    timestamp = str(int(time.time() * 1000))
    headers = {'Content-Type': 'application/json; charset=utf-8',
               'x-ncp-apigw-timestamp': timestamp,
               'x-ncp-iam-access-key': keys.access_key,
               'x-ncp-apigw-signature-v2': make_signature(uri)
               }
    body = {
        "type": 'sms',
        "contentType": 'COMM',
        "from": keys.my_number,
        "content": message_content,
        "messages": [
            {
                "to": message_to,
                "content": message_content
            }
        ]
    }
    body = json.dumps(body) 
    response_send = requests.post(send_url, headers=headers, data=body)
    print(response_send.text)

df = pd.read_csv('./test.csv', encoding='utf-8')

year = time.strftime('%Y', time.localtime(time.time()))

# for i in tqdm(range(len(df)), desc="비밀번호 발송중", unit="명"):
for i in range(0, len(df)):
    message = df.iloc[i, 0] + f"님의 {year} 민족제 계정 비밀번호는 "
    message += df.iloc[i, 1] + " 입니다."
    # smssend(str(df.iloc[i, 2]), message)
    print(message)
