const TextInput = ({ type, placeHolder, textValue, setText, error }) => {
  const handleTextInput = (textValue) => {
    setText(textValue);
  };

  return (
    <div className="mb-4">
      <input
        type={type}
        required
        className="appearance-none rounded-none relative block w-full px-3 py-2 my-5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder={placeHolder}
        value={textValue || ''}
        onChange={(e) => handleTextInput(e.target.value)}
      />
      {/* Error message display */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
