/**
 * Helper functions to transform graphql response into what the state requires
 */


export const transLoadDataSourcesResponse = (resp) => {
    // we expect [{"id": "", "name":""}]
    // then transform to {"$id": {"name": "$name"}}

    const state = {};

    resp.forEach( ds => state[ds["id"]] = {name: ds["name"]});

    return state;
}
