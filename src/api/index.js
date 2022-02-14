export default function apiCall(method, url, data){
    return fetch('http://localhost:8081'+ url, // TODO: tenemos que cambiar el URL
    { 
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: data ? JSON.stringify(data) : {}
    }).then(response => {
        return response.json();
    }).then(json => {
        return json;
    });
}