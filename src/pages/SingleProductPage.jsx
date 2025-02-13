import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import ProductService from '../services/ProductService';
import { Rating } from '@mui/material';
import { FaCheck } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaShippingFast } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { saveInCartAction } from '../store/cartSlice';
import { updateFavoriteAction } from '../store/favoriteSlice';

function SingleProductPage() {
  const [singleProduct, setSingleProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [countProduct, setCountProduct] = useState(1);
  const [favoriteIdIcon, setFavoriteIdIcon] = useState(null);
  const {allFavorite} = useSelector((state) => state.favoriteStore);
  const dispatch = useDispatch();
  let {id} = useParams();


  useEffect(() => {
    ProductService.getSingleProduct(id)
    .then((res) => {
      setSingleProduct(res.data);
      setIsLoading(true);
    })
    .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if(allFavorite.length >0){
      allFavorite.find((item) => {
        if(item.id === singleProduct.id){
          setFavoriteIdIcon(item.id);
          return;
        }
      })
  
  }else {
    setFavoriteIdIcon(null);
  }
}, [allFavorite]);

  function handleImage(index) {
    setCurrentImage(index);
  }

  //fja koja prosledjuje single product u cart na klik
  function handleProductCart() {
      dispatch(saveInCartAction(singleProduct))
  }
   
  return (
    <div className="px-[20px]">
      {isLoading ? (
        <div className="container mx-auto flex flex-col lg:flex-row gap-[40px] lg:gap-[20px]">
          {/* Leva strana - Slike */}
          <div className="w-full lg:w-[50%] flex flex-col items-center">
            {/* Glavna slika */}
            <img src={singleProduct.images[currentImage]} alt="Product" className='max-h-[400px]' />
            {/* Thumbnails */}
            <div className="flex items-center justify-center gap-[20px]">
              {singleProduct.images.map((el, index) => (
                <img
                  src={el}
                  alt={`Thumbnail ${index}`}
                  key={index}
                  className={
                    currentImage === index
                      ? 'w-[100px] h-[100px] border border-mainBlue p-[10px] rounded-lg'
                      : 'w-[100px] h-[100px] border border-grayColor p-[10px] rounded-lg cursor-pointer'
                  }
                  onClick={() => handleImage(index)}
                />
              ))}
            </div>
          </div>
  
          {/* Desna strana - Detalji proizvoda */}
          <div className="w-full lg:w-[50%] flex flex-col gap-[10px]">
            <h2 className="text-mainBlue text-[36px]">{singleProduct.title}</h2>
            <h5 className="font-semiBold text-[20px]">${singleProduct.price}</h5>
            <Rating value={singleProduct.rating} readOnly size="large" />
  
            {/* Stanje zaliha */}
            <div className="flex items-center gap-[10px]">
              <span className='text-gray-500'>Availability: </span>
              {singleProduct.stock > 0 ? (
                <h3 className="flex items-center text-textGreen gap-[5px] font-semiBold">
                  <FaCheck size={24}/> In Stock
                </h3>
              ) : (
                <h3  className="flex items-center text-[#FF0000] gap-[5px] font-semiBold">
                  <RxCross1 size={24} /> Out Of Stock
                </h3>
              )}
            </div>
            <p className='text-grayColor' >
              Hurry up! only{' '}
              <span className="font-extrabold text-mainBlue">{singleProduct.stock}</span> product
              left in stock!
            </p>
  
            {/* Oznake */}
            <div className='flex items-center gap-[20px]'>
              <p className='text-gray-500'>Tags:</p>
              <ul className='flex items-center gap-[10px]' >
                {singleProduct.tags.map((tag, index) => {
                 return <li key={index} className='bg-lightGray px-[8px] py-[4px] rounded-lg text-gray-500'>#{tag}</li>
})}
              </ul>
            </div>
  
            {/* Količina */}
            <div  className='flex items-center gap-[20px]'>
              <p className='text-gray-500'>Quantity:</p>
              <div className='flex items-center'>
                <button className='bg-lightGray text-gray-500 px-[10px] py-[4px] border border-gray-500'>-</button>
                <span className='bg-lightGray text-gray-500 px-[20px] py-[4px] border border-gray-500'>{countProduct}</span>
                <button className='bg-lightGray text-gray-500 px-[10px] py-[4px] border border-gray-500'>+</button>
              </div>
              
            </div>
  
            {/* Dodavanje u korpu */}
            <div className="flex items-center mt-[30px] gap-[20px]">
              <Link to={'/cart'} className='bg-mainYellow text-textWhite
               px-[26px] py-[12px] rounded-lg' onClick={handleProductCart}>Add To Cart</Link>
              <div className='bg-[#EEE] p-[10px] rounded-full'>
                {favoriteIdIcon === parseInt(id) ? <IoIosHeartEmpty color='red' 
                size={30} onClick={() => dispatch(updateFavoriteAction(singleProduct))}/>
                 : <IoIosHeartEmpty size={30} 
                 onClick={() => dispatch(updateFavoriteAction(singleProduct))}/> }
              </div>
            </div>
            <hr className='my-[20px]'/>
            <div className='flex items-center gap-[20px]'>
              <FaShippingFast size={26}/>
              <span className='text-grayColor'>{singleProduct.shippingInformation}</span>
            </div>

            <p className=' flex items-center font-semiBold text-gray-500'>{singleProduct.returnPolicy}</p>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
  

export default SingleProductPage