import "../Form/styleForm.css"
import {
    useState,
    useForm,
    Controller,
    useEffect,
    axios,
    yup,
    yupResolver,
    Select,
    TextField,
    Button,
    MaskedInput,
    makeAnimated,
    destiny,
    selectStyle,

} from "../../Imports/Imports"

const animatedComponents = makeAnimated();

const validationForm = yup.object().shape({
    name: yup.string().required().max(50),
    email: yup.string().required().max(50).email(),
    phone: yup.string(),
    cpf: yup.string(),   
})

const Form = () => {    
    const {handleSubmit, reset, register, control } = useForm({
        resolver: yupResolver(validationForm)
    })
    
    const [dataCountries, setDataCountries] = useState([]);
    const [dataCities, setDataCities] = useState([]);

    useEffect(() => {
            axios.get("https://amazon-api.sellead.com/country")
            .then((response) => {

                setDataCountries(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

            axios.get("https://amazon-api.sellead.com/city")
            .then((response) => {

                setDataCities(response.data)
            })
            .catch((error) => {  
                console.log(error)
                
            })
                  
        },[])      


    const countries = dataCountries.map(item => item.name_ptbr).sort();

    const citiesWithComplement = dataCities.map(item => item.name_ptbr).filter((onlyCities) => onlyCities).sort() // remove nulls
    const onlyCities = (citiesWithComplement.map(item => item.split(",")[0])).map(item => item.split("-")[0])
    const citiesWithNoRep= [...new Set(onlyCities)]


    const optionCountries = countries.map(item => {
        return {
            value: item,
            label: item
        }   
    })
    
    const optionCities = citiesWithNoRep.map(item => {
        return {
            value: item,
            label: item
        }   
    })

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
                                required                       
                            /> 

                            <TextField 
                                id="TextField"
                                type={"email"}   
                                {...register("email")}
                                label="Email"
                                variant="outlined"   
                                style={{marginBottom:15}}
                                required
                            />

                            <Controller 
                                name="phone"
                                defaultValue=""
                                control={control}
                                rules={{required: true, minLength: 11, maxLength: 15}}
                                render={({ field }) => (
                                    <MaskedInput
                                        required
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
                                rules={{required: true, minLength: 11, maxLength: 14}}
                                render={({ field }) => (
                                    <MaskedInput
                                        required
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
                                        styles={selectStyle}
                                        components = {animatedComponents}
                                        placeholder="Selecione os Países"
                                        isMulti
                                        options={optionCountries}                                  
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
                                        styles={selectStyle}
                                        components = {animatedComponents}
                                        placeholder="Selecione as Cidades"
                                        isMulti 
                                        options={optionCities}
                                    />  
                                )}
                            />

                        <div style={{display: "flex", justifyContent: "space-between"}}>

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

                            <img alt="journey" id="destiny"src={destiny}/>
                        </div>
                    
                    </div> 
            </div>   
       
        </form>
        
    )
    
}

export default Form