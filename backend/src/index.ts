import app from "./app";
// import { processUserData } from './services/neo4db-services/update-graph-database';

const port = process.env.PORT || 5001;

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);

	// Trigger the data migration process after the server starts
	// processUserData()
	//  .then(() => console.log('Data migration from SQLite to Neo4j completed successfully.'))
	//  .catch(error => console.error('Failed to complete data migration from SQLite to Neo4j:', error));
	// });
});
