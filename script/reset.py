from pymongo import MongoClient
import pandas as pd
import time
from tqdm import tqdm

path = ""

with open('mongo.txt', 'r') as f:
    path = f.read()

client = MongoClient(path)
db = client['MinsaPay']
collection = db['User']

user_id = []
cursor = collection.find().limit(700)

for document in cursor:
    user_id.append(document['_id'])
    print(document['_id'])

for i in tqdm(range(len(user_id))):
    collection.update_one({'_id': user_id[i]}, {'$set': {'isSecurePurchase': False}})
