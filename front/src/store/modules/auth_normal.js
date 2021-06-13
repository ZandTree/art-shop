import authAPI from '@/api/auth'

const state ={
  signUpFailure:false,
  showEmailCheck:'',
  confirmation:false
}

const mutations = {
  registerFailure(state){
    state.signUpFailure = true;
  },
  PASS_EMAIL_POTENTIAL_USER(state,email) {
    state.showEmailCheck=email;
  },
  SET_CONFIRM(state){    
    state.confirmation = true    
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
      };
      try{
        const resp = await authAPI.register(creds)        
        console.log("response is",resp)
        servResp.status = resp.status;
        commit('PASS_EMAIL_POTENTIAL_USER',resp.data.email);
        return resp
          
        
      }catch(err){
          console.log("err is",err.response.status);
          servResp.status = err.response.status
          servResp.firstNameErr = err.response.data.first_name;
          servResp.lastNameErr = err.response.data.last_name;
          servResp.emailErr = err.response.data.email;
          servResp.pswErr = err.response.data.password;
          servResp.nonFieldErr = err.response.data.non_field_errors;
          // TODO: create mutaion to catch err msg          
        }      
    
  },
  activate({commit},creds){
    return new Promise((resolve,reject)=>{
      let status = ""
      authAPI.activate(creds)
      .then((resp)=>{
        console.log("resp",resp);
        commit('SET_CONFIRM');
        status = resp.status
        resolve(status)
      })
      .catch((err)=>{
        console.log("err during email confirmation");
        status = err.response.status
        reject(status)
      })

    })
  }

}  


export default {
  state,  
  mutations,
  actions
  
}