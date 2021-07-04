const nodemailer = require("nodemailer");

exports.sendMail = async (config) => {
  let account = await nodemailer.createTestAccount();
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
    //   secure: false,
    //   requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: "info@dabirimayowa.com",
      ...config,
    });

    return `Preview URL: %s', ${nodemailer.getTestMessageUrl(info)}`;
  } catch (err) {
      console.log(err)
    throw new Error(err.message);
  }
};
