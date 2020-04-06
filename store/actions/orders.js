import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';


export const fetchOrders = ()=>{
    return async (dispatch,getState) =>{
        const userId = getState().auth.userId;
        const loadedOrders = [];
        try{
            const response = await fetch(
                `https://shopp-app-dfc15.firebaseio.com/orders/${userId}.json`
            );

            if(!response.ok){
                throw new Error("Something went wrong");
            }
            
            const resData = await response.json();
            
            for(const key in resData){
                loadedOrders.push(
                   new Order(
                        key,
                        resData[key].cartItems,
                        resData[key].totalAmount,
                        resData[key].date
                   )
                );    
            }
            dispatch({
                type:SET_ORDERS,
                orders:loadedOrders
            });

        }catch(err){
             //send to custom analytics server
            throw err;
        }

        // console.log(loadedOrders);
        
    };
};


export const addOrder = (cartItems,totalAmount)=>{
   

    return async (dispatch,getState) => {
        const dates = new Date();
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://shopp-app-dfc15.firebaseio.com/orders/${userId}.json?auth=${token}`,
        {
            method:'POST', 
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
               cartItems,
               totalAmount,
               date: dates.toISOString()
            })
        });
        if(!response.ok){
            throw new Error('Something went wrong!!');
        }

        const resData = await response.json();

        dispatch({
            type:ADD_ORDER,
            orderData :{
                id:resData.name,
                items:cartItems,
                amount:totalAmount,
                date: dates
            }
        })
        


        
    };
};