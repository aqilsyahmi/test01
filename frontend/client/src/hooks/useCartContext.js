import { CartContext } from'../components/CartContext'
import { useContext } from 'react'

//everytime we use cart statue, use this method to get context back
export const useCartContext = ()=>{
    const context = useContext(CartContext)
    
    if (!context){
        throw Error('useCartContext must be used inside an CartContextProvider')
    }
    return context
}

