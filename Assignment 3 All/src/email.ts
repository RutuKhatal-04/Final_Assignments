import nodemailer from 'nodemailer';
export const sendWeatherEmail = async (content: string, p0: unknown) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'abc@gmail.com',
        pass: ''
      }
    });
    const mailOptions = {
      from: 'abc@gmail.com',
      to: 'pqr@gmail.com',
      subject: 'Weather Data',
      html: content
    };

await transporter.sendMail(mailOptions);
};
