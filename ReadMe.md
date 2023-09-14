#ReadMe

## How to run the application

```
code
yarn install
```


```
code
yarn dev
```

```
localhost:8080/api/v1/products
```


### Deployment
```docker build -t inventory .
```docker run --publish 8081:8080 inventory```



##Deployment to fargate
push images to ecr for fargate
add this policy to the deploying users to 
```AmazonElasticContainerRegistryPublicFullAccess```

 
build on ec2
docker buildx build --platform=linux/amd64,linux/arm64 -t public.ecr.aws/w0t6p6y6/test-app:latest --push .

run on ec2
docker run -t -i -d -p 80:8080 --platform=linux/amd64  public.ecr.aws/w0t6p6y6/test-app:latest

add tags command can be found on the push command in ecr




### To create a product hit the post method after running the application with sample payload from postman