const nodemailer = require('nodemailer') //importing required items
const {google} = require('googleapis')

const CLIENT_ID ='855915128626-joc4t70t77a7d3ec8n7pae1r59ivar89.apps.googleusercontent.com'
const CLIENT_SECRET = 'LDASyo4lVHqL0phiijwGcA3z'
const REDIRECT_URI = 'https://developers.google.com/authplayground';
const REFRESH_TOKEN = '1//04aI1oVdUdTAMCgYIARAAGAQSNwF-L9IrWbiszfVsjLVvCquguAIhDzFNqwDdLGzQBTIWOzmCZjbVzAe-8bVYchbW2T7UEo2qPYA';
//The above values have been obtained from google cloud platform account.
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});
//below a function has been created to send email.
async function sendMail() {
    //We could write the body of the email within the above brackets in sendMail() but i have written it below
    try{
      const accessToken = await oAuth2Client.getAccessToken();
      const transport = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              type: 'Oauth2',
              user:'aayushi.xyz.singh@gmail.com',
              clientId: CLIENT_ID,
              clientSecret: CLIENT_SECRET,
              refreshToken: REFRESH_TOKEN,
              accessToken: accessToken, //given that access token expires given in the google api account we create one of our own.(refer the above creation of accessToken variable)

          },
      });

      const mailOptions = {
          from: 'AAYUSHISINGH <aayushi.xyz.singh@gmail.com>',
          to: 'aayushi.2804.singh@gmail.com',
          subject: 'Hi there!! I am using gmail API',
          text: 'Hi there!! I am using gmail API! nice to see you!',
          html: '<h1>Hi there!! I am using gmail API! nice to see you!</h1>',
      };

      const result = await transport.sendMail(mailOptions)
      return result;

    }
    catch (error) {
        return error;
    }
}
sendMail()
.then((result) => console.log('Email has been sent..', result))
.catch((error) => console.log(error.message));