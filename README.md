## Local Development

1. Download the repo `git clone https://github.com/pradeep800/authentication.git`
2. Change the directory `cd authentication`
3. Create .env file and add .env.example environment variables
4. Install the dependency `npm install`
5. Start a development server `npm run start`
6. Check terminal logs or go to 'http://localhost:3008/'

### Login With Google and Facebook

1. you can check / or terminal log there is OathUrl for google and face copy and past on your browser
2. Do necessary step to authenticate and you will get sessionToken which is valid for 7 days
3. You can send request to /protected-route with including x-auth-token header with value of sessionToken

## Postman documentation

1.Docs:-[https://documenter.getpostman.com/view/29019219/2s9Xy2Mr3h](https://documenter.getpostman.com/view/29019219/2s9Xy2Mr3h)
