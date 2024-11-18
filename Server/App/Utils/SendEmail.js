import nodemailer from "nodemailer";
import fs from "fs";
import handlebars from "handlebars";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

const sendReservationConfirmation = async (
  name,
  email,
  phone,
  numberOfGuests,
  date,
  startTime,
  endTime
) => {
  try {
    const TemplateFile = fs.readFileSync(
      "./App/Utils/Email/EmailTemplate.html",
      "utf-8"
    );
    const Template = await handlebars.compile(TemplateFile);
    const HandleToSend = Template({
      name,
      email,
      phone,
      numberOfGuests,
      date,
      startTime,
      endTime,
    });
    const mailOptions = {
      from: {
        name: "Herbivoria",
        address: process.env.USER,
      },
      to: [email],
      subject: "Reservation Confirmation",
      text: `Dear ${name},\n\nYour reservation has been confirmed.`,
      html: HandleToSend,
    };
    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent successfully.");
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
};

export { sendReservationConfirmation };
