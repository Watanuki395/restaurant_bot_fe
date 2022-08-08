export default async function apiCall(method, url, data){
    if(method==='GET' || method==='DELETE'){
        try {
            const resp = await fetch(process.env.REACT_API_URL + url, // TODO: tenemos que cambiar el URL
            { 
                method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if(response.ok){
                    return response.json()
                }
                return response
            }).then(json => {
                return json;
            }).catch((error) =>{
                return error
            }
            );
            return resp;
            } catch (error) {
                console.log(error);
            }
    }else{
        try {
            const resp = await fetch(process.env.REACT_API_URL + url, // TODO: tenemos que cambiar el URL
            { 
                method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data ? JSON.stringify(data) : {}
            }).then( (response) => {
                if(response.ok){
                    return response.json()
                }
                return response
            }).then((json) =>{
                return json
            }).catch((error) =>{
                return error
            }
            )
            return resp;
            } catch (error) {
                //console.log(error);
            }
    }
    
}
