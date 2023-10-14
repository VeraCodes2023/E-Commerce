import React,{ useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import {Grid} from "@mui/material";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';

import { 
  getCategoryProducts, 
  getFilteredProducts,
  sortProductsbyPrice,
}from '../redux/reducers/productsSlice';
import {fetchAllProducts,fetchCategoryProducts} from '../redux/asyncThunk/productsAsync';
import {useAppSelector} from '../redux/hooks/useAppSelector';
import {useAppDisPatch} from '../redux/hooks/useAppDispatch';
import Search from '../component/Search';
import  useDebounce from '../redux/hooks/useDebounce';
import ProductGrid from '../component/ProductGrid';

const HomePage:React.FC= () => {
  
    const dispatch = useAppDisPatch();
    const {
      products, 
      categoryProducts, 
      filteredProducts, 
      loading,
      error
    }=useAppSelector(state=>state.productReducer);
    const [searchValue,setSearchValue]=useState<string>("")
    const debouncedSearchValue:string=useDebounce(searchValue,550)
    const [value, setValue] = useState<string>("1");
  // pagination
    const [page, setPage] = useState<number>(1);

    const itemsPerPage =21
    const pageCount = Math.ceil(categoryProducts.length / itemsPerPage);
    const pageSearchCount= Math.ceil(filteredProducts.length / itemsPerPage);
    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
      setPage(newPage)
    };
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  // retrieve all of the products
    useEffect(()=>{
      dispatch(fetchAllProducts({offset:0, limit:220}))
    },[dispatch])
  //  handle sort out products
    const handleAscOrder=()=>{
      dispatch(sortProductsbyPrice("asc"))
    }
    const handleDeceOrder=()=>{
      dispatch(sortProductsbyPrice("desc"))
    }
    useEffect(()=>{
      dispatch(fetchCategoryProducts())
    },[dispatch])

// the category nav part needs to loop the name of category 
    const cateList:string[] = products.map(p=>p.category.name)
    const cateIDs:number[] = products.map(p=>p.category.id)
    const uniqueCateNameList:string[] = [...new Set(cateList)];
    const uniqueIDList = [...new Set(cateIDs)];
    const OrderedCateList:string[] = [];
    uniqueIDList.forEach((id, index) => {OrderedCateList[id-1] = uniqueCateNameList[index]});

  // tabbed category name change
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
  // get filteredProducts via searching
    useEffect(()=>{
      dispatch(getFilteredProducts(debouncedSearchValue))
      // resetProductsState()
    },[debouncedSearchValue,dispatch])
  // get category products
    useEffect(()=>{
      dispatch(getCategoryProducts(Number(value)))
   
    },[products,value,dispatch])

  return (
    <main id="homepage">
      <div className='search-page'>
        {error && <p>Something went wrong, please try again...</p>}
        {loading && <p>loading</p>}
        <Search searchValue={searchValue} setSearchValue={setSearchValue} /> 
        <div className='pagination'>
            {
              (debouncedSearchValue && filteredProducts)?
                <Pagination
                  count={pageSearchCount}
                  page={page}
                  onChange={handleChangePage}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                  className='page' 
                />
                :
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={handleChangePage}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                  className='page' 
              />
            }
            <div className="orderBtns">
                <button onClick={handleAscOrder}>Price Ascending</button>
                <button onClick={handleDeceOrder}>Price Descending</button>
            </div>
        </div>
      </div>
      <Box sx={{ width: '80%', typography: 'body1',  margin:"auto"}}>
         <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              {
                  OrderedCateList && OrderedCateList.map((p,index)=>
                  <Tab label={p} value={(index+1).toString()} key={index} />
                )}
            </TabList>
          </Box>
          <Grid container 
              width="100%"
              className="container">
            {
                debouncedSearchValue? (
                filteredProducts.length <1 ? <p>No results found, please try again...</p>
                :
                filteredProducts.slice(startIndex, endIndex)
                .map( p=><ProductGrid key={p.id}  p={p} value={value} />) )
                :categoryProducts.slice(startIndex, endIndex)
                .map(p=><ProductGrid key={p.id}  p={p} value={value} />)
            } 
          </Grid>
         </TabContext>
      </Box>
    </main>
  )
}
export default HomePage