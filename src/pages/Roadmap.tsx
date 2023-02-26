import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Button } from '../components';
import Product from '../components/Product';
import { setIsEditing } from '../features/productSlice';
import { JostRegularLarge, JostRegularSmall } from '../styles/customStyles';
import { ArrowLeft } from '../svgs';
import { navigateBack } from '../helper/navigateBack';
import { device } from '../styles/mediaQueries';

type StyledProps = {
  activeStatus?: string;
  status?: string;
  roadmap?: boolean;
};

const Roadmap = () => {
  const { currentUser, productRequsts } = useAppSelector(
    state => state.product
  );

  const [status, setStatus] = useState<string[]>([
    'planned',
    'in-progress',
    'live',
  ]);
  const [activeStatus, setActiveStatus] = useState('in-progress');
  const subTitles = [
    'Ideas prioritized for research',
    'Currently being developed',
    'Released features',
  ];

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const statusLength = (status: string) => {
    let len = productRequsts.filter(
      request => request.status === status
    ).length;
    return len;
  };

  function handleStatusClick(status: string) {
    setActiveStatus(status);
  }

  const HandleAddFeedback = () => {
    dispatch(setIsEditing(false));
    navigate({
      to: '/new-feedback',
    });
  };

  return (
    <Container>
      <Header>
        <LeftSide>
          <GoBack onClick={() => navigateBack()}>
            <ArrowLeft fill='#CDD2EE' />
            <JostRegularSmall>Go Back</JostRegularSmall>
          </GoBack>
          <Title>Roadmap</Title>
        </LeftSide>
        <Button
          text='+ Add Feedback'
          color='#AD1FEA'
          onClick={HandleAddFeedback}
        />
      </Header>

      <StatusWrapper>
        <SelectStatus>
          {status.map((item, index) => (
            <Status
              key={index}
              activeStatus={activeStatus}
              status={item}
              onClick={() => handleStatusClick(item)}
            >
              {item} (<span>{statusLength(item)}</span>)
            </Status>
          ))}
        </SelectStatus>
      </StatusWrapper>

      <TitleWrapper>
        {status.map((item, index) => (
          <React.Fragment key={index}>
            <StatusTitle>
              {activeStatus === item && (
                <>
                  {item} <span>({statusLength(item)})</span>
                </>
              )}
            </StatusTitle>
            <Subtitle>{activeStatus === item && subTitles[index]}</Subtitle>
          </React.Fragment>
        ))}
      </TitleWrapper>

      <Content>
        {productRequsts.map(
          (request, index) =>
            request.status === activeStatus && (
              <Product
                key={index}
                product={request}
                roadmap
                activeStatus={activeStatus}
              />
            )
        )}
      </Content>

      <ContentTablet>
        {status.map((item, index) => (
          <ColumnContent key={index}>
            <>
              <StatusTitle>
                {item} <span>({statusLength(item)})</span>
                <Subtitle>{subTitles[index]}</Subtitle>
              </StatusTitle>
              {productRequsts.map((request, index) => (
                <React.Fragment key={index}>
                  {request.status === item && (
                    <Product product={request} roadmap activeStatus={item} />
                  )}
                </React.Fragment>
              ))}
            </>
          </ColumnContent>
        ))}
      </ContentTablet>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media ${device.tablet} {
    width: 100%;
    padding: 56px 40px;
  }

  @media ${device.laptop} {
    width: 100%;
    padding: 78px 165px;
  }

  @media ${device.desktop} {
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 24px;

  background: ${({ theme }) => theme.colors.darkSlateBlue};

  @media ${device.tablet} {
    border-radius: 10px;
  }
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
`;

const GoBack = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 3px;
  cursor: pointer;

  p {
    color: ${({ theme }) => theme.colors.white};
    font-weight: 700;
  }
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.white};
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 24px 24px;

  @media ${device.tablet} {
    display: none;
  }
`;

const Content = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 20px;
  padding: 0px 24px 98px 24px;

  @media ${device.tablet} {
    display: none;
    flex-direction: row;
    align-items: flex-start;
    gap: 10px;

    padding: 0;
  }

  @media ${device.desktop} {
    gap: 32px;
  }
`;

const ContentTablet = styled(Content)`
  display: none;

  @media ${device.tablet} {
    display: flex;
  }
`;

const ColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 16px;

  @media ${device.desktop} {
    width: 100%;
    gap: 32px;
  }
`;

const StatusWrapper = styled.div<StyledProps>`
  position: relative;

  &::after {
    content: '';
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #8c92b3;
    opacity: 0.2;
    display: block;
    /* position: absolute; */
    /* bottom: 0; */
  }

  @media ${device.tablet} {
    display: none;
  }
`;

const SelectStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 24px;
  position: relative;
`;

const Status = styled(JostRegularSmall)<StyledProps>`
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.gunmetal};
  font-weight: 700;
  cursor: pointer;

  opacity: ${({ activeStatus, status }) =>
    activeStatus === status ? '1' : '0.4'};
  position: relative;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: calc(100% + 18px);
    width: ${({ activeStatus, status }) =>
      activeStatus === status ? '100%' : '0'};
    height: ${({ activeStatus, status }) =>
      activeStatus === status ? '4px' : '0'};
    background-color: ${({ theme, activeStatus }) =>
      activeStatus === 'planned'
        ? '#F49F85'
        : activeStatus === 'in-progress'
        ? '#AD1FEA'
        : '#62BCFA'};
  }
`;

const StatusTitle = styled.h3`
  color: ${({ theme }) => theme.colors.gunmetal};
  font-weight: 700;
  text-transform: capitalize;

  @media ${device.tablet} {
    margin-top: 32px;
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.194444px;
  }
`;

const Subtitle = styled(JostRegularSmall)`
  color: ${({ theme }) => theme.colors.steelBlue};

  @media ${device.tablet} {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
`;

export default Roadmap;
