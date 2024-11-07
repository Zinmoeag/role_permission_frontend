import { faker } from "@faker-js/faker";


const devDB = {
  roles : ["ADMIN", "USER", "GUEST"],
  users: function() {
    return [
      ...Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        role_name: this.roles[Math.floor(Math.random() * this.roles.length)],
      })),
    ];
  },
};

export default devDB;
