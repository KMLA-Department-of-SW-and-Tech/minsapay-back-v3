from pymongo import MongoClient
import pandas as pd
import time
from tqdm import tqdm

path = ""

with open('mongo.txt', 'r') as f:
    path = f.read()

client = MongoClient(path)
db = client['MinsaPay']
collection = db['Login']

df = pd.read_csv('./script/data/userlist.csv', encoding='utf-8')

for i in tqdm(range(len(df)), desc="유저 생성중", unit="명"):
    data = {
        "username": str(df.iloc[i, 0]),
        "password": "pass",
        "userType": "user",
        "isAdmin": False,
        "user": {
            "name": df.iloc[i, 1],
            "purchases": [],
            "balance": 0,
            "isSecurePurchase": False
        }
    }

    if (df.iloc[i, 2] == 3):
        data["user"]["balance"] = 7000
        data["user"]["purchases"].append({
            "time": time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),
            "user": str(df.iloc[i, 0]),
            "product": {
                "id": "1",
                "name": "3학년 기본금액",
                "price": 7000
            },
            "price": -7000,
            "total": 7000,
            "store": "금융정보부"
        })

    collection.insert_one(data)