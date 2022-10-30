import "../Form/styleForm.css"

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Select from "react-select";
import { TextField } from "@mui/material";
import makeAnimated from "react-select/animated";
import { Button, Grid } from "@mui/material";
import MaskedInput from "../Inputs/MaskedInput"



const animatedComponents = makeAnimated();

const phoneRegExp = "^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$"

/*const validationForm = yup.object().shape({
    name: yup.string().max(50).required(),
    email: yup.string().email().required() ,
    phone: yup.string().required(),
    cpf: yup.string().required() 
})*/




const styles = {
    control: (styles) => ({...styles, 
        marginBottom: 20, 
        width: 500,
        "@media (min-width: 320px) and (max-width: 767px)": {
            width: 320
            
        },
        "@media (min-width: 768px) and (max-width: 1024px)": { 
            width: 630
        },
        "@media (min-width: 912px) and (max-width: 1024px)": {
            width: 775,
            height: 50
        },
        "@media (min-width: 1024px) and (max-width: 1366px)": {
            width: 400,
            height: 50
        },
        "@media (min-width: 1377px)": {
            width: 500,
            height: 50
        },
    
    }),
    multiValue: (styles) => {
        return {
            ...styles,
            backgroundColor: "#9e9eff3d",
            borderRadius: 5,
            fontSize: 18,
            color: "#0000ff76",
            ':hover': {
                color: "#0000ff"
            },
                     
        }
    },
    multiValueLabel: (styles) => {
        return {
            ...styles,
            color: "#0000ff",
            
        }
    },
    multiValueRemove: (styles) => {
        return {
            ...styles,
            cursor: "pointer",
            ':hover': {
                color: "none"
            }
        }
    }

}
const Form = () => {    
    const {handleSubmit, reset, register, control } = useForm()
    
    const [dataCountries, setDataCountries] = useState([]);
    const [dataCities, setDataCities] = useState([]);


    useEffect(() => {
            axios.get("https://amazon-api.sellead.com/country")
            .then((response) => {

                setDataCountries(response.data)
            })
            .catch(() => {
                console.log("deu errado")
            })

            axios.get("https://amazon-api.sellead.com/city")
            .then((response) => {

                setDataCities(response.data)
            })
            .catch(() => {  
                console.log("deu errado")
                
            })
                  
        },[])      


    const countries = dataCountries.map(item => item.name_ptbr).sort();

    const citiesWithComplement = dataCities.map(item => item.name_ptbr).filter((onlyCities) => onlyCities).sort() // remove nulls
    const onlyCities = (citiesWithComplement.map(item => item.split(",")[0])).map(item => item.split("-")[0])
    const citiesNoRep= [...new Set(onlyCities)]

        const onSubmit = (values) => {

            const {name, email, phone, cpf, countries, cities } = values

            console.log(values)

            reset();   

        }

    return (
             
        <form id="form" onSubmit={handleSubmit(onSubmit)}>

            <div id="main">

                    <div id="firstBorderForm">

                            <h2 id="titleStyle">{`Suas Informações`}</h2>

                            <TextField 
                                id="TextField"
                                type={"text"}             
                                {...register("name")}
                                label="Nome Completo"
                                variant="outlined"
                                style={{marginBottom: 15}}                       
                            /> 

                            <TextField 
                                id="TextField"
                                type={"email"}   
                                {...register("email")}
                                label="Email"
                                variant="outlined"   
                                style={{marginBottom:15}}
                            />

                        
                            <Controller 
                                name="phone"
                                defaultValue=""
                                control={control}
                                render={({ field }) => (
                                    <MaskedInput
                                        id={"TextField"}
                                        innerRef={{...field}}
                                        type={"tel"}
                                        mask={"(99) 99999-9999"}
                                        value={field.phone}
                                        onChange={field.onChange}
                                        label={"Telefone"}  
                                        style={{marginBottom: 15}}
                                    />
                                )}    
                            />
                            
                            <Controller
                                name="cpf"
                                defaultValue=""
                                control={control}
                                render={({ field }) => (
                                    <MaskedInput
                                        id={"TextField"}
                                        innerRef={{...field}}
                                        type={"cpf"}
                                        mask={"999.999.999-99"}
                                        value={field.cpf}
                                        onChange={field.onChange}
                                        label={"CPF"}
                                    />
                                )}    
                            />
                      
         
                    </div>

                    <div id="secondBorderForm">

                            <h2 id="titleStyle">{`Quais são seus destinos de interesse? :)`}</h2>
                            
                            <Controller 
                                name="countries"
                                control={control} 
                                defaultValue=""
                                render={({ field }) => (
                                    <Select 
                                        {...field}
                                        id="Select"
                                        styles={styles}
                                        components = {animatedComponents}
                                        placeholder="Selecione os Países"
                                        isMulti
                                        options={countries.map(item => {
                                            return {
                                                value: item,
                                                label: item
                                            }   
                                        })}
                                    
                                    /> 
                                )} 
                            />
                                
                            <Controller
                                name="cities"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (                                    
                                    <Select  
                                        {...field}
                                        id="Select"                                          
                                        styles={styles}
                                        components = {animatedComponents}
                                        placeholder="Selecione as Cidades"
                                        isMulti 
                                        options={citiesNoRep.map(item => {
                                            return {
                                                value: item,
                                                label: item
                                            }
                                        })}
                                    />  
                                )}
                            />



                            <Button 
                                id="buttonSubmit"
                                text={'Enviar email'} 
                                variant="contained"
                                size="large"
                                color="primary"
                                type="submit"   
                            >
                            
                                Enviar

                            </Button>

                    </div> 


            </div>   

            
                
        </form>
        
    )
    
}

export default Form