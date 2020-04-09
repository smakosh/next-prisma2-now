import React from "react";
import Head from "next/head";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

export const getStaticProps = async () => {
  try {
    const prisma = new PrismaClient();

    const users = await prisma.user.findMany();

    return {
      props: {
        users,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

const Home = ({ users }) => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div>
      {users &&
        users.map(({ id, email, name }) => (
          <ul key={id}>
            <li>
              <h1>{name}</h1>
            </li>
            <li>
              Email: <strong>{email}</strong>
            </li>
          </ul>
        ))}
      <Link href="/posts" as="/posts">
        <a>Go to Posts page</a>
      </Link>
    </div>
  </div>
);

export default Home;
