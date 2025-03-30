const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function main() {
  // Create specialties
  const specialties = await Promise.all([
    prisma.specialty.upsert({
      where: { name: 'Cardiology' },
      update: {},
      create: {
        name: 'Cardiology',
        description: 'Deals with disorders of the heart and blood vessels'
      }
    }),
    prisma.specialty.upsert({
      where: { name: 'Dermatology' },
      update: {},
      create: {
        name: 'Dermatology',
        description: 'Focuses on conditions affecting the skin'
      }
    }),
    prisma.specialty.upsert({
      where: { name: 'Neurology' },
      update: {},
      create: {
        name: 'Neurology',
        description: 'Deals with disorders of the nervous system'
      }
    }),
    prisma.specialty.upsert({
      where: { name: 'Pediatrics' },
      update: {},
      create: {
        name: 'Pediatrics',
        description: 'Specializes in medical care for children'
      }
    }),
    prisma.specialty.upsert({
      where: { name: 'Orthopedics' },
      update: {},
      create: {
        name: 'Orthopedics',
        description: 'Focuses on disorders of bones and joints'
      }
    })
  ]);

  // Create locations
  const locations = await Promise.all([
    prisma.location.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Main Hospital',
        address: '123 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400001',
        country: 'India'
      }
    }),
    prisma.location.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: 'Downtown Clinic',
        address: '456 Downtown Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400002',
        country: 'India'
      }
    }),
    prisma.location.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: 'North Branch',
        address: '789 North Avenue',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400003',
        country: 'India'
      }
    })
  ]);

  // Create time slots (9 AM to 5 PM, 1-hour slots)
  const timeSlots = [];
  for (let hour = 9; hour < 17; hour++) {
    const startTime = new Date();
    startTime.setHours(hour, 0, 0, 0);
    const endTime = new Date();
    endTime.setHours(hour + 1, 0, 0, 0);

    timeSlots.push(
      prisma.timeSlot.upsert({
        where: { id: hour - 8 }, // IDs from 1 to 8
        update: {},
        create: {
          startTime,
          endTime
        }
      })
    );
  }
  await Promise.all(timeSlots);

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@medcare.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@medcare.com',
      password: await hashPassword('admin123'),
      role: 'admin'
    }
  });

  // Create sample patients
  const patients = await Promise.all([
    prisma.user.upsert({
      where: { email: 'patient1@example.com' },
      update: {},
      create: {
        name: 'John Doe',
        email: 'patient1@example.com',
        password: await hashPassword('patient123'),
        role: 'patient',
        profile: {
          create: {
            gender: 'male',
            dateOfBirth: new Date('1990-01-15'),
            age: 33,
            phone: '+91 9876543210',
            address: '123 Patient Street, Mumbai'
          }
        }
      }
    }),
    prisma.user.upsert({
      where: { email: 'patient2@example.com' },
      update: {},
      create: {
        name: 'Jane Smith',
        email: 'patient2@example.com',
        password: await hashPassword('patient123'),
        role: 'patient',
        profile: {
          create: {
            gender: 'female',
            dateOfBirth: new Date('1985-05-20'),
            age: 38,
            phone: '+91 9876543211',
            address: '456 Patient Avenue, Mumbai'
          }
        }
      }
    })
  ]);

  // Create sample doctors with varying ratings
  const doctorData = [
    {
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@example.com',
      specialty: 'Cardiology',
      degree: 'MBBS, MD (Cardiology)',
      experience: 15,
      rating: 4.8
    },
    {
      name: 'Dr. Michael Chen',
      email: 'michael.chen@example.com',
      specialty: 'Dermatology',
      degree: 'MBBS, MD (Dermatology)',
      experience: 12,
      rating: 4.5
    },
    {
      name: 'Dr. Emily Brown',
      email: 'emily.brown@example.com',
      specialty: 'Pediatrics',
      degree: 'MBBS, MD (Pediatrics)',
      experience: 10,
      rating: 4.9
    },
    {
      name: 'Dr. James Wilson',
      email: 'james.wilson@example.com',
      specialty: 'Neurology',
      degree: 'MBBS, MD (Neurology)',
      experience: 20,
      rating: 4.7
    },
    {
      name: 'Dr. Lisa Anderson',
      email: 'lisa.anderson@example.com',
      specialty: 'Orthopedics',
      degree: 'MBBS, MS (Orthopedics)',
      experience: 8,
      rating: 4.6
    }
  ];

  const doctors = [];
  for (const data of doctorData) {
    const specialty = specialties.find(s => s.name === data.specialty);
    const doctor = await prisma.user.upsert({
      where: { email: data.email },
      update: {},
      create: {
        name: data.name,
        email: data.email,
        password: await hashPassword('doctor123'),
        role: 'doctor',
        doctor: {
          create: {
            specialtyId: specialty.id,
            degree: data.degree,
            experienceYears: data.experience,
            bio: `${data.name} is a highly experienced ${data.specialty} specialist with ${data.experience} years of practice.`,
            locationId: Math.floor(Math.random() * 3) + 1,
            consultationFee: Math.floor(Math.random() * 1000) + 500,
            isAvailable: true,
            avgRating: data.rating,
            reviewCount: Math.floor(Math.random() * 50) + 20
          }
        }
      },
      include: {
        doctor: true
      }
    });
    doctors.push(doctor);
  }

  // Create sample appointments (past and upcoming)
  const appointmentStatuses = ['completed', 'pending', 'cancelled'];
  const appointmentTypes = ['offline', 'online'];
  
  const appointments = [];
  for (const doctor of doctors) {
    for (const patient of patients) {
      // Past appointments
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - Math.floor(Math.random() * 30));
      
      appointments.push(
        prisma.appointment.create({
          data: {
            patientId: patient.id,
            doctorId: doctor.doctor.id,
            appointmentDate: pastDate,
            timeSlotId: Math.floor(Math.random() * 8) + 1,
            appointmentType: appointmentTypes[Math.floor(Math.random() * appointmentTypes.length)],
            status: 'completed',
            patientProblem: 'Regular checkup and consultation',
            patientAge: patient.profile?.age || 30,
            patientGender: patient.profile?.gender || 'not specified',
            notes: 'Regular followup required'
          }
        })
      );

      // Future appointments
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + Math.floor(Math.random() * 30));
      
      appointments.push(
        prisma.appointment.create({
          data: {
            patientId: patient.id,
            doctorId: doctor.doctor.id,
            appointmentDate: futureDate,
            timeSlotId: Math.floor(Math.random() * 8) + 1,
            appointmentType: appointmentTypes[Math.floor(Math.random() * appointmentTypes.length)],
            status: appointmentStatuses[Math.floor(Math.random() * (appointmentStatuses.length - 1)) + 1],
            patientProblem: 'Regular checkup and consultation',
            patientAge: patient.profile?.age || 30,
            patientGender: patient.profile?.gender || 'not specified'
          }
        })
      );
    }
  }

  const createdAppointments = await Promise.all(appointments);

  // Create reviews for completed appointments
  const reviews = [];
  for (const appointment of createdAppointments) {
    if (appointment.status === 'completed') {
      reviews.push(
        prisma.review.create({
          data: {
            appointmentId: appointment.id,
            patientId: appointment.patientId,
            doctorId: appointment.doctorId,
            rating: Math.floor(Math.random() * 2) + 4, // Ratings between 4 and 5
            comment: 'Great experience with the doctor. Very professional and knowledgeable.'
          }
        })
      );
    }
  }

  await Promise.all(reviews);

  // Create doctor availability
  for (const doctor of doctors) {
    const availabilityData = [];
    for (let day = 1; day <= 5; day++) { // Monday to Friday
      for (let slot = 1; slot <= 8; slot++) { // 9 AM to 5 PM
        availabilityData.push({
          doctorId: doctor.doctor.id,
          dayOfWeek: day,
          timeSlotId: slot,
          isAvailable: Math.random() > 0.2 // 80% chance of being available
        });
      }
    }
    await prisma.doctorAvailability.createMany({
      data: availabilityData
    });
  }

  console.log('Seed data created:');
  console.log('Specialties:', specialties.length);
  console.log('Locations:', locations.length);
  console.log('Time Slots:', timeSlots.length);
  console.log('Admin:', admin.email);
  console.log('Doctors:', doctors.length);
  console.log('Patients:', patients.length);
  console.log('Appointments:', createdAppointments.length);
  console.log('Reviews:', reviews.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 