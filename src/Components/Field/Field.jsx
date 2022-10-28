import styled from "styled-components";

export const Input = styled.input`
    
    width: 480px;
    height: 45px;
    border-radius: 15px;
    background-color: #40e0d037;
    padding-left: 25px;
    color: #0b645b;
    font-size: 20px;
    font-weight: normal;
    letter-spacing: -1px;
    border: none;
    margin-bottom: 20px;
    
    ::-webkit-input-placeholder {
        color: #0b645b;
    }
`

export const Select = styled.select`
    width: 480px;
    height: 45px;
    border-radius: 15px;
    background-color: #40e0d037;
    padding-left: 25px;
    color: #0b645b;
    font-size: 20px;
    font-weight: normal;
    letter-spacing: -1px;
    border: none;
    margin-bottom: 20px;
    ::-webkit-select-placeholder {
        color: #0b645b;
    }
`
