from pathlib import Path
from pymongo import MongoClient
from pymongo.server_api import ServerApi
# import excel file reading library
import pandas as pd
import numpy as np
import os
import sys
import csv
import json
import time

path = ""

# read mongo.txt file
with open('mongo.txt', 'r') as f:
    path = f.read()

print(path)


client = MongoClient(path)
db = client['MinsaPay']
collection = db['users']

# read ./data/list.xlsx
df = pd.read_excel('list.xlsx', sheet_name='Sheet1')

# in for loop, scan each row
for i in range(len(df)):
    user_data = {
        "username": str(df.iloc[i, 0]),
        "name": df.iloc[i, 1],
        "password": "1234",
        "purchases": [],
        "balance": 0,
        "isSecurePurchase": False
    }
    if (df.iloc[i, 2] == 3):
        user_data["balance"] = 7000
        user_data["purchases"].append({
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

    # collection.insert_one(user_data)
    print(user_data)