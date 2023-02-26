import { Link } from '@tanstack/react-router';
import styled from 'styled-components';
import { useAppSelector } from '../app/hooks';
import { Sort } from '../components';
import EmptyCategory from '../components/EmptyCategory';
import Product from '../components/Product';
import Header from '../layout/Header';
import { device } from '../styles/mediaQueries';

const Home = () => {
  const { productSuggestion } = useAppSelector(state => state.product);

  return (
    <HomeContainer>
      <Header />
      <NormalSort>
        <Sort />
      </NormalSort>
      <ProductWrapper>
        <DesktopSort>
          <Sort />
        </DesktopSort>
        {productSuggestion?.map(
          (product, i) =>
            product.status === 'suggestion' && (
              <Product key={i} product={product} />
            )
        )}
        {productSuggestion?.length === 0 && <EmptyCategory />}
      </ProductWrapper>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  width: 100%;
  // disable scrolling on mobile

  @media ${device.tablet} {
    padding: 56px 39px;
  }

  @media ${device.laptop} {
    display: flex;
    align-items: flex-start;
    padding: 94px 165px;
    gap: 30px;
  }
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 32px 24px;
  gap: 16px;

  @media ${device.tablet} {
    padding: 0;
    margin-top: 24px;
  }

  @media ${device.laptop} {
    width: 100%;
    margin-top: 0;
  }
`;

const DesktopSort = styled.div`
  display: none;

  @media ${device.tablet} {
    display: flex;
    width: 100%;
  }
`;

const NormalSort = styled.div`
  display: flex;
  width: 100%;
  margin-top: 72px;

  border: 1px solid ${({ theme }) => theme.colors.darkSlateBlue};

  @media ${device.tablet} {
    display: none;
  }
`;

export default Home;
