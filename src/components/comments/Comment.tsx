import { useParams } from '@tanstack/react-router';
import { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addNewReply } from '../../features/productSlice';
import {
  JostRegularSmall,
  JostRegularMedium,
  JostRegularLarge,
} from '../../styles/customStyles';
import { ProductRequestComment } from '../../types/dataType';
import Button from '../Button';
import AddNewComment from './AddNewComment';
import AddReply from './AddReply';
import Replies from './Replies';

type CommentProps = {
  comment: ProductRequestComment | any;
  replies?: boolean;
};

type styledProps = {
  replies?: boolean;
};

const Comment = ({ comment, replies }: CommentProps) => {
  const { content, id, user, replyingTo } = comment;
  const { image, name, username } = user;
  const { currentUser } = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();
  const { id: paramsId } = useParams();
  const productId = Number(paramsId);

  // check if comment has no replies
  const repliesLength = comment.replies && Object.keys(comment.replies).length;

  const [addReply, setAddReply] = useState(false);
  const [setReplyName, setSetReplyName] = useState('');
  const [replyValue, setReplyValue] = useState('');

  const handleAddReply = () => {
    let newReply = {
      content: replyValue.replace(`@${setReplyName}`, ''),
      replyingTo: `@${setReplyName}`,

      user: {
        image: currentUser.image,
        name: currentUser.name,
        username: currentUser.username,
      },
    };

    dispatch(
      addNewReply({
        id: productId,
        commentId: id,
        newReply,
        replyingTo,
      })
    );
    setAddReply(false);
  };

  return (
    <Container replies={replies}>
      <CommentHeader>
        <UserWrapper>
          <Avatar src={image} />
          <UserInfo>
            <Name>{name}</Name>
            <Username>@{username}</Username>
          </UserInfo>
        </UserWrapper>
        <Reply
          onClick={() => {
            setAddReply(!addReply);
            setSetReplyName(name);
          }}
        >
          Reply
        </Reply>
      </CommentHeader>
      <CommentContent>
        {replies ? (
          <CommentLetter>
            <span>{replyingTo}</span>
            {content}
          </CommentLetter>
        ) : (
          <CommentLetter>{content}</CommentLetter>
        )}
      </CommentContent>
      {addReply && (
        <AddReply
          setReplyValue={setReplyValue}
          replyName={setReplyName}
          onClick={handleAddReply}
        />
      )}
      {!replies && !repliesLength && <BottomLine />}
      {repliesLength && <Replies replies={comment.replies} />}
    </Container>
  );
};

const Container = styled.div<styledProps>`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  position: relative;

  // if replies is true, set width to 70%
  width: ${({ replies }) => (replies ? '95%' : '100%')};
  // if replies is true, set margin-left to 30%
  margin-left: ${({ replies }) => (replies ? '5%' : '0')};

  // if replies is true make pseude element
  &::before {
    content: ${({ replies }) => (replies ? '""' : 'none')};

    position: absolute;
    width: 1px;
    height: 100%;
    background: ${({ theme }) => theme.colors.steelBlue};
    opacity: 0.1;
    left: -13px;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 16px;
`;

const Name = styled(JostRegularSmall)`
  color: ${({ theme }) => theme.colors.gunmetal};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Username = styled(JostRegularSmall)`
  color: ${({ theme }) => theme.colors.steelBlue};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

const Reply = styled(JostRegularSmall)`
  color: ${({ theme }) => theme.colors.cornflowerBlue};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  cursor: pointer;
`;

const CommentContent = styled.div`
  span {
    color: ${({ theme }) => theme.colors.electricPurple};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-right: 4px;
    font-size: 13px;
  }
`;

const CommentLetter = styled(JostRegularSmall)`
  color: ${({ theme }) => theme.colors.steelBlue};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  margin-top: 16px;
`;

const ReplyLetter = styled(JostRegularSmall)``;

const BottomLine = styled.div`
  width: 100%;
  height: 1px;
  background: #8c92b3;
  mix-blend-mode: normal;
  opacity: 0.25;
  margin-top: 24px;
`;

export default Comment;
