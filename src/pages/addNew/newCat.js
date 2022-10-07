import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { categoriesRequested } from "../../actions/categoriesAction";
import { toast } from "react-toastify";
import Datatable from "../../components/datatable/Datatable"
import { Container, Section } from '../../styles/globalStyles';
//import { connect, useSelector } from "react-redux";
import {
    NewCatTitle
  } from "./styles";
function NewCategory({ inputs, title }) {
    const dispatch = useDispatch();

    return (
        <Section smPadding="50px 10px" inverse id="dataTable">
            <Container>
            <NewCatTitle>
                {title}
            </NewCatTitle>
            </Container>
        </Section>
    );
}


export default NewCategory;
