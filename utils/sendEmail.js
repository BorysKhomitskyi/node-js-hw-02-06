const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_USER, META_PASSWORD, BASE_URL } = process.env;

const sendEmail = async (email, verificationToken) => {
  const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: META_USER,
      pass: META_PASSWORD,
    },
  };

  const transport = nodemailer.createTransport(nodemailerConfig);

  const sendLetter = {
    to: email,
    from: META_USER,
    subject: "Verify email",
    html: `<p>
    <a target="_blank" href=${BASE_URL}/users/verify/${verificationToken}>Click here to verify your email</a>
  </p>`,
  };

  const verificationMail = await transport
    .sendMail(sendLetter)
    .then(() => console.log("Email send success"))
    .catch((err) => console.log(err));

  return verificationMail;
};

module.exports = sendEmail;
