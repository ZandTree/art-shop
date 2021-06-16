import authAPI from '@/api/auth'
import axios from 'axios'


const state ={
  signUpFailure:false,
  loginFailure:false,
  loginSuccess:false,
  showEmailCheck:'',
  // confirmation sent to email after signUp
  confirmation:false,
  user:null,
  accessToken:null,
  refreshToken:null,
  isLogIn:null, // null,false,true,
  googleAuthSuccess:null,
  googleAuthFail:null

  
}

const mutations = {
  CLEAR_CREDS(state){
    state.isLogIn=false,
    state.accessToken=null,
    state.refreshToken=null,
    state.user =null
  },
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
  SET_USER(state,user){
    state.user = user
  },
  SET_LOG_IN(state){
    state.isLogIn = true
  }
  
}
const actions = {
    async register({commit},creds){
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
        const resp = await authAPI.register(creds)        
          console.log("response is",resp) //.config,.data (f_name,l_name,email),status=201
          servResp.status = resp.status;
          console.log('in store action register status is:',resp.status)
          servResp.email = resp.data.email;     
          commit('PASS_EMAIL_POTENTIAL_USER',resp.data.email);          
          // let op:status is already above, but email is creaded here
          return resp            
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
  async login({dispatch,commit},creds){
    console.log("msg from store... func login")
    try{
    const resp = await authAPI.login(creds)         
        console.log("got from server",resp) 
        if(resp.status ===200){   
          console.log("making mutaions in store")     
          commit('SET_LOGIN_SUCCESS')  
          commit('SET_ACCESS_TOKEN',resp.data.access)
          commit('SET_REFRESH_TOKEN',resp.data.refresh)
        }
        console.log("passing resp to component",resp)
        console.log("callign for dispatch func for user info")
        dispatch('getUser',resp.data.access)
        return resp
    }  catch(err){
        console.log("store passes this error to component:",err)           
        commit('SET_LOGIN_FAILURE')
        localStorage.clear()
        console.log("login failed and Local storage is cleaned")        
        return err

      }
    
  },
  async registerGoogle() {
    console.log("sending get req to google")
    try{
      console.log("in block try")
      // const resp = await authAPI.registerGoogle()
        let url = 'http://localhost:8080'
        const resp = await  axios.get(`http:8000/auth/o/google-oauth2/?redirect_uri=${url}/google`)
      // change page on my website to google page
      // window.location.replace(resp.data.authorization_url);
      return resp

    }catch(err){
      console.log("error during google auth-n",err)
      console.log(Object.keys(err))
      console.dir(err)
      return err
    }
  }, 
  async getUser({commit},token){    
    try{
      console.log("inside get User, waking djoser /me ")
      const resp= await authAPI.getUser(token)
      if(resp.status === 200){
        const user = JSON.stringify(resp.data)
        console.log("user from djoser ",user)
        commit('SET_USER',user)
        commit('SET_LOG_IN')        
        }
      }
      catch(err){
        console.log("smth went wrong with getUser function")
      }
    },
    signOut({commit}){
      console.log("store starts sign out")
      commit('CLEAR_CREDS')
      console.log("local storage is clear")
    }
  
}

  

export default {
  state,  
  mutations,
  actions
  
}