import styled from 'styled-components';
import Button from '../Button';

type AddReplyProps = {
  setReplyValue: (value: string) => void;
  replyName: string;
  onClick: () => void;
};

const AddReply = ({ setReplyValue, replyName, onClick }: AddReplyProps) => {
  return (
    <ReplyWrapper>
      <TextArea
        defaultValue={`@${replyName}`}
        onChange={e => setReplyValue(e.target.value)}
        maxLength={250}
      />
      <Button text='Reply' color='#AD1FEA' onClick={onClick} />
    </ReplyWrapper>
  );
};

const ReplyWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 24px;
`;

const TextArea = styled.textarea`
  width: 70%;
  height: 60px;
  border-radius: 5px;
  background: #f7f8fd;
  border: 1px solid #4661e6;
  padding: 8px 12px;
  resize: none;

  cursor: text;

  &:focus {
    outline: none;
  }
`;
export default AddReply;
