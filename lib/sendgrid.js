import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendAppointmentStatusUpdate({ patient, doctor, appointment, status }) {
  const statusMessages = {
    confirmed: 'has been confirmed',
    cancelled: 'has been cancelled',
    pending: 'is pending confirmation'
  };

  const subject = `Appointment ${statusMessages[status]} with Dr. ${doctor.name}`;
  
  const message = `
    Dear ${patient.name},

    Your appointment with Dr. ${doctor.name} scheduled for ${new Date(appointment.appointmentDate).toLocaleDateString()} ${status === 'cancelled' ? 'was cancelled' : 'has been confirmed'}.

    Appointment Details:
    - Date: ${new Date(appointment.appointmentDate).toLocaleDateString()}
    - Time: ${appointment.timeSlot.startTime}
    - Type: ${appointment.appointmentType}
    - Status: ${status.charAt(0).toUpperCase() + status.slice(1)}

    ${status === 'confirmed' ? 'Please arrive 10 minutes before your scheduled appointment time.' : ''}
    ${status === 'cancelled' ? 'If you would like to reschedule, please book a new appointment through our platform.' : ''}

    Best regards,
    MedCare Team
  `;

  const msg = {
    to: patient.email,
    from: process.env.SENDGRID_FROM_EMAIL, // verified sender email
    subject: subject,
    text: message,
    html: message.replace(/\n/g, '<br>'),
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    if (error.response) {
      console.error('SendGrid API response:', error.response.body);
    }
    throw error;
  }
} 