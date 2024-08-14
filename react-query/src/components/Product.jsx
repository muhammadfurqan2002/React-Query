import { useQuery,useMutation } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'



function Product() {

    const params = useParams()

    // mutations
    const mutation = useMutation({
        mutationFn: (newProduct) => {
          return axios.put(`https://dummyjson.com/products/${params.productId}`, newProduct)
        },
      })



    const fetchData = async () => {
        const response = await fetch(`https://dummyjson.com/products/${params.productId}`)
        const data = await response.json()
        console.log(data)
        return data
    }


    const { isLoading: loading, error, data: product } = useQuery({
        queryKey: ['product', params.productId],
        queryFn: fetchData,
        // staleTime:10000
    })

    if (loading) {
        return <h3>Loading.........................</h3>
    }

    if (error) {
        return <h3>Error: {error.message}</h3>
    }


    if(mutation.isLoading){
        return <h1>Updating....</h1>
    }

    if(mutation.isError){
        return <h1>Error While Updating...</h1>
    }

    return (
        <div>
            <h1>Product: {product.title}</h1>
            <h1>Product: {product.id}</h1>
            <button onClick={()=>mutation.mutate({title:"updated product"})}>update</button>
        </div>
    )
}

export default Product
