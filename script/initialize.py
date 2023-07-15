from pymongo import MongoClient
import pandas as pd
import time
from tqdm import tqdm

path = ""

with open('mongo.txt', 'r') as f:
    path = f.read()

client = MongoClient(path)
db = client['MinsaPay']
login_collection = db['Login']
user_collection = db['User']
purchase_collection = db['Purchase']

df = pd.read_csv('./script/data/userlist.csv', encoding='utf-8')

for i in tqdm(range(len(df)), desc="유저 생성중", unit="명"):
    data = {
        "username": str(df.iloc[i, 0]),
        "password": "pass",
        "userType": "user",
        "isAdmin": False,
        "user": ""
    }

    userData = {
        "name": df.iloc[i, 1],
        "purchases": [],
        "balance": 0,
        "isSecurePurchase": True,
        "securePurchaseEndDate": time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),
    }

    user_collection.insert_one(userData)
    data["user"] = str(user_collection.find_one(userData)["_id"])

    login_collection.insert_one(data)
