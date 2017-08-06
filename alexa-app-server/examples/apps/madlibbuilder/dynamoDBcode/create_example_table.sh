#!/bin/bash
#
# Script to create dynamoDB table using aws cli.
#
aws dynamodb create-table \
    --profile td_dev \
    --table-name myMadlibDB \
    --attribute-definitions \
        AttributeName=userID,AttributeType=S \
        AttributeName=madlibName,AttributeType=S \
    --key-schema \
        AttributeName=userID,KeyType=HASH \
        AttributeName=madlibName,KeyType=RANGE \
    --provisioned-throughput \
        WriteCapacityUnits=1,ReadCapacityUnits=2 
 
#
# End of script
#
