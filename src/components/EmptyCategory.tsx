import styled from 'styled-components';
import { ProductContainer } from './Product';
import { EmptyIllustration } from '../svgs';
import { JostRegularSmall } from '../styles/customStyles';
import Button from './Button';
import { Link, useNavigate } from '@tanstack/react-router';
import { useAppDispatch } from '../app/hooks';
import { setIsEditing } from '../features/productSlice';
import { device } from '../styles/mediaQueries';

const EmptyCategory = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleAddFeedback = () => {
    dispatch(setIsEditing(false));
    navigate({
      to: '/new-feedback',
    });
  };
  return (
    <Container>
      <EmptyIllustration />

      <EmptyTitle>There are feedback yet.</EmptyTitle>
      <EmptyDescription>
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </EmptyDescription>

      <Button
        text='+ Add Feedback'
        color='#AD1FEA'
        onClick={handleAddFeedback}
        hoverColor='#C75AF6'
      />
    </Container>
  );
};

const Container = styled(ProductContainer)`
  align-items: center;
  /* padding: 110px 209px; */

  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 110px 140px;
  }

  @media ${device.laptop} {
    padding: 110px 209px;
  }
`;

const EmptyTitle = styled.h3`
  margin-top: 43.5px;
  margin-bottom: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.headingSize.large};
  color: ${({ theme }) => theme.colors.gunmetal};
`;

const EmptyDescription = styled(JostRegularSmall)`
  text-align: center;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.steelBlue};
  font-weight: ${({ theme }) => theme.fontWeights.regular};

  @media ${device.laptop} {
    margin-bottom: 48px;
  }
`;
export default EmptyCategory;
