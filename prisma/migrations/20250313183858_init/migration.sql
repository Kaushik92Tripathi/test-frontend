-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'patient',
    "authProvider" TEXT DEFAULT 'email',
    "authId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gender" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "age" INTEGER,
    "phone" TEXT,
    "address" TEXT,
    "profilePicture" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specialty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Specialty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT,
    "zipCode" TEXT,
    "country" TEXT NOT NULL DEFAULT 'India',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "specialtyId" INTEGER,
    "degree" TEXT NOT NULL,
    "experienceYears" INTEGER NOT NULL DEFAULT 0,
    "bio" TEXT,
    "locationId" INTEGER,
    "consultationFee" DECIMAL(65,30),
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "avgRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeSlot" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TimeSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoctorAvailability" (
    "id" SERIAL NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "timeSlotId" INTEGER NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DoctorAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER,
    "doctorId" INTEGER,
    "appointmentDate" TIMESTAMP(3) NOT NULL,
    "timeSlotId" INTEGER,
    "appointmentType" TEXT NOT NULL DEFAULT 'offline',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "patientProblem" TEXT,
    "patientAge" INTEGER,
    "patientGender" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "appointmentId" INTEGER,
    "patientId" INTEGER,
    "doctorId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 1,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Specialty_name_key" ON "Specialty"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_userId_key" ON "Doctor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_appointmentId_key" ON "Review"("appointmentId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorAvailability" ADD CONSTRAINT "DoctorAvailability_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorAvailability" ADD CONSTRAINT "DoctorAvailability_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
