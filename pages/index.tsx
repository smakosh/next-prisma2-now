import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import fetch from "node-fetch";
import Head from "next/head";
import useFetchUser from "../hooks/useFetchUser";
import Layout from "../components/Layout";

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.BASE_URL_PRISMA_EXAMPLE}api/posts`);
  const posts = await res.json();

  return {
    revalidate: 2,
    props: { posts },
  };
};

const Posts: NextPage<{
  posts: Array<{
    id: string;
    title: string;
    content: string;
    Tag: Array<{ id: string; name: string }>;
  }>;
}> = ({ posts }) => {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user} loading={loading}>
      <Head>
        <title>Static Posts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        {posts.map(({ id, title, content, Tag }) => (
          <ul key={id}>
            <li>
              <h1>{title}</h1>
              {Tag?.length > 0 &&
                Tag.map(({ id, name }) => (
                  <span
                    key={id}
                    style={{
                      background: "cyan",
                      padding: ".2rem .5rem",
                      display: "inline-block",
                      marginBottom: "1rem",
                    }}
                  >
                    {name}
                  </span>
                ))}
            </li>
            <li>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </li>
          </ul>
        ))}
        <Link href="/posts/" as="/posts/">
          <a>Go Dynamic posts page</a>
        </Link>
      </div>
    </Layout>
  );
};

export default Posts;
