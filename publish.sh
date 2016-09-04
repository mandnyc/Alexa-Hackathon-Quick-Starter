rm index.zip
cd src
zip -X -r ../index.zip * .env
cd ..
aws lambda update-function-code --function-name <function name> --zip-file fileb://index.zip