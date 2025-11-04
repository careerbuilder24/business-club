"use server"

// This is a mock email service - replace with your actual email provider
// Common options: Sendgrid, Resend, Mailgun, AWS SES, Nodemailer

export async function sendPaymentConfirmationEmail(
  userEmail: string,
  userName: string,
  planName: string,
  amount: string,
  transactionId: string,
) {
  try {
    // Mock email sending - in production, integrate with Resend, SendGrid, etc.
    console.log(`[Email Service] Sending payment confirmation to ${userEmail}`)

    const emailTemplate = `
      <h1>Payment Confirmation</h1>
      <p>Hi ${userName},</p>
      <p>Thank you for your purchase! Your payment has been received and processed successfully.</p>
      
      <h2>Order Details:</h2>
      <ul>
        <li>Plan: ${planName}</li>
        <li>Amount: $${amount}</li>
        <li>Transaction ID: ${transactionId}</li>
        <li>Date: ${new Date().toLocaleDateString()}</li>
      </ul>
      
      <p>Your plan is now active and ready to use. You can start managing your business listings immediately.</p>
      
      <p>If you have any questions, please contact our support team at support@directory.com</p>
      
      <p>Best regards,<br/>The Directory Team</p>
    `

    // TODO: Replace this with actual email service
    // Example with Resend:
    // const { data, error } = await resend.emails.send({
    //   from: 'noreply@directory.com',
    //   to: userEmail,
    //   subject: `Payment Confirmation - ${planName}`,
    //   html: emailTemplate,
    // })

    return { success: true, message: "Payment confirmation email sent" }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, message: "Failed to send email" }
  }
}

export async function sendListingApprovalEmail(userEmail: string, companyName: string, businessName: string) {
  try {
    console.log(`[Email Service] Sending listing approval email to ${userEmail}`)

    const emailTemplate = `
      <h1>Your Listing Has Been Approved!</h1>
      <p>Hi ${companyName},</p>
      <p>Great news! Your business listing has been approved and is now live on our directory.</p>
      
      <h2>Listing Details:</h2>
      <ul>
        <li>Business Name: ${businessName}</li>
        <li>Status: Active</li>
        <li>Approved Date: ${new Date().toLocaleDateString()}</li>
      </ul>
      
      <p>Your business is now visible to thousands of potential customers on our platform. You can log in to your dashboard to track views and manage your listing.</p>
      
      <p><a href="https://directory.com/dashboard">View Your Dashboard</a></p>
      
      <p>Thank you for joining our directory!</p>
      
      <p>Best regards,<br/>The Directory Team</p>
    `

    // TODO: Replace with actual email service
    // const { data, error } = await resend.emails.send({
    //   from: 'noreply@directory.com',
    //   to: userEmail,
    //   subject: `Congratulations! Your Listing is Approved - ${businessName}`,
    //   html: emailTemplate,
    // })

    return { success: true, message: "Listing approval email sent" }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, message: "Failed to send email" }
  }
}

export async function sendListingRejectionEmail(
  userEmail: string,
  companyName: string,
  businessName: string,
  reason: string,
) {
  try {
    console.log(`[Email Service] Sending listing rejection email to ${userEmail}`)

    const emailTemplate = `
      <h1>Listing Review Update</h1>
      <p>Hi ${companyName},</p>
      <p>Thank you for submitting your business listing. Unfortunately, it was not approved at this time.</p>
      
      <h2>Rejection Reason:</h2>
      <p>${reason}</p>
      
      <p>Please review the comments above and resubmit your listing with the necessary corrections.</p>
      
      <p>If you have questions about the rejection, please contact our support team at support@directory.com</p>
      
      <p>We look forward to seeing your updated submission!</p>
      
      <p>Best regards,<br/>The Directory Team</p>
    `

    // TODO: Replace with actual email service

    return { success: true, message: "Listing rejection email sent" }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, message: "Failed to send email" }
  }
}
