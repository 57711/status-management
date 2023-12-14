function Selector(props) {
    const { options, onChange, value, children, ...restProps } = props;
    return (
        <select value={value} onChange={onChange} {...restProps}>
            {children}
            {options.map(item => <option key={item} value={item} >{item}</option>)}
        </select>
    )
}
export default Selector
