const mailTo = process.env.VUE_APP_CONTACT_EMAIL;
const subject = 'Email from site';
const subjectURIEncoded = encodeURIComponent(subject);

const mailHref = `mailto:${mailTo}?subject=${subjectURIEncoded}`;

export default {
    mail: { mailHref, mailTo },
    discord: process.env.VUE_APP_DISCORD_URL,
    instagram: process.env.VUE_APP_INSTAGRAM_URL,
    linkedin: process.env.VUE_APP_LINKEDIN_URL,
    youtube: process.env.VUE_APP_YOUTUBE_URL,
    github: process.env.VUE_APP_GITHUB_URL,
};
