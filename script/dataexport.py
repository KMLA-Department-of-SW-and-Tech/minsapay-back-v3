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
store_collection = db['Store']

user_cursor = user_collection.find()
store_cursor = store_collection.find()
purchase_cursor = purchase_collection.find()
login_cursor = login_collection.find()

user_id = []
store_id = []
purchase_id = []
login_id = []

for document in user_cursor:
    user_id.append(document['_id'])

for document in store_cursor:
    store_id.append(document['_id'])

for document in purchase_cursor:
    purchase_id.append(document['_id'])

for document in login_cursor:
    login_id.append(document['_id'])

for i in tqdm(range(len(user_id)), desc="유저 데이터 추출중", unit="명"):
    user_data = user_collection.find_one({'_id': user_id[i]})
    with open('./script/data/user_export.json', 'a', encoding='utf-8') as f:
        f.write(str(user_data) + "\n")

for i in tqdm(range(len(store_id)), desc="부스 데이터 추출중", unit="개"):
    store_data = store_collection.find_one({'_id': store_id[i]})
    with open('./script/data/store_export.json', 'a', encoding='utf-8') as f:
        f.write(str(store_data) + "\n")

for i in tqdm(range(len(purchase_id)), desc="구매 데이터 추출중", unit="개"):
    purchase_data = purchase_collection.find_one({'_id': purchase_id[i]})
    with open('./script/data/purchase_export.json', 'a', encoding='utf-8') as f:
        f.write(str(purchase_data) + "\n")

for i in tqdm(range(len(login_id)), desc="계정 데이터 추출중", unit="명"):
    login_data = login_collection.find_one({'_id': login_id[i]})
    with open('./script/data/login_export.json', 'a', encoding='utf-8') as f:
        f.write(str(login_data) + "\n")
