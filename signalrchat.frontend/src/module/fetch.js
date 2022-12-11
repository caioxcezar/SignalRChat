const request = async (url, method = "GET", body = {}, headers = {}) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  for (let key of Object.keys(headers)) myHeaders.append(key, headers[key]);

  const requestOptions = {
    method,
    headers: myHeaders,
    redirect: "follow",
  };

  if (method !== "GET") requestOptions.body = JSON.stringify(body);

  return fetch(`${window.location.origin}/api/${url}`, requestOptions);
};

const authorizedRequest = async (
  url,
  method = "GET",
  body = {},
  headers = {}
) => {
  const { token } = JSON.parse(localStorage.getItem("token"));
  return request(url, method, body, {
    ...headers,
    Authorization: `Bearer ${token}`,
  });
};

const refreshToken = async () => {
  const { refreshToken } = JSON.parse(localStorage.getItem("token"));
  const response = await authorizedRequest("refresh", refreshToken);
  if (response.status > 200) throw "Credencial invalida";
  const json = await response.json();
  localStorage.setItem("token", JSON.stringify(json));
};

export { request, authorizedRequest, refreshToken };
