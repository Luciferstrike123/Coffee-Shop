import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import ShopItem from "../../components/ShopItem";
import { useToastState } from "../../Recoil/Error/useToastState";
import { useCartState } from "../../Recoil/Cart/useCartState";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLoadingState } from "../../Recoil/Loading/useLoadingState";

function Shop() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const { cartProducts, setCartProducts } = useCartState();
    const { setToastMsg } = useToastState();
    const { setIsLoading } = useLoadingState();

    useEffect(() => {
        fetchProducts();
        getCart();
    }, []);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            setProducts(response.data);
        } catch (error) {
            setToastMsg({ isError: true, message: "Failed to fetch products" });
        } finally {
            setIsLoading(false);
        }
    };

    const getCart = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://fakestoreapi.com/carts');
            const allCarts = response.data;
            
            // Combine products from all carts
            const allCartProducts = allCarts.flatMap(cart => cart.products);
            
            // Merge quantities for duplicate products
            const mergedCart = allCartProducts.reduce((acc, product) => {
                const existingProduct = acc.find(p => p.productId === product.productId);
                if (existingProduct) {
                    existingProduct.quantity += product.quantity;
                } else {
                    acc.push(product);
                }
                return acc;
            }, []);

            setCartProducts(mergedCart);
        } catch (error) {
            console.error("Failed to fetch cart:", error);
            setToastMsg({ isError: true, message: "Failed to fetch cart" });
            setCartProducts([]); // Set to empty array in case of error
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="h-full py-8 px-2 md:px-8 flex gap-4 md:gap-6 flex-wrap justify-center">
                {products.map((product) => {
                    const cartItem = cartProducts && cartProducts.find(item => item.productId === product.id);
                    return (
                        <ShopItem
                            key={product.id}
                            img={product.image}
                            name={product.title}
                            price={product.price}
                            quantity={cartItem ? cartItem.quantity : ""}
                            isInCart={!!cartItem}
                            className="h-60 w-40 md:h-80 md:w-64"
                        />
                    );
                })}
            </div>
        </MainLayout>
    );
}

export default Shop;