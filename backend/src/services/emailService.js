import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendMail = ({ mailTo, subject, content, html='' }) => {
    const msg = {
        to: mailTo,
        from: process.env.SENDGRID_EMAIL_FROM ?? '',
        subject: subject,
        text: content
    };
    // ako postoji html dodaj ga u poruku (on će se prikazati umjesto text: content!)
    if(html !== ''){
        msg.html = html;
    }
    
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(`Send email error: ${error}`);
        });
};
