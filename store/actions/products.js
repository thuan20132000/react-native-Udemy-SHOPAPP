export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';

import Product from '../../models/product';



export const fetchProducts = () =>{
    return async (dispatch,getState) =>{
        const userId = getState().auth.userId;
        try{
            const response = await fetch(
                'https://shopp-app-dfc15.firebaseio.com/products.json'
            );

            if(!response.ok){
                throw new Error("Something went wrong");
            }
            
            const resData = await response.json();
            const loadedProducts = [];
            for(const key in resData){
                loadedProducts.push(
                    new Product(key,
                    resData[key].ownerId,
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price
                    )
                );    
            }
            dispatch({
                type:SET_PRODUCT,
                products:loadedProducts,
                userProducts:loadedProducts.filter(prod => prod.ownerId === userId)});
        }catch(err){
             //send to custom analytics server
            throw err;
        }
        

    }
}



export const  deleteProduct = productId =>{

    return async (dispatch,getState) =>{
        const token = getState().auth.token;

            const response = await fetch(`https://shopp-app-dfc15.firebaseio.com/products/${productId}.json?auth=${token}`,
                {
                    method:'DELETE',
                }
            );
            if(!response.ok){
                throw new Error('somwthing went wrong');
            }
            dispatch({type:DELETE_PRODUCT,prodId:productId})
    };
};

export const createProduct = (title,description,imageUrl,price)=>{
    return async  (dispatch,getState) =>{
        const userId = getState().auth.userId;
        const token = getState().auth.token;
        price = +price;
        //any async code you want!
      const response =  await fetch(`https://shopp-app-dfc15.firebaseio.com/products.json?auth=${token}`,
            {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title,
                description,
                imageUrl,
                price,
                ownerId:userId
            })
        });

        if(!response.ok){
            throw new Error('Something went wrong');
        }
        const resData = await response.json();
       
        dispatch({
            type:CREATE_PRODUCT,
            productData :{
                id:resData.name,
                ownerId: userId,
                title,
                description,
                imageUrl,
                price
            }
        })
    }
}

export const updateProduct = (id,title,description,imageUrl,price)=>{
    return async (dispatch,getState) => {
        
        const token = getState().auth.token;
        const response = await fetch(`https://shopp-app-dfc15.firebaseio.com/products/${id}.json?auth=${token}`,
        {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        });
        const resData = await response.json();
        dispatch({
            type:UPDATE_PRODUCT,
            prodId:id,
            productData :{
                title,
                description,
                imageUrl,
                price
            }
        })
        
    }
}