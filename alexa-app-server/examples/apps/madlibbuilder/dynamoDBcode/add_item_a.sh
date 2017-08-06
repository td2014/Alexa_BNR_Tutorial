#!/bin/bash
#
# Script to add items dynamoDB table using aws cli.
#
aws dynamodb put-item \
    --profile td_dev \
    --table-name myMadlibDB \
    --item '{"userID": {"S": "XYZ123"}, "madlibName": {"S": "March"}}'
 
#
# End of script
#
