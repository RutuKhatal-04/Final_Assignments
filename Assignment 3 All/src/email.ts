import nodemailer from 'nodemailer';
export const sendWeatherEmail = async (content: string, p0: unknown) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rutukhatal13@gmail.com',
        pass: 'jjqi kpff yfmk clte'
      }
    });
    const mailOptions = {
      from: 'rutukhatal13@gmail.com',
      to: 'rutukhatal04@gmail.com',
      subject: 'Weather Data',
      html: content
    };

await transporter.sendMail(mailOptions);
};