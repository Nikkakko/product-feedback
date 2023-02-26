import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Hamburger, Close } from '../svgs';
import BackgroundHeader from '../assets/suggestions/mobile/background-header.png';
import TabletHeader from '../assets/suggestions/tablet/background-header.png';
import { JostRegularSmall, JostRegularMedium } from '../styles/customStyles';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setIsSidebarOpen } from '../features/productSlice';
import Sidebar from '../components/Sidebar';
import { device } from '../styles/mediaQueries';
import { FilterGroup, Roadmap } from '../components';

const Header = () => {
  const dispatch = useAppDispatch();
  const { isSidebarOpen } = useAppSelector(state => state.product);
  const backDropRef = useRef<HTMLDivElement | null>(null);
  const [isTablet, setIsTablet] = useState(false);

  const handleClickOutside:
    | React.MouseEventHandler<HTMLDivElement>
    | undefined = e => {
    if (e.target === backDropRef.current) {
      dispatch(setIsSidebarOpen(false));
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        dispatch(setIsSidebarOpen(true));
        setIsTablet(true);
      } else {
        dispatch(setIsSidebarOpen(false));
        setIsTablet(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Wrapper>
      <HeaderContainer>
        <Items>
          <Title>Frontend Mentor</Title>
          <Subtitle>Feedback Board</Subtitle>
        </Items>
        <Menu>
          {isSidebarOpen ? (
            <Close onClick={() => dispatch(setIsSidebarOpen(false))} />
          ) : (
            <Hamburger onClick={() => dispatch(setIsSidebarOpen(true))} />
          )}
        </Menu>
      </HeaderContainer>
      {isTablet && (
        <>
          <FilterGroup />
          <Roadmap />
        </>
      )}

      {isSidebarOpen && (
        <Backdrop ref={backDropRef} onClick={handleClickOutside}>
          <Sidebar />
        </Backdrop>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @media ${device.tablet} {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  @media ${device.laptop} {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    width: max-content;
  }
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 72px;
  background-image: url(${BackgroundHeader});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  position: fixed;

  top: 0;
  z-index: 1000;

  @media ${device.tablet} {
    position: static;
    background-image: url(${TabletHeader});
    width: 223px;
    height: 178px;
    padding: 24px;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    border-radius: 10px;
  }

  @media ${device.laptop} {
    width: 255px;
    height: 137px;
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.tablet} {
    /* padding: 103px 46px 24px 24px; */
  }

  @media ${device.laptop} {
  }
`;

const Title = styled(JostRegularMedium)`
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Subtitle = styled(JostRegularSmall)`
  color: ${({ theme }) => theme.colors.white};
  opacity: 0.75;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  @media ${device.tablet} {
    display: none;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 72px;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  mix-blend-mode: normal;
  z-index: 100;

  // transition from righgt to left when sidebar is open
  transition: all 0.3s ease-in-out;

  @media ${device.tablet} {
    display: none;
  }
`;

export default Header;
