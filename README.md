## Local Development

1. Download the repo `git clone https://github.com/pradeep800/authentication.git`
2. Change the directory `cd authentication`
3. Create .env file and add .env.example environment variables
4. Install the dependency `npm install`
5. Start a development server `npm run start`
6. Check terminal logs or go to 'http://localhost:3008/'

### Login With Google and Facebook

1. You can verify by checking the terminal log for the OathUrl related to Google and Facebook. Copy and paste it into your web browser.
2. Follow the required steps for authentication, and you will receive a sessionToken that remains valid for 7 days.
3. To send a request to the /protected-route, make sure to include the x-auth-token header with the sessionToken value.

## Postman documentation

1.Docs:-[https://documenter.getpostman.com/view/29019219/2s9Xy2Mr3h](https://documenter.getpostman.com/view/29019219/2s9Xy2Mr3h)
