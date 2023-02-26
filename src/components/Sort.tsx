import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { JostRegularLarge, JostRegularSmall } from '../styles/customStyles';
import Button from './Button';
import { ArrowDownIcon, ArrowUpIcon, IconSuggestions } from '../svgs';
import { Link, useNavigate } from '@tanstack/react-router';
import DropDownCard from './DropDownCard';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setIsEditing, sortBy } from '../features/productSlice';
import { device } from '../styles/mediaQueries';

const Sort = () => {
  const { productSuggestion } = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [sort, setSort] = useState('Most Upvotes');
  const [openOptions, setOpenOptions] = useState(false);
  const selectOptions = [
    'Most Upvotes',
    'Least Upvotes',
    'Most Comments',
    'Least Comments',
  ];

  const handleSort = (option: string) => {
    setSort(option);
    dispatch(sortBy(option.toLowerCase()));
    setOpenOptions(false);
  };

  const handleOnClick = () => {
    dispatch(setIsEditing(false));
    navigate({
      to: '/new-feedback',
    });
  };

  const suggestionLength = productSuggestion?.filter(
    product => product.status === 'suggestion'
  );

  return (
    <SortContainer>
      <SortWrapper>
        <SuggestionsCount>
          <IconSuggestions />
          <SuggestionTitle>
            {suggestionLength?.length} Suggestions
          </SuggestionTitle>
        </SuggestionsCount>

        <div
          onClick={() => setOpenOptions(!openOptions)}
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <SortBy>Sort by: </SortBy>
          <SortBy
            style={{
              fontWeight: 600,
            }}
          >
            {sort}
          </SortBy>
          {openOptions ? (
            <ArrowUpIcon fill='#ffff' />
          ) : (
            <ArrowDownIcon fill='#ffff' />
          )}
        </div>
        {openOptions && (
          <SortOptions>
            {selectOptions.map((option, i) => (
              <DropDownCard
                key={i}
                item={option}
                selected={option === sort}
                onClick={() => handleSort(option)}
              />
            ))}
          </SortOptions>
        )}
      </SortWrapper>

      <Button
        text='+ Add Feedback'
        color='#AD1FEA'
        onClick={handleOnClick}
        hoverColor='#C75AF6'
      />
    </SortContainer>
  );
};

const SortContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  background-color: ${({ theme }) => theme.colors.darkSlateBlue};
  width: 100%;
  height: 56px;

  // prevent text selection
  user-select: none;

  @media ${device.tablet} {
    border-radius: 10px;

    position: relative;
  }

  @media ${device.laptop} {
    margin-top: 0;
    padding: 23px 24px;
  }
`;

const SuggestionsCount = styled.div`
  display: none;

  @media ${device.tablet} {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-right: 48px;
  }
`;

const SuggestionTitle = styled.h3`
  font-weight: 700px;
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: -0.25px;
`;

const SortWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const SortBy = styled(JostRegularSmall)`
  color: ${({ theme }) => theme.colors.babyPowder};
  margin-right: 8px;
  cursor: pointer;
`;

const SortOptions = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 999;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 10px 40px -7px rgba(55, 63, 104, 0.350492);
  border-radius: 10px;

  width: 219px;
  top: 149px;
  padding: 12px 24px;

  @media ${device.tablet} {
    top: 56px;
    left: 0;
  }
`;

export default Sort;
