export default function Tooltip({displayObj}) {
    return (
        <div className="tooltip" style={{opacity: 1, position: 'absolute', left: `${displayObj ? `${displayObj.dimensions.left + 5.5}em` : '5.5em'}`, top: `${displayObj ? `${displayObj.dimensions.top + 8}em` : '8em'}`}}>
            <div className="tooltip-range">
                Patient Ages
            </div>
            <div className="tooltip-value">
                {displayObj ? `${displayObj.label} years` : null} 
            </div>
        </div>
    )
}