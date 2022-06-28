export default async function apiCall(method, url, data){
    if(method==='GET' || method==='DELETE'){
        try {
            const resp = await fetch('http://localhost:8081'+ url, // TODO: tenemos que cambiar el URL
            { 
                method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                return response.json();
            }).then(json => {
                return json;
            });
            return resp;
            } catch (error) {
                console.log(error);
            }
    }else{
        try {
            const resp = await fetch('http://localhost:8081'+ url, // TODO: tenemos que cambiar el URL
            { 
                method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data ? JSON.stringify(data) : {}
            }).then(response => {
                return response.json();
            }).then(json => {
                return json;
            });
            return resp;
            } catch (error) {
                console.log(error);
            }
    }
    
}
