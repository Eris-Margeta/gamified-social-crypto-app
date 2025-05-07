import driver from "../../config/neo4j-config";

export const addUserUnderReferrer = async (
	username: string,
	referrer: string
) => {
	const session = driver.session();
	try {
		await session.run(
			"MERGE (user:User {name: $username}) " +
				"MERGE (referrer:User {name: $referrer}) " +
				"MERGE (user)-[:REFERRED_BY]->(referrer)",
			{ username, referrer }
		);
	} finally {
		await session.close();
	}
};

export const startNewTree = async (username: string) => {
	const session = driver.session();
	try {
		await session.run("CREATE (user:User {name: $username})", { username });
	} finally {
		await session.close();
	}
};
