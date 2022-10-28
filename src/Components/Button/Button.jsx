const Button = ({text, style, icon, onMouseEnter, onMouseLeave, styleH1}) => {

    return (
        
        <button style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {icon}
            <h1 style={styleH1}>
                
                {text}
            </h1>
        </button>
        
    )
}

export default Button;