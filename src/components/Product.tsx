import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { JostRegularSmall } from '../styles/customStyles';
import { product } from '../types/dataType';
import { CommentIcon, ArrowUpIcon } from '../svgs';
import { Link, useNavigate } from '@tanstack/react-router';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setVotedProductIds,
  removeVotedProductIds,
  updateVotes,
} from '../features/productSlice';
import { device } from '../styles/mediaQueries';

type ProductProps = {
  product: product;
  roadmap?: boolean;
  activeStatus?: string;
};

type StyledProps = {
  roadmap?: boolean;
  activeStatus?: string;
  isVoted?: boolean;
};

const Product = ({ product, roadmap, activeStatus }: ProductProps) => {
  const dispatch = useAppDispatch();
  const { isVoted, votedProductIds } = useAppSelector(state => state.product);

  const HandleIncreaseVote = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (votedProductIds.includes(product.id)) {
      dispatch(updateVotes({ id: product.id, upvotes: product.upvotes - 1 }));
      dispatch(removeVotedProductIds({ id: product.id }));
    } else {
      // incUpVote,
      dispatch(updateVotes({ id: product.id, upvotes: product.upvotes + 1 }));
      dispatch(setVotedProductIds({ id: product.id }));
    }
  };

  const navigate = useNavigate();

  const handleNavigateToDetail = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate({
      to: '/detail/$id',
      params: {
        id: product.id as any,
      },
    });
  };

  return (
    <ProductContainer
      roadmap={roadmap}
      activeStatus={activeStatus}
      onClick={handleNavigateToDetail}
    >
      {roadmap && (
        <RoadmapWrapper>
          <Circle activeStatus={activeStatus} />
          {activeStatus}
        </RoadmapWrapper>
      )}

      <TabletVotes
        roadmap={roadmap}
        onClick={e => HandleIncreaseVote(e)}
        isVoted={votedProductIds.includes(product.id)}
      >
        <ArrowUpIcon
          fill={votedProductIds.includes(product.id) ? '#ffff' : '#4661E6'}
        />
        <ProductVotes isVoted={votedProductIds.includes(product.id)}>
          {product.upvotes}
        </ProductVotes>
      </TabletVotes>
      <div>
        <Titles>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductDescription>{product.description}</ProductDescription>
        </Titles>
        <ProductCategory>{product.category}</ProductCategory>

        <BottomContainer>
          <Votes
            roadmap={roadmap}
            onClick={e => HandleIncreaseVote(e)}
            isVoted={votedProductIds.includes(product.id)}
          >
            <ArrowUpIcon
              fill={votedProductIds.includes(product.id) ? '#ffff' : '#4661E6'}
            />
            <ProductVotes isVoted={votedProductIds.includes(product.id)}>
              {product.upvotes}
            </ProductVotes>
          </Votes>
          <Comments roadmap={roadmap}>
            <CommentIcon />
            <ProductComments>{product.comments?.length || 0}</ProductComments>
          </Comments>
        </BottomContainer>
      </div>
      <TabletComments roadmap={roadmap}>
        <CommentIcon />
        <ProductComments>{product.comments?.length || 0}</ProductComments>
      </TabletComments>
    </ProductContainer>
  );
};

export const ProductContainer = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  width: 100%;

  position: relative;
  cursor: pointer;

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 6px;
    left: 0;
    top: 0;
    background-color: ${({ activeStatus, roadmap }) =>
      roadmap &&
      (activeStatus === 'planned'
        ? '#F49F85'
        : activeStatus === 'in-progress'
        ? '#AD1FEA'
        : '#62BCFA')};
  }

  border-radius: 5px 5px 0px 0px;

  @media ${device.tablet} {
    flex-direction: ${({ roadmap }) => (roadmap ? 'column' : 'row')};
    justify-content: space-between;
    // not first child
  }

  @media ${device.desktop} {
    /* width: 80%; */
  }
`;

const Titles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  margin-bottom: 8px;

  @media ${device.tablet} {
    margin-bottom: 16px;
    /* flex-direction: row; */
  }
`;

const ProductTitle = styled(JostRegularSmall)`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.gunmetal};

  &:hover {
    color: ${({ theme }) => theme.colors.cornflowerBlue};
  }
`;

const ProductDescription = styled(JostRegularSmall)`
  color: ${({ theme }) => theme.colors.steelBlue};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;
const ProductCategory = styled.div`
  background: ${({ theme }) => theme.colors.babyPowder};
  color: ${({ theme }) => theme.colors.cornflowerBlue};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  width: fit-content;
  padding: 5px 16px;
  border-radius: 10px;
  margin-bottom: 16px;
`;

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProductVotes = styled(JostRegularSmall)<StyledProps>`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ isVoted, theme }) =>
    isVoted ? theme.colors.white : theme.colors.gunmetal};
`;

const ProductComments = styled(JostRegularSmall)`
  color: ${({ theme }) => theme.colors.gunmetal};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Votes = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  gap: 10px;

  background: ${({ isVoted, theme }) =>
    isVoted ? '#4661E6' : theme.colors.babyPowder};
  border-radius: 10px;

  padding: 6px 13px 7px 16px;

  &:hover {
    background-color: ${({ isVoted }) => (isVoted ? '#4661E6' : '#cfd7ff')};
  }

  @media ${device.tablet} {
    display: ${({ roadmap }) => (roadmap ? 'flex' : 'none')};
  }
`;

const Comments = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  gap: 8px;

  @media ${device.tablet} {
    display: ${({ roadmap }) => (roadmap ? 'flex' : 'none')};
  }
`;

const Circle = styled.div<StyledProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ activeStatus }) =>
    activeStatus === 'planned'
      ? '#F49F85'
      : activeStatus === 'in-progress'
      ? '#AD1FEA'
      : '#62BCFA'};
`;

const RoadmapWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 14px;

  font-weight: 400;
  font-size: 13px;
  line-height: 19px;
  /* identical to box height */

  color: #647196;
  text-transform: capitalize;

  @media ${device.tablet} {
  }
`;

const TabletVotes = styled(Votes)`
  display: none;

  @media ${device.tablet} {
    display: ${({ roadmap }) => (roadmap ? 'none' : 'flex')};
    width: 40px;
    height: 53px;
    justify-content: center;
    margin-right: 40px;
    flex-direction: column;
  }
`;

const TabletComments = styled(Comments)`
  display: none;

  @media ${device.tablet} {
    display: ${({ roadmap }) => (roadmap ? 'none' : 'flex')};
    margin-left: auto;
  }
`;
export default Product;
