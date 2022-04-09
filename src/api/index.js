export default function apiCall(method, url, data){
    return fetch('https://restaurant-bot-dev.herokuapp.com'+ url, // TODO: tenemos que cambiar el URL
    { 
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: method = 'POST' && data ? JSON.stringify(data) : null
    }).then(response => {
        return response.json();
    }).then(json => {
        return json;
    });
}