import React from "react";
import Head from "next/head";
import { Photon } from "@prisma/photon";

export async function unstable_getStaticProps() {
	try {
		const photon = new Photon();

		const users = await photon.users();

		return {
			props: {
				users
			}
		};
	} catch (err) {
		console.log(err);
	}
}

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
		</div>
	</div>
);

export default Home;
