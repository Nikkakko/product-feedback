import { Link, useNavigate } from '@tanstack/react-router';
import styled from 'styled-components';
import { Container } from './FilterGroup';
import { JostRegularSmall, JostRegularLarge } from '../styles/customStyles';
import { useAppSelector } from '../app/hooks';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsSidebarOpen } from '../features/productSlice';
import { device } from '../styles/mediaQueries';

type StatusCircleProps = {
  color: string;
  index: number;
};

const Roadmap = () => {
  const { productRequsts } = useAppSelector(state => state.product);
  const [status, setStatus] = useState<string[]>([
    'planned',
    'in-progress',
    'live',
  ]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const HandleGoRoadmap = () => {
    navigate({
      to: '/roadmap',
    });

    dispatch(setIsSidebarOpen(false));
  };

  return (
    <RoadMapContainer>
      <Header>
        <Title>Roadmap</Title>
        <View onClick={HandleGoRoadmap}>View</View>
      </Header>

      {status.map((status, index) => (
        <Info key={index}>
          <StatusWrapper>
            <StatusCircle color={status} index={index} />
            <Status>{status}</Status>
          </StatusWrapper>

          <StatusCount>
            {productRequsts.filter(request => request.status === status).length}
          </StatusCount>
        </Info>
      ))}
    </RoadMapContainer>
  );
};

const RoadMapContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: 19px 24px;
  width: 223px;

  @media ${device.laptop} {
    width: 255px !important;
    height: auto !important;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.gunmetal};
`;

const View = styled(JostRegularSmall)`
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  color: ${({ theme }) => theme.colors.cornflowerBlue};
  text-decoration: underline;
  cursor: pointer;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  /* flex-direction: column; */
  align-items: center;
`;

const Status = styled(JostRegularLarge)`
  color: ${({ theme }) => theme.colors.steelBlue};
  font-weight: ${({ theme }) => theme.fontWeights.regular};

  text-transform: capitalize;
`;

const StatusCount = styled(JostRegularLarge)`
  color: ${({ theme }) => theme.colors.steelBlue};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.steelBlue};
`;

const StatusCircle = styled.div<StatusCircleProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ index }) =>
    index === 0 ? '#F49F85' : index === 1 ? '#AD1FEA' : '#62BCFA'};
  margin-right: 16px;
`;

export default Roadmap;
