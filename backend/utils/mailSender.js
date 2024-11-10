import nodemailer from "nodemailer"

export const mailSender = async (userEmail, title, body) => {
  try {
    // Step 1: Create transporter
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false,
    });

    // Step 2: Send confirmation email to user
    let userMail = await transporter.sendMail({
      from: `"Anand | Shukla" <${process.env.MAIL_USER}>`, // sender address
      to: `${userEmail}`, // user's email address
      subject: `Thank you for contacting us!`, // confirmation email subject
      html: `<p>Hello,</p><p>Thank you for reaching out to us. We have received your message:</p><p>${body}</p><p>We will get back to you shortly.</p>`, // confirmation email body
    });

    // Step 3: Send contact form details to admin (your email)
    let adminMail = await transporter.sendMail({
      from: `"Portfolio | Contact" <${process.env.MAIL_USER}>`, // sender address
      to: `your-email@example.com`, // your email address (admin)
      subject: `${title}`, // subject with user's message
      html: `<p>You have received a new message from ${userEmail}:</p><p>${body}</p>`, // email body with form content
    });

    console.log("User Email:", userMail.response);
    console.log("Admin Email:", adminMail.response);

    return { userMail, adminMail };
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
