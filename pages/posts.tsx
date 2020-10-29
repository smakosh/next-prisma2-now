import { GetServerSideProps, NextPage, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { PostGetPayload, PrismaClient } from "@prisma/client";
import Head from "next/head";
import useFetchUser from "../hooks/useFetchUser";
import Layout from "../components/Layout";
import { PostsProps } from '.'

const Posts: NextPage<PostsProps> = ({ posts }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const { user, loading } = useFetchUser();

	return (
		<Layout user={user} loading={loading}>
			<Head>
				<title>SSR Posts</title>
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
								Tag.map(({ id, name }) => (
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
				{!loading && user && (
					<div>
						<Link href="/add/" as="/add/">
							<a>Create a post</a>
						</Link>
					</div>
				)}
				<Link href="/" as="/">
					<a>Go static posts page</a>
				</Link>
			</div>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
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
	};
};

export default Posts;
