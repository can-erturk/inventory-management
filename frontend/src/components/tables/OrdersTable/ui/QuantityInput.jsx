function QuantityInput({ data, setData, saveForm, ...props }) {
  return (
    <input
      {...props}
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      placeholder="Quantity"
      className="table-input md:max-w-[100px]"
      value={data.inStock}
      onKeyDown={(e) => {
        // Increment or decrement quantity on ArrowUp and ArrowDown keys
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          e.preventDefault()

          let newValue = parseInt(data.inStock) || 0
          e.key === 'ArrowUp' ? newValue++ : newValue--

          setData({
            ...data,
            inStock: newValue < 0 ? '-' + Math.abs(newValue) : '+' + newValue,
          })
        }

        // Save form on Enter key
        if (e.key === 'Enter') {
          saveForm()
        }
      }}
      onChange={(e) => {
        const { value } = e.target

        // Validate input value to be a number with optional + or - sign
        if (!/^[+-]?(?:[1-9]\d*|0)?$/.test(value)) {
          console.log('value', value)
          e.preventDefault()
          return
        }

        if (value > 0 && !value.startsWith('+')) {
          setData({
            ...data,
            inStock: '+' + value,
          })
        } else if (value < 0 && !value.startsWith('-')) {
          setData({
            ...data,
            inStock: '-' + value,
          })
        } else {
          setData({
            ...data,
            inStock: value,
          })
        }
      }}
    />
  )
}

export default QuantityInput
