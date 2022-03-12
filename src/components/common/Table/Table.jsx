import React from 'react';
import { Link } from "react-router-dom";
import {
    Tables, TableTh, TableTd,
    IconDelete, IconEdit, LinkIcon
  } from './styled';

  const Table = ({ data }) =>{
    const keys = Object.keys(data[0]);
    return(
      <Tables>
                <thead>
                  <tr>
                    {keys.map((item, index) => (
                      <TableTh key={index}>{item}</TableTh>
                    ))}
                  </tr>
                </thead>
              <tbody>
                {data.map((obj, index) => (
                  <tr>
                    {keys.map((item, index) => {
                      const value = obj[item]
                      return(
                        <TableTd>{value}</TableTd>)
                    })}
                      <tr>
                      <TableTd>
                        <Link to="login"><IconDelete></IconDelete></Link>
                        <Link to="login"><IconEdit></IconEdit></Link>
                      </TableTd>
                      </tr>
                  </tr>
                ))}
              </tbody>
            </Tables>
    );
  };

export default Table;