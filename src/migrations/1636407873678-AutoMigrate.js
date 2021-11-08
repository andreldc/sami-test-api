module.exports = class AutoMigrate1636407873678 {
  async up (queryRunner) {
    await queryRunner.query('CREATE TABLE `beneficiary` (`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `name` varchar(200) NOT NULL, `cpf` varchar(11) NOT NULL, `rg` varchar(20) NOT NULL, `birth_date` date NOT NULL, `plan` enum (\'basic\', \'standard\', \'premium\') NOT NULL DEFAULT \'basic\', `number_of_dependents` int NULL, UNIQUE INDEX `IDX_3f82a1edaed25a9e227ac07ed8` (`cpf`), PRIMARY KEY (`id`)) ENGINE=InnoDB')
  }

  async down (queryRunner) {
    await queryRunner.query('DROP INDEX `IDX_3f82a1edaed25a9e227ac07ed8` ON `beneficiary`')
    await queryRunner.query('DROP TABLE `beneficiary`')
  }
}
