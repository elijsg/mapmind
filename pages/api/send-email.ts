import { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, subject, html } = req.body;

    const msg = {
      to: email,
      from: { name: "MindMap", email: "support@mymindmap.ca" }, 
      subject: subject,
      html: html,
    };

    try {
      await sgMail.send(msg);
      console.log("Email sent");
      res.status(200).json({ message: "Email sent" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error sending email" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default sendEmail;
