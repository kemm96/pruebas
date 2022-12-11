const { google } = require('googleapis');
const fetch = require('node-fetch');

const scopes = 'https://www.googleapis.com/auth/androidpublisher';
const email = 'apigoogleplay@pc-api-7862370527930174087-737.iam.gserviceaccount.com';
const privateKey = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCsNqmaGWBTOaUh\nz/2YM9YLztG4f5UskoOvjxQn1hjPxhjee/M4qm8E4qBYbIV4+wAjUFSuiFMPlDg1\npU6UQ5dMfv/8d9gTbcgOMFrv2IWTO5KnZ6jjRsgPAEKJNBWJ0mS2kPNz16nq7XXq\nPifeMCnVOyNG7cwNieBg/Bww5aDaZ5/qLwz6G7ghJ9YUEujG4WTbTGPlodxdHxQy\n3qbRsW8BtwvRz4NNUja0CN3UDTZph1wUdTZZM3zGz1LHhMuOou8UyAcVDfJn4oGt\niKjB/0D/vOAYtKkwsdonbQ0T+GiEGuaImiBZR/LFwvmjvws1wkqqyldMEj2aWBgf\ncMepNuI3AgMBAAECggEAGzEWXoqbNwjnFgutUxb8OSkS3Dro5vzLZjEFUbTwff4d\ndyPDJ7NhjDfscYnRGWUohGrutBA6bT9OEMplOeviO+XhrY+OwqKW8AaalTxu+uxx\nH5WyiRBoDlZQKzHaJMTfuiPxDN2Eqt+LuszNprucH1sTGuP5UDnw/99O5DmdyF5K\nBw4bmBgVW2r5O+6pO6Mh7xSdthX5QyoAlCIzeicrDCj/MCr1eumABzXt9m3MUCYj\n2t2WwHU6OKSYR/rLTg/rjopMQxwNa19MBVeEXup6I7aeCylB4xjIkYliuyz776y4\n45ZjNBL3ucoP+gmq2jw9bujtrubnLox/DgKdAi/aYQKBgQDSqB29azFD1shOgkG7\nIGYsPJPwPd1fnWu7zoJZhG7APRSl5/rukcGxZBv9n+s7+sEmOd0ugD+UCy8zc2/u\n9k2AwCkCX/6gnM2w6fQnhg7unpsGKDTEblOu94IAH+aQIvMSip6IdZH7n1Da6C4k\nPGKbo9WvDj3HKzP0BXNZECOzewKBgQDRSDMWmpnE2nIErW2yyeYOHOz6XfQzS4tG\nOu2UV/s03ttQaTunF55/83OgEjJWUKF/WoI4YmdTKeRhHsRUNkmEI5eG/3ebO60G\ne0EkJ65kCdWDNa/13rPGMb//e0BHGGgJa75FMzfNEzQ6iXQVfGoVEnmjyu1ZG26d\njtDtC1khdQKBgQC3a/q5O+ShlRrEgVaKgSN10SlfPf7Lil6MILwPBekJKiYYb21m\n3TMyKmDU7bH9f9E+X5PfMXwqg7KNsi38fCnvuWH712n2n5HaQVt+LpRB4YhKTCfm\nAcqLxqdDRIOVbVkJA/oWB4kc9xOICDJlCs8xhe5Bhrzz9wI9r6FII21ykQKBgEmC\nvs81xsVqpZoXAO1IFdLnPiZDUj+iTW2BzWnJ7acIkKiSDi4HEdmHvhl/ysae09tU\nA2GizwBbOqkSkYuy9efASL1WhsC0GXapXJxCg/MHsUPBW+lVLHh1iSdIN6/BVunY\nOqE7+GHEWRgmp+vUI777Glb6NJyUEiqtu51H2yrxAoGAZn42xNlWZU0zgJhbJKWI\no+x9VCyG+KdKcilF02Fen8iYtR6w7FDim/5IpVPjX0RYz1r2/ODNHWbAuVwOOqAy\nELjnWZ8wtVyRgfEB9bT2/nK7yuL3gE7vOwosSjcSqx+bZWDMTVDWh8GIbly09HMC\nOkvcNSZPzLSi+okZdCF/w3U=\n-----END PRIVATE KEY-----\n';

const jwt = new google.auth.JWT(
    email,
    null,
    privateKey.replace(/\\n/g, '\n'),
    scopes
);

async function getData(){
    try {
        await jwt.authorize();
        
    }catch (err) {
       console.log(err);
    }
}
 
getData();