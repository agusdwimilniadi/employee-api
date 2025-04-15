-- DropForeignKey
ALTER TABLE `Rekening` DROP FOREIGN KEY `Rekening_id_karyawan_fkey`;

-- DropIndex
DROP INDEX `Rekening_id_karyawan_key` ON `Rekening`;

