import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { JostRegularSmall } from '../../styles/customStyles';
import { ProductRequestComment } from '../../types/dataType';
import AddNewComment from './AddNewComment';
import Comment from './Comment';

type CommentsProps = {
  comments: ProductRequestComment[];
  productId?: number;
};

const Comments = ({ comments, productId }: CommentsProps) => {
  const [totalCommentsLength, setTotalCommentsLength] = useState<number>(0);
  const commentsLength = comments?.length;
  // const repliesLength = comment.replies && Object.keys(comment.replies).length;
  const repliesLength = comments?.map(comment => {
    if (comment?.replies) {
      const repliesLength =
        comment?.replies && Array.isArray(comment?.replies)
          ? comment?.replies?.length
          : 0;
      return repliesLength;
    } else {
      return 0;
    }
  });

  const [filteredRepliesLength] =
    repliesLength?.filter(replyLength => replyLength > 0) || [];

  // use reducer to combine the length of comments and replies

  // filteredRepliesLength + commentsLength
  useEffect(() => {
    setTotalCommentsLength(filteredRepliesLength + commentsLength);
  }, [comments]);

  return (
    <>
      <Container>
        <CommentsLength>
          {filteredRepliesLength > 0
            ? `${totalCommentsLength} Comments`
            : `${commentsLength} comments`}
        </CommentsLength>
        {comments?.map((comment, i: number) => (
          <Comment comment={comment} key={i} />
        ))}
      </Container>
      <AddNewComment productId={productId} />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  margin-top: 24px;
  border-radius: 10px;
  padding: 24px;
`;

const CommentsLength = styled.h3`
  color: ${({ theme }) => theme.colors.gunmetal};
`;

export default Comments;
