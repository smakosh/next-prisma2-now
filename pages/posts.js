import React from "react";
import Head from "next/head";
import { Photon } from "@prisma/photon";

export async function unstable_getStaticProps() {
	try {
		const photon = new Photon();

		const posts = await photon.posts();

		return {
			props: {
				posts
			}
		};
	} catch (err) {
		console.log(err);
	}
}

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
