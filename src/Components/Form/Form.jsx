import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Select from "react-select";
import { TextField } from "@mui/material";
import makeAnimated from "react-select/animated";
import { Button } from "@mui/material";
import MaskedInput from "../Inputs/MaskedInput"




const animatedComponents = makeAnimated();

const phoneRegExp = "^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$"

/*const validationForm = yup.object().shape({
    name: yup.string().max(50).required(),
    email: yup.string().email().required() ,
    phone: yup.string().required(),
    cpf: yup.string().required() 
})*/

const borderForm = {
    display: "flex",
    flexDirection: "column",
    border: "3px solid #0000ff67", 
    borderRadius: 20,
    padding: 65,
    marginRight: 30,
}

const titleStyle = {
    fontSize: 35, 
    marginBottom: 30, 
    letterSpacing:-4, 
    color: "#0000ffba",
    fontWeight: "normal"
}
const styles = {
    control: (styles) => ({...styles, marginBottom: 20, width: 500}),
    multiValue: (styles) => {
        return {
            ...styles,
            backgroundColor: "#9e9eff3d",
            borderRadius: 5,
            fontSize: 20,
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

    const [maskValues, setMaskValues] = useState("");


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
            console.log(name, email, phone, cpf, countries, cities);
            reset();   
        }

    return (

        <form onSubmit={handleSubmit(onSubmit) }>

            <div style={{display: "flex"}}>

                    <div style={borderForm}>

                            <h2 style={titleStyle}>{`Suas Informações`}</h2>

                            <TextField 
                                type={"text"}             
                                {...register("name")}
                                label="Nome Completo"
                                variant="outlined"
                                id="outlined-size-normal"
                                style={{
                                    marginBottom: 15,
                                    width: 300
                                }}                          
                            />  

                            <TextField 
                                type={"email"}   
                                {...register("email")}
                                label="Email"
                                variant="outlined"
                                id="outlined-size-normal"
                                size="large"
                                style={{
                                    marginBottom: 15
                                }} 
                            />

                            <MaskedInput
                                type={"tel"}
                                mask={"(99) 99999-9999"}
                                value={maskValues}
                                onChange={(event) => setMaskValues(event.target.value)}
                                label={"Telefone"}  
                                style={{marginBottom: 15}}
                            />

                            <MaskedInput
                                type={"cpf"}
                                mask={"999.999.999-99"}
                                value={maskValues}
                                onChange={(event) => setMaskValues(event.target.value)}
                                label={"CPF"}  
                            />
                      
         
                    </div>

                    <div style={borderForm}>

                            <h2 style={titleStyle}>{`Quais são seus destinos de interesse? :)`}</h2>
                            
                            <Controller 
                                name="countries"
                                control={control} 
                                defaultValue=""
                                render={({ field }) => (

                                        <Select 
                                            {...field}
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
                                style={{width: 150, height: 45, fontSize: 17, position: "relative", bottom: -100}}
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