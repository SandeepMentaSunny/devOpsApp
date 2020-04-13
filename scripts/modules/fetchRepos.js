export async function FetchReposFromGithubApi(apiUrl, username, type, accessToken){
    const data = await fetch(`${apiUrl}/users/${username}/${type}`, {headers: {'Authorization': accessToken}});
    const convertedJson = await data.json();
    return convertedJson;
}