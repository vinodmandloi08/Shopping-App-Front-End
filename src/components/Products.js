import React, { useEffect, useState } from 'react'

const Products = ({setCartItems, cartItems}) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:8765/api/v1/products/all-products');
      const res = await response.json();
      console.log(res);
      let temp = [];
      await res.forEach(element => {
        element = {...element,purchaseQuantity:1}
        temp.push(element);
      });
      setData(temp);
    }
    fetchData();
  }, [])

  const handleAddCartItems = (product) => {
    setCartItems([...cartItems,product])
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {data.map((product, index) => {
            return <div className="w-full p-4 border border-black cursor-pointer lg:w-1/4 md:w-1/2" key={index}>
              <p className="relative block h-48 overflow-hidden rounded">
                <img alt="product" className="block object-cover object-center w-full h-full" src={`data:image/png;base64,${product?.image}`} />
              </p>
              <div className="mt-4">
                <h3 className="mb-1 text-xs tracking-widest text-gray-500 title-font">CATEGORY</h3>
                <h2 className="text-lg font-medium text-gray-900 title-font">{product?.productName}</h2>
                <p className="mt-1">${product?.unitPrice}</p>
                <button className="flex px-6 py-2 ml-auto text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600" onClick={()=>handleAddCartItems(product)}>Add To Cart</button>
              </div>
            </div>
          }
          )}
        </div>
      </div>
    </section>
  )
}

export default Products