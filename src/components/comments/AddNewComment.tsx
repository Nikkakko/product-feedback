import { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import { Container } from '../FilterGroup';
import { JostRegularSmall } from '../../styles/customStyles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addNewComment } from '../../features/productSlice';
import { device } from '../../styles/mediaQueries';

type AddNewCommentProps = {
  productId?: number;
};

const AddNewComment = ({ productId }: AddNewCommentProps) => {
  const dispatch = useAppDispatch();
  const { productSuggestion, currentUser } = useAppSelector(
    state => state.product
  );

  const findProductId = productSuggestion?.find(
    product => product?.id === productId
  );

  const [commentValue, setCommentValue] = useState('');
  const [characterCount, setCharacterCount] = useState(250);

  const handleAddComment = () => {
    if (productId !== undefined) {
      let newComment = {
        // @ts-ignore
        id: findProductId?.comments?.length + 1,
        content: commentValue,
        user: {
          image: currentUser?.image,
          name: currentUser?.name,
          username: currentUser?.username,
        },
      };
      dispatch(addNewComment({ id: productId, newComment }));

      setCommentValue('');
      setCharacterCount(250);
    }
  };

  return (
    <AddNewCommentContainer>
      <Title>Add Comment</Title>
      <TextArea
        placeholder='Type your comment here...'
        value={commentValue}
        onChange={e => {
          setCommentValue(e.target.value);
        }}
        maxLength={characterCount}
      />

      <BottomWrapper>
        <CharacterCount>
          {characterCount - commentValue.length} characters left
        </CharacterCount>
        <Button
          text='Post Comment'
          color='#AD1FEA'
          onClick={handleAddComment}
        />
      </BottomWrapper>
    </AddNewCommentContainer>
  );
};

const AddNewCommentContainer = styled(Container)`
  margin-top: 24px;
  padding: 24px;

  @media ${device.tablet} {
    width: 100%;
  }

  @media ${device.laptop} {
    width: 100%;
    height: 100%;
  }
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.gunmetal};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 24px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 16px 0px 45px 16px;
  resize: none;
  border: none;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.whisperWhite};
  color: #8c92b3;

  &:focus {
    outline: none;
  }
`;

const CharacterCount = styled(JostRegularSmall)`
  color: ${({ theme }) => theme.colors.gunmetal};
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 16px;
`;
export default AddNewComment;
