import boto3
import subprocess

client = boto3.client('lambda', region_name='eu-north-1')
ROLE = 'arn:aws:iam::554751627586:role/LambdaAccessToDynamoDB'
BUCKET = subprocess.getoutput('aws s3api list-buckets --query "Buckets[].Name" | grep s3bucket | tr -d "," | xargs')

response = client.create_function(
    FunctionName='post_book',
    Runtime='python3.8',
    Role=ROLE,
    Handler='create_post_book_lambda.lambda_handler',
    Code={
        'S3Bucket': BUCKET,
        'S3Key': 'create_post_book_lambda.zip'
    }

)

print ("DONE")

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
