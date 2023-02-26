import styled from 'styled-components';
import FilterGroup from './FilterGroup';
import Roadmap from './Roadmap';

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Menu>
        <FilterGroup />
        <Roadmap />
      </Menu>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  position: absolute;
  right: 0;
  width: 75%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.whisperWhite};

  // prevent scrolling on mobile
`;

const Menu = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export default Sidebar;
