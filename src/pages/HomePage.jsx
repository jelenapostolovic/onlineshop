import React, { useEffect, useState } from 'react'
import ProductService from '../services/ProductService'
import { useDispatch, useSelector } from 'react-redux'
import { saveAllProductsAction } from '../store/productSlice';
import CardComponent from '../components/CardComponent';
import { BsGrid } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";


function HomePage() {

  const [isGrid, setIsGrid] = useState('gridView');
  const [limitProducts,setLimitProducts] = useState(10);
  const dispatch = useDispatch();
  const{allProducts, isLoading, selectCategory, searchProduct} = useSelector((state) => state.productStore)

  // useEffect(()=> {
  //   ProductService.getAllProductsService()
  //   .then((res)=> {
  //     dispatch(saveAllProductsAction(res.data.products))
  //   })
  //   .catch((err)=>console.log(err))
  // }, [])

  useEffect(() => {
    if(searchProduct){
    ProductService.getSearchProducts(searchProduct)
    .then((res) => dispatch(saveAllProductsAction(res.data.products)))
    .catch(err => console.log(err))
  }
}, [searchProduct])

  useEffect(()=> {
    if(selectCategory) {
    ProductService.getAllProductsByCategory(selectCategory)
    .then((res)=> {
      dispatch(saveAllProductsAction(res.data.products))
    })
    .catch((err)=>console.log(err))
  } else{
         ProductService.getAllProductsService(limitProducts)
          .then((res)=> {
            dispatch(saveAllProductsAction(res.data.products))
          })
          .catch((err)=>console.log(err))
        }
  }, [selectCategory, limitProducts]);

  return (
    <div className='container mx-auto'>
      <div className='flex items-center gap-[20px] py-[20px] justify-end'>
        <FaListUl size={28} onClick={() => setIsGrid('listView')} className={isGrid === 'listView' ? 'bg-mainYellow p-[2px] rounded-lg' : ''}/>
        <BsGrid size={28} onClick={() => setIsGrid('gridView')} className={isGrid === 'gridView' ? 'bg-mainYellow p-[2px] rounded-lg' : ''}/>
      </div>
      {isLoading ? (
        <div className={isGrid === 'gridView' ? 'flex flex-wrap items-center justify-center gap-[10px]'
          : 'flex flex-col items-center justify-center gap-[10px'}>
      {allProducts.map((product)=> {
        return <CardComponent key={product.id} product={product} isGrid={isGrid} setIsGrid={setIsGrid}/>
      })}
    </div> ): ( 
      <div>Loading..</div> 
    )}
    {!selectCategory && 
    <div className='flex items-center justify-center py-[50px]'>
        <button className='bg-mainBlue text-textWhite px-[16px] py-[8px] rounded-lg my-[20px]
         hover:bg-mainYellow transition-all duration-300'
         onClick={() => setLimitProducts(limitProducts +10)}>View More Products</button>
    </div>
}
    </div>
  )
}

export default HomePage