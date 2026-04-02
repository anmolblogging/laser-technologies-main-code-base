import nodemailer from "nodemailer";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_SERVICE_ROLE_KEY!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const { name, email, phone, company, module } = body;

    if (!name || !email || !phone || !module)
      return res.status(400).json({ error: "Name, email, phone and module are required." });

    // Insert data into Supabase leads table
    await supabase.from("leads").insert([
      {
        name,
        email,
        phone,
        company,
        subject: module,
        type: "gurukul",
        website: "MAIN",
      },
    ]);

    const firstName   = name.split(" ")[0];
    const year        = new Date().getFullYear();
    const submittedAt = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ── shared card footer ────────────────────────────────────────────────────
    const cardFooter = `
      <tr>
        <td style="padding:18px 40px;background:#fafafa;border-top:1px solid #f2f2f2;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
                <p style="margin:0;font-size:10.5px;color:#bbb;font-weight:400;">
                  lasertechnologies.co.in
                </p>
              </td>
              <td style="text-align:right;">
                <p style="margin:0;font-size:10.5px;color:#ccc;font-weight:400;">
                  &copy; ${year} Laser Technologies Pvt Ltd
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;

    // ── shared logo header ────────────────────────────────────────────────────
    const logoHeader = (badge?: string) => `
      <tr>
        <td style="padding:26px 40px 22px;border-bottom:1px solid #f2f2f2;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="vertical-align:middle;">
                <p style="margin:0;font-size:14px;font-weight:700;color:#0f0f0f;
                           letter-spacing:4px;text-transform:uppercase;line-height:1;">
                  LASER
                </p>
                <p style="margin:3px 0 0;font-size:9px;font-weight:500;color:#aaa;
                           letter-spacing:2px;text-transform:uppercase;">
                  Gurukul
                </p>
              </td>
              ${badge ? `<td style="text-align:right;vertical-align:middle;">
                <span style="display:inline-block;background:#fff0f0;color:#e8111f;
                             font-size:9px;font-weight:700;letter-spacing:1.5px;
                             text-transform:uppercase;padding:6px 14px;border-radius:20px;">
                  ${badge}
                </span>
              </td>` : ""}
            </tr>
          </table>
        </td>
      </tr>`;

    // ── ADMIN email ───────────────────────────────────────────────────────────
    const adminHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Gurukul Registration — ${module}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0"
  style="background:#f5f5f7;padding:52px 20px;">
<tr><td align="center">

<table width="620" cellpadding="0" cellspacing="0" border="0"
  style="max-width:620px;width:100%;background:#fff;border-radius:12px;
         overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">

  <!-- Red stripe -->
  <tr><td style="height:4px;background:#e8111f;font-size:0;">&nbsp;</td></tr>

  ${logoHeader("New Registration")}

  <!-- Hero -->
  <tr>
    <td style="padding:34px 40px 26px;">
      <p style="margin:0 0 6px;font-size:10px;font-weight:700;color:#e8111f;
                 letter-spacing:2px;text-transform:uppercase;">
        Course Registration
      </p>
      <h1 style="margin:0 0 4px;font-size:24px;font-weight:700;color:#0f0f0f;
                  letter-spacing:-0.3px;line-height:1.2;">
        ${name}
      </h1>
      <p style="margin:0;font-size:13px;color:#aaa;font-weight:400;">
        ${company ? `${company} &nbsp;·&nbsp; ` : ""}${submittedAt}
      </p>
    </td>
  </tr>

  <!-- Contact bar -->
  <tr>
    <td style="padding:0 40px 24px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0"
        style="background:#f9f9f9;border-radius:8px;overflow:hidden;">
        <tr>
          <td style="padding:15px 18px;border-right:1px solid #efefef;vertical-align:top;" width="34%">
            <p style="margin:0 0 4px;font-size:9px;font-weight:700;color:#bbb;
                       letter-spacing:1.5px;text-transform:uppercase;">Email</p>
            <a href="mailto:${email}"
              style="font-size:12.5px;color:#e8111f;text-decoration:none;
                     font-weight:500;word-break:break-all;line-height:1.4;">${email}</a>
          </td>
          <td style="padding:15px 18px;border-right:1px solid #efefef;vertical-align:top;" width="33%">
            <p style="margin:0 0 4px;font-size:9px;font-weight:700;color:#bbb;
                       letter-spacing:1.5px;text-transform:uppercase;">Phone</p>
            <p style="margin:0;font-size:12.5px;color:#1a1a1a;font-weight:500;line-height:1.4;">${phone}</p>
          </td>
          <td style="padding:15px 18px;vertical-align:top;" width="33%">
            <p style="margin:0 0 4px;font-size:9px;font-weight:700;color:#bbb;
                       letter-spacing:1.5px;text-transform:uppercase;">Company</p>
            <p style="margin:0;font-size:12.5px;color:#1a1a1a;font-weight:500;line-height:1.4;">${company || "—"}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Module card -->
  <tr>
    <td style="padding:0 40px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0"
        style="background:#fff8f8;border-radius:8px;border:1px solid #fde8e8;overflow:hidden;">
        <tr>
          <td style="padding:16px 20px;">
            <p style="margin:0 0 4px;font-size:9px;font-weight:700;color:#e8111f;
                       letter-spacing:1.5px;text-transform:uppercase;">Enrolled Module</p>
            <p style="margin:0;font-size:13px;color:#1a1a1a;font-weight:500;line-height:1.4;">${module}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Divider -->
  <tr><td style="padding:0 40px;">
    <div style="height:1px;background:#f2f2f2;"></div>
  </td></tr>

  <!-- CTA -->
  <tr>
    <td style="padding:26px 40px 34px;">
      <a href="mailto:${email}?subject=Re%3A%20Your%20Laser%20Gurukul%20Registration%20%E2%80%94%20${encodeURIComponent(module)}&body=Hi%20${encodeURIComponent(firstName)}%2C%0A%0AThank%20you%20for%20registering%20for%20the%20${encodeURIComponent(module)}%20at%20Laser%20Gurukul.%20"
        style="display:inline-block;background:#e8111f;color:#fff;font-size:12px;
               font-weight:700;text-decoration:none;padding:13px 30px;
               border-radius:8px;letter-spacing:0.5px;">
        Reply to ${firstName} &rarr;
      </a>
    </td>
  </tr>

  ${cardFooter}

</table>
</td></tr>
</table>
</body>
</html>`;

    // ── AUTO-REPLY email ──────────────────────────────────────────────────────
    const autoReplyHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Registration Confirmed — Laser Gurukul</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0"
  style="background:#f5f5f7;padding:52px 20px;">
<tr><td align="center">

<table width="560" cellpadding="0" cellspacing="0" border="0"
  style="max-width:560px;width:100%;background:#fff;border-radius:12px;
         overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">

  <tr><td style="height:4px;background:#e8111f;font-size:0;">&nbsp;</td></tr>

  <!-- Logo header -->
  <tr>
    <td style="padding:26px 40px 22px;border-bottom:1px solid #f2f2f2;">
      <p style="margin:0;font-size:14px;font-weight:700;color:#0f0f0f;
                 letter-spacing:4px;text-transform:uppercase;line-height:1;">
        LASER
      </p>
      <p style="margin:3px 0 0;font-size:9px;font-weight:500;color:#aaa;
                 letter-spacing:2px;text-transform:uppercase;">
        Gurukul
      </p>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="padding:38px 40px 30px;">
      <h2 style="margin:0 0 14px;font-size:24px;font-weight:700;color:#0f0f0f;
                  letter-spacing:-0.3px;line-height:1.2;">
        You're registered, ${firstName}.
      </h2>
      <p style="margin:0 0 14px;font-size:15px;color:#444;line-height:1.85;font-weight:400;">
        We've received your registration for the
        <strong style="color:#0f0f0f;font-weight:600;">${module}</strong>.
        Our team will be in touch shortly with further details about your course.
      </p>
      <p style="margin:0;font-size:14px;color:#aaa;line-height:1.8;font-weight:400;">
        Questions? Call us on
        <a href="tel:9004005151" style="color:#e8111f;text-decoration:none;font-weight:500;">
          9004005151
        </a>
        — we're available 24&thinsp;&times;&thinsp;7.
      </p>
    </td>
  </tr>

  ${cardFooter}

</table>

<p style="margin:20px 0 0;font-size:10.5px;color:#ccc;text-align:center;font-weight:400;">
  Laser Technologies Private Limited
</p>

</td></tr>
</table>
</body>
</html>`;

    // ── Send both ─────────────────────────────────────────────────────────────
    await transporter.sendMail({
      from: `"Laser Gurukul" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `[Gurukul Registration] ${module} — ${name}`,
      html: adminHtml,
    });

    await transporter.sendMail({
      from: `"Laser Gurukul" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Registration confirmed — ${module}`,
      html: autoReplyHtml,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Gurukul registration error:", err);
    return res.status(500).json({ error: "Failed to send email. Please try again." });
  }
}