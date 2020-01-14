/**
 * GraphQL helpers
 */

//@TODO Change this
const URL = "/api/graphql"

const checkHttpErrors = (resp) => {
    if(!resp.ok) {
        return Promise.reject(resp.status);
    }

    return resp;
}

const checkForErrors = (json) => {
    const {errors} = json;

    if(errors){
        return Promise.reject(errors[0]);
    }

    return json;
}
/**
 * Returns fetch(URL)
 * @returns {Promise<Response>}
 */
export const query = (data) => {
    console.log("Query :" + data.replace(/(\r\n|\n|\r)/gm, ''));
    return fetch(URL,
        {
            method: 'POST',
            body: data.replace(/(\r\n|\n|\r)/gm, ''),
            headers: {
                'Content-Type': 'application/graphql'
            }
        })
        .then(checkHttpErrors)
        .then( resp => resp.json())
        .then(checkForErrors)
        .then (({data}) => data);
};
