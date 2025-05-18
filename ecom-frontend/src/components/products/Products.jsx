import { FaExclamationTriangle } from "react-icons/fa";
import ProductCard from "../shared/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories, fetchProducts } from "../../store/actions";
import Filter from "./Filter";
import useProductFilter from "../../hooks/useProductFilter";
import Loader from "../shared/Loader";
import Paginations from "../shared/Paginations";

const Products = () => {
    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    );

    // Flow:
    // Component → Calls dispatch with an action.
    // Store → Passes the action to the reducer.
    // Reducer → Updates the state based on the action type.
    // Component → Reads updated state using useSelector.
    
    const {products, categories, pagination} = useSelector(
        (state) => state.products
    )
    console.log('products: ',products)
    const dispatch = useDispatch();

    // custom hook to apply product filters
    useProductFilter();

    
    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchProducts(""));
    }, [dispatch]);

    return (
        <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
            {/* Filter */}
            <Filter categories={categories ? categories : []}/>
            {isLoading ? (
                // loading
                <Loader />  

                // errors
            ) : errorMessage ? (
                <div className="flex justify-center items-center h-[200px]">
                    <FaExclamationTriangle className="text-slate-800 text-3xl mr-2"/>
                    <span className="text-slate-800 text-lg font-medium">
                        {errorMessage}
                    </span>
                </div>
                // products
            ) : (
                <div className="min-h-[700px]">
                    <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                       {products && 
                        products.map((item, i) => <ProductCard key={i} {...item} />
                        )}
                    </div>
                    <div className="flex justify-center pt-10">
                        <Paginations 
                            numberOfPage = {pagination?.totalPages}
                            totalProducts = {pagination?.totalElements}/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Products;