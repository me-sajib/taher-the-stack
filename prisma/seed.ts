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
  const { USER_COUNT, PROXY_LIST_COUNT, FULL_NAME, USERNAME, EMAIL, PASSWORD } =
    process.env;

  if (USER_COUNT) {
    let totalUser: number = +USER_COUNT;
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
    if (PROXY_LIST_COUNT) {
      for (const { id, username } of users) {
        let totalProxyList: number = +PROXY_LIST_COUNT;

        while (totalProxyList--) {
          const proxyList = {
            name: faker.word.noun(),
            username: `${username}${faker.random.alphaNumeric(
              4
            )}`.toLowerCase(),
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
  }

  if (FULL_NAME && USERNAME && EMAIL && PASSWORD) {
    client.user.create({
      data: {
        fullname: FULL_NAME,
        username: USERNAME,
        email: EMAIL,
        password: await argon.hash(PASSWORD),
      },
    });
  }

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
