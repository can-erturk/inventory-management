export default function VerificationMail(url) {
  return `
  <div style="font-family:sans-serif;text-align:center;max-width:480px;margin:auto;padding:40px 60px;border-radius:12px;border:solid 1px #d1d1d1d1;margin:30px auto">
    <h1 style="font-size:30px;font-weight:400;color:black!important;margin:0">Email Verification</h1>
    <p style="font-size:18px;color:black!important;margin:0;opacity:.7">Click the button below to verify your email address.</p>
    <a style="font-size:16px;border-radius:4px;background-color:#2775ff;color:white;padding:8px 16px;text-align:center;text-decoration:none;display:block;max-width:max-content;margin:22px auto 30px" href="${url}">Verify your email address</a>
    <p style="font-size:14px;color:black!important;margin:0;opacity:.65">If you can't click the button, copy and paste the link below into your browser.</p>
    <a style="font-size:14px;display:inline-block;margin-top:6px" href="${url}">${url}</a>
  </div>
  `;
}
