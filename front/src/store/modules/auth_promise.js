import authAPI from '@/api/auth'



const state ={
  signUpFailure:false,
  loginFailure:false,
  loginSuccess:false,
  showEmailCheck:'',
  confirmation:false,
  user:{},
  accessToken:'',
  refreshToken:'',
  
}


const mutations = {
  REGISTER_FAILURE(state){
    state.signUpFailure = true;
  },
  PASS_EMAIL_POTENTIAL_USER(state,email) {
    console.log("inside mutation PASS EMAIL POT USER with email",email)
    state.showEmailCheck=email;
  },
  SET_CONFIRM(state){
    state.confirmation = true
  },
  SET_LOGIN_FAILURE(state){
    state.loginFailure = true
  },
  SET_LOGIN_SUCCESS(state){
    state.loginSuccess = true
  },
  SET_ACCESS_TOKEN(state,access){
    localStorage.setItem("accessToken",access)
    state.accessToken = access
  },
  SET_REFRESH_TOKEN(state,refresh){
    localStorage.setItem("refreshToken",refresh)
    state.refreshToken = refresh
  },
  CLEAN_LOCAL_STORAGE(){
    localStorage.clear()
  }
  
}
const actions = {
    register({commit},creds){
      console.log("store dispatching with creds",creds)
      let servResp = {
        status:"",
        firstNameErr:[],
        lastNameErr:[],
        emailErr:[],
        pswErr:[],
        nonFieldErr:[],
        netWorkErr:[]
      };
      return new Promise((resolve,reject)=>{
        authAPI.register(creds)
        .then((resp)=>{
          console.log("response is",resp) //.config,.data (f_name,l_name,email),status=201
          servResp.status = resp.status;
          servResp.email = resp.data.email;     
          commit('PASS_EMAIL_POTENTIAL_USER',resp.data.email);          
          // let op:status is already above, but email is creaded here
          resolve (servResp)
        })
        .catch(err=>{
          reject(err)
        }
      )
    })
  },
  activate({commit},creds){
    // endpoint will return only: response status=204, no data
    return new Promise((resolve,reject)=>{
      let status = ""
      authAPI.activate(creds)
      .then((resp)=>{
        // dj server response == 204        
        commit('SET_CONFIRM');
        console.log("msg from store: email confirmed")
        status = resp.status
        resolve(status)
      })
      .catch((err)=>{
        console.log("err during email confirmation");
        status = err.response.status;
        commit('REGISTER_FAILURE')
        reject(status)
      })

    })
  },
  login({commit},creds){
    console.log("trying to login = msg from store")
    return new Promise((resolve,reject)=>{      
      authAPI.login(creds)
      .then((resp)=>{    
        console.log("got from server",resp) 
        console.log("access",resp.data.access)   
        console.log("refresh",resp.data.refresh)
        commit('CLEAN_LOCAL_STORAGE') 
        console.log("Ls cleaned")  
        commit('SET_LOGIN_SUCCESS')  
        commit('SET_ACCESS_TOKEN',resp.data.access)
        commit('SET_REFRESH_TOKEN',resp.data.refresh)
        console.log("mutations done")
        resolve(resp.status)
      })
      .catch((err)=>{
        // dj server is down  
        console.log("smth went wrong...")      
        commit('SET_LOGIN_FAILURE')
        reject(err)

      })
    })
  },
  getUser({commit},token){
    
    return new Promise((resolve,reject)=>{
      authAPI.getUser(token)
      .then((resp)=>{
        const user = JSON.stringify(resp.data)
        commit('SET_USER',user)
        resolve(resp)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  }

}  

export default {
  state,  
  mutations,
  actions
  
}