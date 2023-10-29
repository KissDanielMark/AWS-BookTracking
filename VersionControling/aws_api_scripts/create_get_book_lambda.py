import boto3, json
from boto3.dynamodb.conditions import Key
from boto3.dynamodb.conditions import Key, Attr, Not

TABLE_NAME_STR = 'bookshelf'
DDB = boto3.resource('dynamodb', region_name='eu-north-1')
    
def lambda_handler(semmi,context):
   
    print("running scan on table")
    
    DDB = boto3.resource('dynamodb', region_name='eu-north-1')

    TABLE = DDB.Table(TABLE_NAME_STR)
    
    response = TABLE.scan()
    
    data = response['Items']
    
    while 'LastEvaluatedKey' in response:
        response = TABLE.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        print("We needed to paginate and extend the response")
        data.extend(response['Items'])
        
    for item in data:
       item['isbn'] = item.pop('isbn')
       item['title'] = item.pop('title')

    return_me={"books": data}
    
    return return_me
    
#remove this line below once you have tested locally and wish to deploy
#print(lambda_handler(None))


"""
Copyright @2021 [Amazon Web Services] [AWS]
    
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
"""
