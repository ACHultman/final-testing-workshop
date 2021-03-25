interface questionProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (event: React.FormEvent<HTMLInputElement>) => void;
  text: string;
}

export const TextForm = ({
  handleSubmit,
  handleChange,
  text,
}: questionProps) => {
  return (
    <div>
      <form onSubmit={handleSubmit} data-testid="form">
        <label>
          <div>
            <input
              data-testid="text-input"
              type="text"
              value={text}
              onChange={handleChange}
            />
          </div>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default TextForm;
