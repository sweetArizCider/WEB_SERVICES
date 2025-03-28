const axios = require('axios');
const GMAIL_API_KEY = process.env.GMAIL_API_KEY;
const GMAIL_ACCESS_TOKEN = process.env.GMAIL_ACCESS_TOKEN;

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
            await axios.post(`https://gmail.googleapis.com/gmail/v1/users/me/messages/send?key=${GMAIL_API_KEY}`, {raw: emailToBase64},
            {
                headers: {
                    Authorization: `Bearer ${GMAIL_ACCESS_TOKEN}`,
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