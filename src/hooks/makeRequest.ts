interface IRequest extends RequestInit {
  url?: string;
}

const makeRequest = ({
  method = 'POST',
  body,
  url = 'https://jsonplaceholder.typicode.com/posts',
}: IRequest) => {
  const headers = {
    'Content-type': 'application/json; charset=UTF-8',
  };

  return fetch(url, { headers, body, method });
};

export default makeRequest;
