import React, { useEffect } from "react";
import Layout from "./Layout";
import FormEditProduk from "../components/FormEditProduk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const EditProduk = () => {
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
  }, [isError, dispatch, navigate]);

  return (
    <Layout>
      <FormEditProduk />
    </Layout>
  );
};

export default EditProduk;
