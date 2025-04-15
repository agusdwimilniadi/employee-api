import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Insert Karyawan
  const karyawan1 = await prisma.karyawan.create({
    data: {
      name: 'Budi Santoso',
      address: 'Jakarta',
      dob: new Date('1990-06-15'),
      status: 'Active',
      karyawanDetail: {
        create: {
          nik: '123456789',
          npwp: '987654321',
        },
      },
      Rekening: {
        create: {
          nama: 'Budi Santoso',
          nomor: '1234567890',
          jenis: 'Tabungan',
        },
      },
    },
  });

  const karyawan2 = await prisma.karyawan.create({
    data: {
      name: 'Siti Aminah',
      address: 'Surabaya',
      dob: new Date('1995-08-22'),
      status: 'Inactive',
      karyawanDetail: {
        create: {
          nik: '987654321',
          npwp: '123456789',
        },
      },
      Rekening: {
        create: {
          nama: 'Siti Aminah',
          nomor: '0987654321',
          jenis: 'Giro',
        },
      },
    },
  });

  console.log({ karyawan1, karyawan2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
