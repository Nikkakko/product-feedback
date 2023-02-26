import styled from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import { JostRegularSmall } from '../../styles/customStyles';

type InputFieldProps = {
  value: string;
  label?: string;
  name: string;
  placeholder?: string;
  sublevel?: string;
  type?: string;
  onChange: any;
  textarea?: boolean;
  error?: boolean;
};

type styledProps = {
  error?: boolean;
};

const InputField = ({
  value,
  label,
  name,
  placeholder,
  type,
  sublevel,
  textarea,
  onChange,
  error,
}: InputFieldProps) => {
  const { isEditing } = useAppSelector(state => state.product);
  return (
    <FormGroup>
      {label && <Label htmlFor={name}>{label}</Label>}
      {sublevel && <SubLevel>{sublevel}</SubLevel>}

      {!textarea && (
        <Input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          error={error}
        />
      )}

      {error && (
        <ErrorText>
          {isEditing ? 'Please fill in all fields' : 'Can’t be empty'}
        </ErrorText>
      )}

      {textarea && (
        <TextArea name={name} value={value} onChange={onChange} error={error} />
      )}
    </FormGroup>
  );
};

const FormGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 13px;
  line-height: 19px;
  /* identical to box height */

  letter-spacing: -0.180556px;

  color: #3a4374;
`;

const SubLevel = styled.p`
  font-weight: 400;
  font-size: 13px;
  line-height: 19px;
  /* identical to box height */

  color: #647196;
`;

const Input = styled.input<styledProps>`
  width: 100%;
  padding: 14px 16px;
  border-radius: 5px;
  background: #f7f8fd;
  margin-top: 16px;
  border: ${({ error }) => (error ? '1px solid #D73737' : 'none')};
  font-weight: 400;
  font-size: 13px;
  line-height: 19px;
  /* identical to box height */

  cursor: pointer;

  color: #3a4374;
  &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea<styledProps>`
  width: 100%;
  padding: 12px 16px;
  height: 120px;
  border-radius: 5px;
  border: ${({ error }) => (error ? '1px solid #D73737' : 'none')};
  background: #f7f8fd;
  resize: none;
  margin-top: 16px;
  font-weight: 400;
  font-size: 13px;
  line-height: 19px;
  /* identical to box height */

  color: #3a4374;

  &:focus {
    outline: none;
  }
`;

const ErrorText = styled(JostRegularSmall)`
  color: #d73737;
  margin-top: 4px;
  position: absolute;

  bottom: -20px;
`;

export default InputField;
