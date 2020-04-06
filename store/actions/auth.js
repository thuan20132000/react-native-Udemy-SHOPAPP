import { AsyncStorage } from "react-native";

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const AUTHENTICATE  = 'AUTHENTICATE';

export const authenticate = (userId,token) =>{
  return{
       type:AUTHENTICATE,
       userId :userId,
       token:token
  }
}

export const signup = (email, password) => {
  return async dispatch => {
    
    
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAWBt9PrtUFVSGZgql5cvTMH5bfo-Wo_IY',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
              })
            }
          );
      
          if (!response.ok) {
            const errorResData = await response.json();
            const errId = errorResData.error.message;
            
            let message = "";
                 
            if(errId === 'EMAIL_EXISTS'){
              message = "This email have already exists!!!";
            }else if(errId === 'INVALID_PASSWORD'){
              message = "The password is not valid!!!";
            }else{
              message = "something went wrong!!!"
            }

            throw new Error(message);
          }
      
          const resData = await response.json();
    
    dispatch(authenticate(resData.localId,resData.idToken));
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);

    saveDataToStorage(resData.idToken,resData.localId,expirationDate);

  };
};

export const login = (email,password) =>{
    return async dispatch =>{
        


            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAWBt9PrtUFVSGZgql5cvTMH5bfo-Wo_IY',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                  })
                }
              );

              // console.log(await response.json());
              if (!response.ok) {
                const errorResData = await response.json();
                const errorId = errorResData.error.message;
                let message = "";
                 
                  if(errorId === 'EMAIL_NOT_FOUND'){
                    message = "This email could not be found!!!";
                  }else if(errorId === 'INVALID_PASSWORD'){
                    message = "The password is not valid!!!";
                  }else{
                    message = "something went wrong!!!"
                  }
                  
                  throw new Error(message);
              }

              const resData = await response.json();
              // console.log(resData.idToken);
              // console.log("-=====--");
              // console.log(resData.localId);
              
              // console.log(resData);
              // console.log(new Date().getTime());

              const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);

              saveDataToStorage(resData.idToken,resData.localId,expirationDate);

              dispatch(authenticate(resData.localId,resData.idToken));
    }
}

export const logout = () =>{

    return{type: LOGOUT};

}


const saveDataToStorage =  (token,userId,expirationDate) =>{
    AsyncStorage.setItem('userData',JSON.stringify({
        token: token,
        userid : userId,
        expiryDate : expirationDate.toISOString()
      })
    );
};