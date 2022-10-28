import { useState } from "react";
import { set, useForm } from "react-hook-form";
import Button from "../Button/Button";
import { Input, Select } from "../Field/Field";
import axios from "axios";
import { useEffect } from "react";

const Form = () => {
    const [isHovering, setIsHovering ] = useState(false);
    const {register, handleSubmit, reset } = useForm();
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

    const countries = dataCountries.map(item => item.name_ptbr).sort()
    const cities = dataCities.map(item => item.name_ptbr).filter((onlyCities) => onlyCities).sort() // remove nulls

    const handleMouseLeave = () => {
        setIsHovering(false);
    }

    const handleMouseEnter = () => {
        setIsHovering(true);
    }

        const onSubmit = (event) => {
            console.log(event);
               
        }

 
    const column = {
        display: "flex",
        flexDirection: "column",
        border: "3px solid turquoise", 
        borderRadius: 20,
        padding: 65,
        marginRight: 30
    }

    return (

        <form onSubmit={handleSubmit(onSubmit) }>

            <div style={{display: "flex"}}>
                    <div style={column}>
                            <h2 style={{fontSize: 35, marginBottom: 30, letterSpacing:-2, color: "turquoise"}}>{`Suas Informações :)`}</h2>

                            <Input 
                                type={"text"} 
                                placeholder="Nome completo"             
                                required 
                                maxLength={50}
                                {...register('name')}
                            />  

                            <Input 
                                type={"email"} 
                                placeholder="Email"  
                                required 
                                maxLength={50}
                                {...register('email')}

                            />
                            <Input 
                                type={"text"} 
                                placeholder="Telefone"
                                maxLength={30}
                                {...register('phone')}
                                required

                            />

                            <Input 
                                type={"text"} 
                                placeholder="CPF"
                                maxLength={30}
                                {...register('cpf')}
                                required

                            />
                    </div>

                    <div style={column}>
                            <h2 style={{fontSize: 35, marginBottom: 30, letterSpacing:-2, color: "turquoise"}}>{`Quais são seus destinos de interesse? :)`}</h2>

                            <Select 
                                type={"text"} 
                                placeholder="País"             
                                required 
                                maxLength={50}
                                {...register('pais')}
                            > 
                                {countries.map((item, key) => <option key={key}>{item}</option>)}
                            
                            </Select>  

                            <Select 
                                type={"text"} 
                                placeholder="Cidade"  
                                required 
                                maxLength={50}
                                {...register('cidade')}
                            >
                                {cities.map((item,key) => <option key={key}>{item}</option>)}

                            </Select>
                    </div> 
            
            </div>   
            <Button 
                text={'Enviar email'} 
                style={{
                    display:"flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 260,
                    height: 65,
                    backgroundColor: "white",
                    borderRadius: "15px",
                    boxShadow: isHovering? "0px 5px 20px black": "",                                     
                    cursor: "pointer"
                }}
                styleH1={{
                    color: "#101935",
                    fontWeight: "normal", 
                    fontSize: 25, 
                    letterSpacing: -2,}}

                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
                
            />
                
        </form>
        
    )
    
}

export default Form