const express = require('express');
const nodemailer = require('nodemailer');

const app = express();


app.get('/track-pixel', (req, res) => {
    const userId = req.query.userId;
    console.log('User with ID', userId, 'opened the email.');
    res.sendFile('pixel.png', { root: __dirname });
});


app.get('/send-email', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'email mu',
            pass:  'password mu'//liat disini https://support.google.com/mail/answer/185833?hl=en
        }
    });

    const users = [
        { id: 'A', name: 'recruiter PT Burung Merpati' , email: 'emailtarget1@gmail.com' },
        { id: 'B', name: 'recruiter PT Ronaldo Joget', email: 'emailtarget2@gmail.com' }
    ];

    const userId = req.query.userId;
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(400).send('Invalid user ID');
    }

    const trackingPixel = `<img src="alamathostingmu.com/track-pixel?userId=${userId}" alt="" width="1" height="1">`;
    

    const mailOptions = {
        from: 'emailmu@gmail.com',
        to: user.email,
        subject: `Application for XXX Position at XXX Company`,
        html: `<p>Dear ${user.name},</p>
        <p>I am writing to express my interest in the XXX position at XXX Company. I am confident that my skills are well-aligned with the role, and that I would be an excellent fit for your organization.</p>
        <p>My background includes a Bachelor’s degree in Computer Science and Engineering, as well as experience working as a Software Engineer. I have a strong foundation in software development, and am proficient in Java, C++, and Python. I have also worked on several projects that required me to collaborate with cross-functional teams, and have developed strong communication and problem-solving skills as a result.</p>
        <p>I am particularly excited about the opportunity to work at XXX Company because of your commitment to innovation and your focus on developing cutting-edge technologies. I am eager to contribute my skills and expertise to your team, and to help drive the success of your projects.</p>
        <p>I have attached my resume for your review. I would welcome the opportunity to discuss how my background, skills, and enthusiasm for technology could benefit XXX Company. Thank you for considering my application. I look forward to hearing from you soon.</p>${trackingPixel}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error occurred, email not sent.');
        } else {
            res.send('Email sent!');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
