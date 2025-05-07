import driver from "../../config/neo4j-config";

interface User {
	userId: string;
	referrerId?: string;
}

export const createUser = async (user: User): Promise<any> => {
	const session = driver.session();
	try {
		const result = await session.run(
			"CREATE (u:User {userId: $userId}) RETURN u",
			{ userId: user.userId }
		);

		return result.records;
	} finally {
		await session.close();
	}
};
