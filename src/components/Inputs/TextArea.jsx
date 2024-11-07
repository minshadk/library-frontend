const TextArea = ({ label, placeHolder, textValue, setText, error }) => {
  const handleTextInput = (textValue) => {
    setText(textValue)
  }
  return (
    <div>
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
        {label}
      </label>
      <textarea
        rows="4"
        class="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-slate-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeHolder}
        onChange={(e) => handleTextInput(e.target.value)}
      ></textarea>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

export default TextArea
