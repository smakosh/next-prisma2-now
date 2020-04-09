import React from "react";
import fetch from "node-fetch";
import Head from "next/head";

export const getServerSideProps = async () => {
  try {
    const res = await fetch(`${process.env.BASE_URL_PRISMA_EXAMPLE}/api/posts`);
    const posts = await res.json();

    return {
      props: { posts },
    };
  } catch (err) {
    console.log(err);
  }
};

const Home = ({ posts }) => (
  <div>
    <Head>
      <title>Posts</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div>
      {posts &&
        posts.map(({ id, title, content }) => (
          <ul key={id}>
            <li>
              <h1>{title}</h1>
            </li>
            <li>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </li>
          </ul>
        ))}
    </div>
  </div>
);

export default Home;
