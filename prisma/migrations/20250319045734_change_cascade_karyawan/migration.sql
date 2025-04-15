-- DropForeignKey
ALTER TABLE `Karyawan` DROP FOREIGN KEY `Karyawan_id_karyawan_detail_fkey`;

-- AddForeignKey
ALTER TABLE `Karyawan` ADD CONSTRAINT `Karyawan_id_karyawan_detail_fkey` FOREIGN KEY (`id_karyawan_detail`) REFERENCES `KaryawanDetail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
