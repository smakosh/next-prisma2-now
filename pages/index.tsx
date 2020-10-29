import { GetStaticProps, NextPage, InferGetStaticPropsType } from "next";
import Link from "next/link";
import Head from "next/head";
import { FindManyPostArgs, Post, PostGetPayload, PrismaClient, Tag } from "@prisma/client";
import useFetchUser from "../hooks/useFetchUser";
import Layout from "../components/Layout";

export interface PostsProps {
	posts: {
		id: string;
		title: string;
		content: string;
		Tag: { id: string; name: string }[];
	}[];
}

const Posts: NextPage<PostsProps> = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
				{posts.map(({ id, title, content, Tag }: PostGetPayload<{include: {Tag: true}}>) => (
					<ul key={id}>
						<li>
							<h1>{title}</h1>
							{Tag?.length > 0 &&
								Tag.map(({ id, name }: Tag) => (
									<span
										key={id}
										style={{
											background: "cyan",
											padding: ".2rem .5rem",
											display: "inline-block",
											marginBottom: 20,
											marginRight: 20
										}}
									>
										{name}
									</span>
								))}
						</li>
						{content && <li>
							<div dangerouslySetInnerHTML={{ __html: content }} />
						</li>}
					</ul>
				))}
				<Link href="/posts/" as="/posts/">
					<a>Go Dynamic posts page</a>
				</Link>
			</div>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const prisma = new PrismaClient();

	const posts = await prisma.post.findMany({
		where: {
      published: true,
    },
    include: {
      Tag: true,
    },
  });

	return {
		props: { posts: JSON.parse(JSON.stringify(posts)) },
		revalidate: 2,
	};
};

export default Posts;
