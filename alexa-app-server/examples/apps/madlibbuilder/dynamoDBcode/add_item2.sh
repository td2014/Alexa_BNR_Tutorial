#!/bin/bash
#
# Script to add items dynamoDB table using aws cli.
#
aws dynamodb put-item \
    --profile td_dev \
    --table-name myMadlibDB \
    --item '{"userID": {"S": "XYZ124"}, "madlibName": {"S": "September"}}'
 
#
# End of script
#
