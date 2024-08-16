"use strict";

const faker = require("faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];
    const numberOfUsers = 10;

    for (let i = 0; i < numberOfUsers; i++) {
      users.push({
        nama: faker.name.findName(), // Menghasilkan nama palsu
        alamat: faker.address.streetAddress(), // Menghasilkan alamat palsu
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("user", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user", null, {});
  },
};
