import styled from 'styled-components';
import DropDownCard from '../DropDownCard';

type Props = {
  options: string[];
  onSelect: (value: string) => void;
  title?: string;
  subTitle?: string;
  selected: string;
};

const SelectWithOptions = ({ options, onSelect, selected }: Props) => {
  return (
    <Container>
      {options.map(option => (
        <DropDownCard
          key={option}
          item={option}
          onClick={() => onSelect(option)}
          selected={selected === option}
          options
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 24px;
  background: #ffffff;
  box-shadow: 0px 10px 40px -7px rgba(55, 63, 104, 0.350492);
  border-radius: 10px;
  padding: 0px 24px;
`;

export default SelectWithOptions;
