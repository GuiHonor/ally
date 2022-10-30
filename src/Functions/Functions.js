export const selectStyle = {
    
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
            
        },
        "@media (min-width: 1024px) and (max-width: 1366px)": {
            width: 400,
            
        },
        "@media (min-width: 1377px)": {
            width: 500,
           
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