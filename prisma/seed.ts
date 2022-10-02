import { prisma, PrismaClient, User } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as argon from 'argon2';
import fs from 'node:fs/promises';
import path from 'node:path';

const client = new PrismaClient();

interface SignUpUser {
  id?: string;
  fullname: string;
  email: string;
  username: string;
  password: string;
}

async function seed() {
  let totalUser: number = 5;
  const users: SignUpUser[] = [];

  while (totalUser--) {
    const [firstName, lastName] = faker.name.fullName().split(/\s/);

    const user = {
      fullname: `${firstName} ${lastName}`,
      email: faker.internet.email(firstName, lastName),
      username: `${firstName}${faker.random.alphaNumeric(5)}`.toLowerCase(),
      password: faker.internet.password(6),
    };

    // create user
    const { id } = await client.user.create({
      data: {
        ...user,
        password: await argon.hash(user.password),
      },
    });

    users.push({
      ...user,
      id,
    });
  }

  // create proxy list
  for (const { id, username } of users) {
    let totalProxyList: number = 3;

    while (totalProxyList--) {
      const proxyList = {
        name: faker.word.noun(),
        username: `${username}${faker.random.alphaNumeric(4)}`.toLowerCase(),
        password: faker.internet.password(5),
      };

      await client.proxyList.create({
        data: {
          userId: id as string,
          ...proxyList,
        },
      });
    }
  }

  const usersFile = path.resolve(__dirname, 'users.json');
  const prevUsers = JSON.parse((await readFile(usersFile, '[]')).toString());
  fs.writeFile(
    usersFile,
    JSON.stringify(
      prevUsers.concat(users.map(({ id, ...rest }) => rest)),
      null,
      2
    )
  );

  await client.$disconnect();
}

seed();

async function readFile(path: string, writePlaceolder: string) {
  try {
    return await fs.readFile(path);
  } catch {
    await fs.writeFile(path, writePlaceolder);
    return writePlaceolder;
  }
}
