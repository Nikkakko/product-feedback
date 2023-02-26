import styled from 'styled-components';
import { JostRegularSmall } from '../../styles/customStyles';
import { ProductRequestReply } from '../../types/dataType';
import Comment from './Comment';

type RepliesProps = {
  replies: ProductRequestReply | any;
};

const Replies = ({ replies }: RepliesProps) => {
  return (
    <>
      {replies.map((reply: any, i: number) => (
        <Comment comment={reply} key={i} replies />
      ))}
    </>
  );
};

const Container = styled.div``;

export default Replies;
