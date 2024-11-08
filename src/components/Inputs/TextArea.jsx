const TextArea = ({ label, placeHolder, textValue, setText, error }) => {
  const handleTextInput = (textValue) => {
    setText(textValue)
  }
  return (
    <div>
      <label class="block mb-2 text-sm font-medium text-gray-900 ">
        {label}
      </label>
      <textarea
        rows="4"
        class="block p-2.5 w-full text-sm   rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600   dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeHolder}
        onChange={(e) => handleTextInput(e.target.value)}
      ></textarea>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

export default TextArea
