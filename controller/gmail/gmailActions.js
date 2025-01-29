const axios = require('axios');
const { gmailAPI } = require('../../utils/config.json');

class GmailActions{

    async sendEmail(emailData){
        const emailFormat =
`From: ${emailData.from}
To: ${emailData.to}
Subject: ${emailData.subject}
Date: ${emailData.date}
Message-ID: ${emailData.messageId}
        
${emailData.message}`;
        
        const emailToBase64 = Buffer.from(emailFormat).toString('base64');
        
        try{
            await axios.post(`https://gmail.googleapis.com/gmail/v1/users/me/messages/send?key=${gmailAPI.API_KEY}`, {raw: emailToBase64},
            {
                headers: {
                    Authorization: `Bearer ${gmailAPI.ACCESS_TOKEN}`,
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            });
        }catch(error){
            console.log("Error sending the email" + error);
            return false;
        }
        return true;
    }
}

module.exports = GmailActions;