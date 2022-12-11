const googlePlay = require('./googlePlay/access_token')

let accessTokens = {
    googlePlay:'',
}

const getAccessTokens = async() => {
    accessTokens.googlePlay = await getGooglePlayAccessToken();
    console.log(accessTokens.googlePlay);
} 

getAccessTokens()