import styled from 'styled-components';

type ButtonProps = {
  text: string;
  color: string;
  onClick?: () => void;
  hoverColor?: string;
};

type styledButtonProps = {
  color: string;
  hoverColor?: string;
};

const Button = ({ text, color, onClick, hoverColor }: ButtonProps) => {
  return (
    <StyledButton color={color} onClick={onClick} hoverColor={hoverColor}>
      {text}
    </StyledButton>
  );
};

const StyledButton = styled.button<styledButtonProps>`
  background-color: ${props => props.color};
  border: none;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.white};
  padding: 10.5px 16px 10.5px 16px;

  font-weight: 700;
  font-size: 13px;
  line-height: 19px;

  &:hover {
    cursor: pointer;
    background-color: ${props => props.hoverColor};
  }
`;

export default Button;
