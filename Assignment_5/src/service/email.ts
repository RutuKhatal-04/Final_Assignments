import nodemailer from 'nodemailer';
export const sendpassEmail = async (email:string,password:string) => {
    

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rutukhatal13@gmail.com',
          pass: ''
        }
      });
      const mailOptions = {
        from:'rutukhatal13@gmail.com',
        to: email,
        subject: 'Password details',
        text: `Hello , here is your password to login ${password}`
      };
      transporter.sendMail(mailOptions,function(err,info){
        if(err){
            console.log(err);
        }
        else{
            console.log("Mail Sent",info.response)
        }
      })

    
};
