import nodeMailer from "nodemailer";

const sendEmail = async (options) => {
  try {
    const transporator = nodeMailer.createTransport({
      host: "smpt.gmail.com",
      port: 465,
      service: process.env.SMPT_SERVICE,

      auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMPT_MAIL,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    await transporator.sendMail(mailOptions);
  } catch (error) {}
};

export default sendEmail;
