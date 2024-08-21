import React, { useEffect } from "react";
import Layout from "./Layout";
import ProdukList from "../components/ProdukList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Produk = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, dispatch]);

  return (
    <Layout>
      <ProdukList />
    </Layout>
  );
};

export default Produk;
