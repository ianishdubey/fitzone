const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Send order confirmation email
const sendOrderConfirmation = async (order) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@fitzone.com',
      to: order.billing.email,
      subject: `Order Confirmation - ${order.orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f97316;">Order Confirmation</h2>
          <p>Dear ${order.billing.firstName},</p>
          <p>Thank you for your order! Your order has been confirmed.</p>
          
          <div style="background: #f9f9f9; padding: 20px; margin: 20px 0;">
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> ${order.orderId}</p>
            <p><strong>Total Amount:</strong> ₹${order.payment.amount.total.toLocaleString()}</p>
            <p><strong>Payment Method:</strong> ${order.payment.method.toUpperCase()}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3>Items Ordered</h3>
            ${order.items.map(item => `
              <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
                <p><strong>${item.name}</strong></p>
                <p>Type: ${item.type} | Quantity: ${item.quantity} | Price: ₹${item.price.toLocaleString()}</p>
              </div>
            `).join('')}
          </div>
          
          <p>You will receive access to your purchased programs shortly.</p>
          <p>If you have any questions, please contact us at info@fitzone.com</p>
          
          <p>Best regards,<br>FitZone Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent successfully');
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

// Send welcome email
const sendWelcomeEmail = async (user) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@fitzone.com',
      to: user.email,
      subject: 'Welcome to FitZone!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f97316;">Welcome to FitZone!</h2>
          <p>Dear ${user.firstName},</p>
          <p>Welcome to FitZone! We're excited to have you join our fitness community.</p>
          
          <div style="background: #f97316; color: white; padding: 20px; margin: 20px 0; text-align: center;">
            <h3>Your Fitness Journey Starts Here!</h3>
          </div>
          
          <p>Here's what you can do next:</p>
          <ul>
            <li>Explore our fitness programs</li>
            <li>Book your first session</li>
            <li>Set up your fitness goals</li>
            <li>Connect with our trainers</li>
          </ul>
          
          <p>If you have any questions, our team is here to help at info@fitzone.com</p>
          
          <p>Let's get fit together!<br>FitZone Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully');
  } catch (error) {
    console.error('Welcome email error:', error);
    throw error;
  }
};

module.exports = {
  sendOrderConfirmation,
  sendWelcomeEmail
};