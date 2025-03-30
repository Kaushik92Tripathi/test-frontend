// lib/email.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendAppointmentConfirmation({ patient, doctor, appointment, type }) {
  const templateData = {
    patientName: patient.name,
    doctorName: doctor.name,
    date: new Date(appointment.appointment_date).toLocaleDateString(),
    time: `${appointment.start_time} - ${appointment.end_time}`,
    type: type,
    location: type === 'offline' ? appointment.location : 'Online Video Consultation',
    problem: appointment.patient_problem
  };
  
  let template = '';
  let subject = '';
  
  if (type === 'online') {
    subject = 'Your Online Consultation Appointment Confirmation';
    template = `
      <h2>Online Consultation Appointment Confirmation</h2>
      <p>Dear ${templateData.patientName},</p>
      <p>Your online consultation with Dr. ${templateData.doctorName} has been scheduled for ${templateData.date} at ${templateData.time}.</p>
      <p>You will receive a video call link prior to your appointment.</p>
      <p>Problem noted: ${templateData.problem}</p>
      <p>Thank you for choosing our service.</p>
    `;
  } else {
    subject = 'Your In-Person Appointment Confirmation';
    template = `
      <h2>In-Person Appointment Confirmation</h2>
      <p>Dear ${templateData.patientName},</p>
      <p>Your appointment with Dr. ${templateData.doctorName} has been scheduled for ${templateData.date} at ${templateData.time}.</p>
      <p>Location: ${templateData.location}</p>
      <p>Problem noted: ${templateData.problem}</p>
      <p>Please arrive 15 minutes before your appointment time.</p>
      <p>Thank you for choosing our service.</p>
    `;
  }
  
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: patient.email,
    subject: subject,
    html: template
  });
}

export async function sendAppointmentStatusUpdate({ patient, doctor, appointment, status }) {
  let subject = '';
  let template = '';
  
  if (status === 'confirmed') {
    subject = 'Your Appointment has been Confirmed';
    template = `
      <h2>Appointment Confirmed</h2>
      <p>Dear ${patient.name},</p>
      <p>Your appointment with Dr. ${doctor.name} on ${new Date(appointment.appointment_date).toLocaleDateString()} has been confirmed.</p>
      <p>Thank you for choosing our service.</p>
    `;
  } else if (status === 'rejected') {
    subject = 'Your Appointment Request Could Not Be Accommodated';
    template = `
      <h2>Appointment Not Available</h2>
      <p>Dear ${patient.name},</p>
      <p>Unfortunately, Dr. ${doctor.name} is unable to accommodate your appointment request for ${new Date(appointment.appointment_date).toLocaleDateString()}.</p>
      <p>Please book another time slot that works for you.</p>
      <p>We apologize for any inconvenience.</p>
    `;
  }
  
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: patient.email,
    subject: subject,
    html: template
  });
}