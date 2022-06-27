export const categoriesService = (request) => {
    const REGISTER_API_ENDPOINT = 'http://localhost:8081/api/product/categories/';
    
    const parameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request.user)
    };
  
    return fetch(REGISTER_API_ENDPOINT, parameters)
      .then(response => {
        return response.json();
      })
      .then(json => {
        return json;
      });
  };
