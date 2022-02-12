#!/bin/bash
#sls invoke local --function ant_serverless_ingest --path sendHello.json ## this works
sls invoke local --function GetJSONFromWebsite --path send.json