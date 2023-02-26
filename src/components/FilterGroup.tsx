import { useEffect, useState } from 'react';
import storage from 'redux-persist/lib/storage';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  filterByCategory,
  setIsSidebarOpen,
  setSelectedCategory,
} from '../features/productSlice';
import { device } from '../styles/mediaQueries';

type styledProps = {
  selected: boolean;
};

const FilterGroup = () => {
  const dispatch = useAppDispatch();
  const { productRequsts, isSidebarOpen, selectedCategory } = useAppSelector(
    state => state.product
  );

  const [categories, setCategories] = useState<string[]>([
    'All',
    'UI',
    'UX',
    'Enhancement',
    'Bug',
    'Feature',
  ]);

  const handleFilterCategory = (category: string) => {
    dispatch(setSelectedCategory(category.toLowerCase()));
    dispatch(filterByCategory(category.toLowerCase()));
    dispatch(setIsSidebarOpen(false));
  };

  return (
    <Container>
      <FilterWrapper>
        {categories.map((category, index) => (
          <Button
            key={index}
            onClick={() => handleFilterCategory(category)}
            selected={
              selectedCategory.toLocaleLowerCase() ===
              category.toLocaleLowerCase()
            }
          >
            {category}
          </Button>
        ))}
      </FilterWrapper>
    </Container>
  );
};

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;

  @media ${device.tablet} {
    width: 223px;
  }

  @media ${device.laptop} {
    width: 255px;
    height: 137px;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 24px 0px 36px 24px;

  @media ${device.tablet} {
  }
`;

const Button = styled.button<styledProps>`
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.cornflowerBlue : theme.colors.babyPowder};
  color: ${({ theme, selected }) =>
    selected ? theme.colors.white : theme.colors.cornflowerBlue};
  border: none;
  border-radius: 10px;
  padding: 5px 16px;
  margin-right: 8px;
  margin-bottom: 14px;
  width: min-content;

  cursor: pointer;

  &:hover {
    background-color: ${({ selected, theme }) =>
      selected ? theme.colors.cornflowerBlue : '#CFD7FF'};
  }

  text-transform: capitalize;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

export default FilterGroup;
