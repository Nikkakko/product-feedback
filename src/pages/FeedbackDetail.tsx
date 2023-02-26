import styled from 'styled-components';
import { Button } from '../components';
import { JostRegularSmall } from '../styles/customStyles';
import {
  Link,
  useNavigate,
  useParams,
  createBrowserHistory,
} from '@tanstack/react-router';
import { ArrowLeft } from '../svgs';
import Product from '../components/Product';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Comments from '../components/comments/Comments';
import { product, ProductRequestsData } from '../types/dataType';
import { setIsEditing } from '../features/productSlice';
import { navigateBack } from '../helper/navigateBack';
import { device } from '../styles/mediaQueries';

const FeedbackDetail = () => {
  const { productSuggestion } = useAppSelector(state => state.product);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const history = createBrowserHistory();
  // convert id to number
  const paramsId = Number(id);

  const findProductComments: any = productSuggestion?.find(
    product => product?.id === paramsId
  );

  const findProduct: any = productSuggestion?.find(
    product => product?.id === paramsId
  );

  const handleOnClick = () => {
    dispatch(setIsEditing(true));
    navigate({
      to: `/edit-feedback/$id`,
      params: { id: id as any },
    });
  };

  return (
    <Container>
      <Header>
        <GoBack
          onClick={() => {
            navigateBack();
          }}
        >
          <ArrowLeft />
          <Text>Go Back</Text>
        </GoBack>

        <Button
          text='Edit Feedback'
          color='#4661E6'
          onClick={handleOnClick}
          hoverColor='#7C91F9'
        />
      </Header>
      <ProductWrapper>
        <Product product={findProduct} />

        <CommentsSection>
          <Comments
            comments={findProductComments?.comments}
            productId={paramsId}
          />
        </CommentsSection>
      </ProductWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 24px;

  @media ${device.laptop} {
    padding: 92px 355px 129px 355px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const GoBack = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const Text = styled(JostRegularSmall)`
  color: ${({ theme }) => theme.colors.steelBlue};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const ProductWrapper = styled.div`
  margin-top: 24px;
`;

const CommentsSection = styled.div``;

export default FeedbackDetail;
