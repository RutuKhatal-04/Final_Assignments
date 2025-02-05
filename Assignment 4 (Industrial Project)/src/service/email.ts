import nodemailer from 'nodemailer';

//To send Payment Due Emails
export const sendEmail= async(orgname:string,custemail:string,particular:string,amt:number)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host:"smtp.gmail.com",
        port:465,
        auth: {
          user: 'rutukhatal13@gmail.com',
          pass: ''
        }
      });
      const mailOptions = {
        from:'rutukhatal13@gmail.com',
        to: custemail,
        subject: 'Payment plans',
        text: `Hello , Pls pay the payment for ${particular} of organization ${orgname} of Rs. ${amt}`
      };
      transporter.sendMail(mailOptions,function(err,info){
        if(err){
            console.log(err);
        }
        else{
            console.log("Mail Sent",info.response)
        }
      })
}


//To send customer passowrd for login

export const sendCustEmail = async (email:string,password:string): Promise<void> => {
    

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

//To send invoice of payment for due payments

export const sendInvoiceMail=(custemail:string,orgemail:string,amt:number,particulars:string,custname:string,orgname:string)=>{
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rutukhatal13@gmail.com',
      pass: ''
    }
  });
  const mailOptions = {
    from:'rutukhatal13@gmail.com',
    to: [orgemail,custemail],
    subject: 'Password details',
    text: `Congratulations ${custname} you have successfully paid Rs.${amt} for ${particulars} of Organization ${orgname},`
  };
  transporter.sendMail(mailOptions,function(err,info){
    if(err){
        console.log(err);
    }
    else{
        console.log("Mail Sent",info.response)
    }
  })

}