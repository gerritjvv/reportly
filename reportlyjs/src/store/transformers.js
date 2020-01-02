/**
 * Helper functions to transform graphql response into what the state requires
 */


export const transLoadDataSourcesResponse = (resp) => {
    // we expect [{"id": "", "name":""}]
    // then transform to {"$id": {"name": "$name"}}

    const state = {};

    resp.forEach( ds => state[ds["id"]] = {
        id: ds["id"],
        name: ds["name"],
        tables: transformTables(ds["tables"]),
    });

    return state;
}

const transformTables = (tables) => {
    if(! tables) {
        return {}
    }

    const state = {};
    tables.forEach( tbl => state[tbl["name"]] = tbl);

    return state;
}
