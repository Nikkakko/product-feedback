import { Link, useNavigate, useParams } from '@tanstack/react-router';
import styled from 'styled-components';
import { ArrowDownIcon, ArrowUpIcon, ArrowLeft } from '../svgs';
import iconNewFeedback from '../assets/shared/icon-new-feedback.svg';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Button, InputField } from '../components';
import { useEffect, useState } from 'react';
import SelectWithOptions from '../components/inputAndOption/SelectWithOptions';
import {
  addNewFeedback,
  deleteFeedback,
  updateFeedback,
} from '../features/productSlice';
import { navigateBack } from '../helper/navigateBack';
import { device } from '../styles/mediaQueries';

type styledProps = {
  isEditing?: boolean;
};
const NewFeedback = () => {
  const { isEditing, productSuggestion, productRequsts } = useAppSelector(
    state => state.product
  );
  const { id } = useParams();
  const paramsId = Number(id);
  const navigate = useNavigate({});
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState({
    title: '',
    description: '',
  });
  const [error, setError] = useState(false);
  const [sort, setSort] = useState('Feature');
  const [openOptions, setOpenOptions] = useState(false);
  const selectOptions = ['Feature', 'UI', 'UX', 'Enhancement', 'Bug'];
  const [status, setStatus] = useState('');
  const [openStatus, setOpenStatus] = useState(false);
  const statusOptions = ['Suggestion', 'Planned', 'In-progress', 'Live'];

  const handleSort = (option: string) => {
    setSort(option);
    setOpenOptions(false);
  };

  const handleStatus = (option: string) => {
    setStatus(option);
    setOpenStatus(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleAddFeedback = () => {
    if (inputValue.title === '' || inputValue.description === '') {
      setError(true);
      return;
    }

    let newFeedback = {
      id: productSuggestion.length + 1,
      title: inputValue.title,
      category: sort.toLocaleLowerCase(),
      upvotes: 0,
      status: 'suggestion',
      description: inputValue.description,
      comments: [],
    };

    let updatedFeedback = {
      id: paramsId,
      title: inputValue.title,
      category: sort.toLocaleLowerCase(),
      status: status.toLocaleLowerCase(),
      description: inputValue.description,
    };

    if (isEditing) {
      dispatch(updateFeedback(updatedFeedback));
      navigate({
        to: '/',
      });
    } else {
      dispatch(addNewFeedback(newFeedback));
      navigate({
        to: '/',
      });
    }
  };

  const handleDeleteFeedback = () => {
    dispatch(deleteFeedback(paramsId));
    navigate({
      to: '/',
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }, [error]);

  useEffect(() => {
    if (isEditing) {
      const findProduct: any = productSuggestion?.find(
        product => product?.id === paramsId
      );

      setInputValue({
        title: findProduct?.title,
        description: findProduct?.description,
      });

      setSort(findProduct?.category);
      setStatus(findProduct?.status);
    }
  }, [isEditing]);

  return (
    <Container>
      <Header>
        <ArrowLeft />
        <span
          style={{
            cursor: 'pointer',
          }}
          onClick={() => navigateBack()}
        >
          Go back
        </span>
      </Header>

      <IconPlus src={iconNewFeedback} alt='icon plus' />
      <Wrapper>
        <Title>
          {!isEditing ? 'Create New Feedback' : `Editing ${inputValue.title}`}
        </Title>
        <FormGroup>
          <InputField
            label='Feedback Title'
            name='title'
            sublevel='Add a short, descriptive headline'
            type='text'
            value={inputValue.title}
            onChange={handleOnChange}
            error={error && inputValue.title === '' ? true : false}
          />

          <Options>
            <LabelTitle>Category</LabelTitle>
            <SubTitle>Choose a category for your feedback</SubTitle>
            <SelectOptions onClick={() => setOpenOptions(!openOptions)}>
              <span
                style={{
                  textTransform: 'capitalize',
                }}
              >
                {sort}
              </span>
              {!openOptions ? (
                <ArrowDownIcon />
              ) : (
                <ArrowUpIcon fill='#4661E6' />
              )}
            </SelectOptions>
            {openOptions && (
              <SelectWithOptions
                title='Category'
                subTitle='Choose a category for your feedback'
                options={selectOptions}
                onSelect={handleSort}
                selected={sort}
              />
            )}
          </Options>

          {isEditing && (
            <Options isEditing={isEditing}>
              <LabelTitle>Update Status</LabelTitle>
              <SubTitle>Change feature state</SubTitle>
              <SelectOptions onClick={() => setOpenStatus(!openStatus)}>
                <span
                  style={{
                    textTransform: 'capitalize',
                  }}
                >
                  {status}
                </span>
                {!openStatus ? (
                  <ArrowDownIcon />
                ) : (
                  <ArrowUpIcon fill='#4661E6' />
                )}
              </SelectOptions>
              {openStatus && (
                <SelectWithOptions
                  options={statusOptions}
                  onSelect={handleStatus}
                  selected={status}
                />
              )}
            </Options>
          )}

          <InputField
            label='Feedback Detail'
            name='description'
            sublevel='Include any specific comments on what should be improved, added, etc.'
            type='text'
            value={inputValue.description}
            onChange={handleOnChange}
            textarea
            error={error && inputValue.description === '' ? true : false}
          />

          <Buttons>
            <Button
              text={isEditing ? 'Save Changes' : 'Add Feedback'}
              color='#AD1FEA'
              onClick={handleAddFeedback}
              hoverColor='#C75AF6'
            />

            <Button
              text='Cancel'
              color='#3A4374'
              onClick={() =>
                navigate({
                  to: '/',
                })
              }
              hoverColor='#656EA3'
            />

            {isEditing && (
              <Button
                text='Delete'
                color='#D73737'
                hoverColor='#E98888'
                onClick={handleDeleteFeedback}
              />
            )}
          </Buttons>
        </FormGroup>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 34px 24px 77px 24px;

  @media ${device.tablet} {
    padding: 56px 114px 223px 114px;
  }

  @media ${device.laptop} {
    padding: 92px 450px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  span {
    font-weight: 700;
    font-size: 13px;
    line-height: 19px;
    /* identical to box height */

    color: #647196;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 55px;
  border-radius: 10px;
  padding: 44px 24px;
  background: ${({ theme }) => theme.colors.white};
`;

const IconPlus = styled.img`
  position: absolute;
  top: 85px;
  left: 44px;
  z-index: 100;
  width: 40px;
  height: 40px;

  @media ${device.tablet} {
    top: 110px;
    left: 140px;
  }

  @media ${device.laptop} {
    top: 145px;
    left: 480px;
  }
`;

const Title = styled.h3``;

const LabelTitle = styled.p`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.194444px;

  color: #3a4374;
`;

const SubTitle = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  color: #647196;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

const Options = styled.div<styledProps>`
  margin-top: ${({ isEditing }) => (isEditing ? '0px' : '24px')};
  margin-bottom: 24px;
`;

const SelectOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  width: 100%;
  background: #f7f8fd;
  padding: 13px 24px;

  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  /* identical to box height */

  color: #3a4374;
  cursor: pointer;

  &:hover {
    border: 1px solid #4661e6;
  }
  border-radius: 5px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 40px;

  @media ${device.tablet} {
    flex-direction: row-reverse;
    & > button:nth-child(3) {
      margin-right: auto; /* This will push the button to the right edge */
    }
  }
`;
export default NewFeedback;
