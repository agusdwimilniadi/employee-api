-- AddForeignKey
ALTER TABLE `Rekening` ADD CONSTRAINT `Rekening_id_karyawan_fkey` FOREIGN KEY (`id_karyawan`) REFERENCES `Karyawan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
