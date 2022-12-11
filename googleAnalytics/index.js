const { google } = require("googleapis");

const scopes = 'https://www.googleapis.com/auth/analytics.readonly';
const email = 'apigoogleanalytics@ultra-solution-370718.iam.gserviceaccount.com';
const privateKey = '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDamuf2I77rF0AV\nY88FVLTARN/DpuDBzlDcZlFm3w/WrCMm1fBmCMSf3ofbUxDQALOv1TaBK9Mr6r+N\nm/T93eFqJXBQmx2MBg6wp+A7sSSRRn2rtGByjgJQcAC9mcLUHtQx1+CO/fRjiPMy\nkgjkJsGLhqtTucYpk0GIU8+YYhKPC/RQT/w1j/Fje102YUngMFoKmZyNRXqligxn\nv5IAPjHNxNeHV6vkJ8T9K4bGKGOLTZyUb2i2Btou7hMGmERPlyY2vVRzlV1laOzj\nnyULvjlbOpakOOl6xhBJNh9/Fo0wxAU0ZQcdyQqjaDSbpw7DJvYlhtWQ2VqzJUvz\nWLcW4RyjAgMBAAECggEAEGVEjIN10vAK0GU3UQZfYCRKRsRXYHHMQsYxyMNmJAsD\nv+qVKIdJKAHACBpyIlz1x8mirYwklHX7fprPLyiFuuOqntZjdZhmtafW+43NA6Wu\ne0MAu4Fxzv1M25Y9XzzIsXb9fVFdaQcL0SPUIuMn6le5YILdx/R8GnDJcHu6j0aJ\n/4GI9RTL0oQe2/wT40g71tW0CLMaAV5AjBpmOLaISIcVJhw/N6kN+ruSpJ0MctQ3\nJ8sUyp0WiOTj5RQn1l+X+AbY/3Vroeq53wrZx91gIjnQnzG4admPz8pp1q2AIpPl\nRT2H+XThvj41kI6c3H1WbewgPnL3u9CX9fX4NdtjIQKBgQD/XQYTJPG6wF33fY8J\nR3OEopl8o9vWn/bYDvoCJAK8BXsnOUXVSfg8buRTBAGZBx4H06fyHK7Qo6JwvUyO\nQOyTL4CZ5Hd+NLsyOcvOFEHm6AyfTCrSFgJ+fou7ACxIdfbClcJGwOwMli4F7gaI\nR+S8iXGXJaVy3US9oIZqDy3emwKBgQDbJmw5woIKyQiP+OcXfDmiCFUcoIIeAgUh\nIJzi7NMSHJ/Hk1XbiZwFfnfy2sj0Hmr9b++JMNbQdpjHOzsi2KKJL+w55pevy577\n0AQdbliGRltoK5gPOMX7nwJcYjNHm4QuCkymGMPTkE12cSIiq3nnovauMPtEA7E1\nMyjIXn1WmQKBgQCsCocCNNyq3dkw2SWZscqw7D8OCvMcKM9MBuMGuC4jcGnlJh/X\nL6uPQ4KOL1/IMlRYH4/BfPOF2wigfdhq6nC4RMOWaqbanzoS/39ASsOPhnyigdVD\njtKFWEpZZSdwdhEWTYEC3Azr+e3tzswV2qHPJ6Ygl5tcxJgATXrhT3KuywKBgQCC\nMEg45AFHEPiCNxZp0EWYqaSOVhgWZZLQhERPVutpJhIRiMiHnC9Q4Dm3zxt0UqGy\nn43IjXf/7YSDTv+pitK79vk5yHAyYh+3bnMTXNtAIYnpz4QM/ug2u9a2NSxLjOqw\nQzQXtDyZcW9jPoBN4lqQLjKndre+Rwc+GH9Q0TlaeQKBgGeb81xj1LuCzfTd0r0x\ntd7lx/fY6QcVHcotIof4I0dTd0JKAQWDp3jAHU17h/N4wQBaXRZ27snlt0ETnZdC\nSutq69fN11DvTTagSSWNjfbM7cP1CzWF+BFevDXhCnc6DFeZyaEhz+vv48H6SzVW\nVyRuRg49qK8n3bSVWrZ6AiKn\n-----END PRIVATE KEY-----\n';
const viewID = '281228489';

const jwt = new google.auth.JWT(
  email,
  null,
  privateKey.replace(/\\n/g, '\n'),
  scopes
);
const view_id = viewID;

async function getViews(){
  try {
    await jwt.authorize();

    const response = await google.analytics("v3").data.ga.get({
      auth: jwt,
      ids: "ga:" + view_id,
      "start-date": "30daysAgo",
      "end-date": "today",
      metrics: "ga:pageviews",
    });

    console.log(response);

  } catch (err) {
     console.log(err);
  }
};

getViews()