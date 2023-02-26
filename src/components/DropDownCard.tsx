import styled from 'styled-components';
import { IconCheck } from '../svgs';
import { JostRegularLarge, JostRegularSmall } from '../styles/customStyles';

type DropDownCardProps = {
  item: string;
  selected: boolean;
  onClick: () => void;
  options?: boolean;
};

type ItemProps = {
  item: string;
  options?: boolean;
};

type SelectProps = {
  options?: boolean;
};

const DropDownCard = ({
  item,
  selected,
  onClick,
  options,
}: DropDownCardProps) => {
  return (
    <OptionWrapper options={options} onClick={onClick}>
      <BottomBorder>
        <Item item={item} options={options}>
          {item}
        </Item>
        {selected && <IconCheck />}
      </BottomBorder>
    </OptionWrapper>
  );
};

const OptionWrapper = styled.div<SelectProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  cursor: pointer;

  &:not(:first-child) {
    &::after {
      content: '';
      display: flex;
      position: absolute;
      width: ${({ options }) => (options ? 'calc(100% - 48px)' : '100%')};
      height: 1px;
      border-bottom: 1px solid ${({ theme }) => theme.colors.steelBlue};
      opacity: 0.15;
    }
  }

  &:hover {
    p {
      color: ${({ theme }) => theme.colors.electricPurple};
    }
  }

  width: 100%;
`;

const Item = styled(JostRegularLarge)<ItemProps>`
  color: ${({ theme }) => theme.colors.steelBlue};
  margin-top: ${({ item }) => (item === 'Most Upvotes' ? '0px' : '8px')};
  margin-bottom: ${({ item }) => (item === 'Least Comments' ? '0px' : '8px')};

  font-size: ${({ options }) => (options ? '14px' : '16px')};

  cursor: pointer;
`;

const BottomBorder = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

export default DropDownCard;
