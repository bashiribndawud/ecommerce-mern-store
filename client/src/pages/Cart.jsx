import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import { useCartContext } from "../context/CartContext";
import { SERVER_URL } from "../utils/constants.js";
import Table from "../components/Table";
import Input from "../components/Input";
import axios from "axios";

const MainWrapper = styled.div`
  padding: 3rem 7%;
`;
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.3fr 0.7fr;
  }
  gap: 40px;
  margin-top: 5rem;
`;

const GridBox = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 3px 7px 30px rgba(0, 0, 0, 0.1);
`;

const ProductInfoCell = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductImageBox = styled.div`
  width: 150px;
  height: 150px;
  padding: 10px;
  margin-bottom: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 150px;
    max-height: 150px;
  }
`;

const QuantityBtn = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  margin: 0 5px;
`;

const AddressDiv = styled.div`
  display: flex;
  gap: 5px;
`;

const SucessWrapper = styled.div`
  margin-top: 3rem;
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  height: 12rem;
  width: 30rem;
  text-align: center;
  box-shadow: 3px 7px 30px rgba(0, 0, 0, 0.1);
`;

const Cart = () => {
  let { pathname } = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const { cartProducts, addProduct, removeProduct, clearCartItems } =
    useCartContext();
  const [products, setProducts] = useState([]);
  const getCartProduct = async () => {
    const { data, status } = await axios.post(
      "http://localhost:8000/product/store/cartitems",
      { productIds: cartProducts },
      { headers: { "Content-Type": "application/json" } }
    );
    setProducts(data);
  };
  useEffect(() => {
    getCartProduct();

    return () => {};
  }, [cartProducts]);

  function incrementQuantity(id) {
    addProduct(id);
  }
  function decrementQuantity(id) {
    removeProduct(id);
  }
  let totalPrice = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    totalPrice += parseInt(price);
  }
  async function handlePayment(e) {
    e.preventDefault();
    const { data, status } = await axios.post(
      "/product/checkout",
      { name, email, city, postalCode, address, country, cartProducts },
      { headers: { "Content-Type": "application/json" } }
    );

    if(data.url){
      window.location = data.url;
      clearCartItems()
    }
  }

  if(window.location.href.includes('success')){
    return (
      <>
        <Header />
        <MainWrapper>
          <SucessWrapper>
            <h1>Thanks for your order!</h1>
            <p>We will send you an email when order is sent.</p>
          </SucessWrapper>
        </MainWrapper>
      </>
    )
  }
  return (
    <div>
      <Header />
      <MainWrapper>
        <ColumnsWrapper>
          <GridBox>
            {cartProducts?.length === 0 && <span>Cart is empty</span>}
            {products?.length > 0 && (
              <>
                <h2>Carts</h2>
                <Table>
                  <thead>
                    <tr>
                      <td>Product Name</td>
                      <td>Quantity</td>
                      <td>Price</td>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((prod) => (
                      <tr>
                        <ProductInfoCell>
                          <ProductImageBox>
                            <img
                              src={prod.images[0]}
                              alt="No Image"
                            />
                          </ProductImageBox>
                          {prod.name}
                        </ProductInfoCell>
                        <td>
                          <QuantityBtn
                            onClick={() => incrementQuantity(prod._id)}
                          >
                            +
                          </QuantityBtn>
                          {cartProducts.filter((id) => id === prod._id).length}
                          <QuantityBtn
                            onClick={() => decrementQuantity(prod._id)}
                          >
                            -
                          </QuantityBtn>
                        </td>
                        <td>
                          $
                          {cartProducts.filter((id) => id === prod._id).length *
                            prod.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <p style={{ textAlign: "right" }}>Total: ${totalPrice}</p>
                </Table>
              </>
            )}
          </GridBox>
          {cartProducts.length > 0 ? (
            <GridBox>
              <h3>Order Information</h3>
              <form onSubmit={handlePayment}>
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <AddressDiv>
                  <Input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <Input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </AddressDiv>
                <Input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.address)}
                />
                <Input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <Button block size={"l"} primary type="submit">
                  Continue to payment
                </Button>
              </form>
            </GridBox>
          ) : (
            ""
          )}
        </ColumnsWrapper>
      </MainWrapper>
    </div>
  );
};

export default Cart;
