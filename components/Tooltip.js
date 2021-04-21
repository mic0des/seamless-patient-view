export default function Tooltip({displayObj}) {
    return (
        <div className="tooltip" style={{opacity: 1, position: 'absolute', left: `${displayObj ? `${displayObj.dimensions.left + 3.1}em` : '3.1em'}`, top: `${displayObj ? `${displayObj.dimensions.top + -1.2}em` : '-1.2em'}`}}>
            <div className="tooltip-range">
                Patient Ages
            </div>
            <div className="tooltip-value">
                {displayObj ? `${displayObj.label} years` : null} 
            </div>
        </div>
    )
}