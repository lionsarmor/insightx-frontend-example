export default ({ store, app }, inject) => {
    inject('insightfetch', (extendUrl, fetchType='GET', jsonBody=null,  mode='cors', credential='same-origin', toasterAlert=false) => {
        let token = sessionStorage.getItem('token')
        let base = store.state.apiEndPoint
        let url = base + extendUrl
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(token + ':unused')
        }
        let args = { 
            credentials: credential,
            headers: headers,
            mode:mode,
            method: fetchType 
        }
        if (jsonBody != null){
            args['body'] = JSON.stringify(jsonBody)
        }
        let response = fetch(url, args).then(function(response) {
          if (response.status == 405){
            app.router.push("/login")
          }
          if (response.status!==200) {
            app.router.push("/login")
          }
          return response.json();}).then(function(responseObject){
              if (toasterAlert==true) {
                if (responseObject.result=="success"){
                  if ('message' in responseObject){
                    app.$toast.success(responseObject.message, {icon: 'check'})
                  } else {
                          app.$toast.success('Success', {icon: 'check'})
                        }
                } else {
                    if ('message' in responseObject){
                      app.$toast.error(responseObject.message, {icon: 'warning'})
                    } else {
                            app.$toast.error('Request Failed', {icon: 'warning'})
                          }
                }
              }
                return responseObject
            })
        return response
      })
    } 
