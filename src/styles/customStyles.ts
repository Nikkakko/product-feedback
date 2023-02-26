import styled from 'styled-components';

export const JostRegularLarge = styled.p`
  font-size: ${({ theme }) => theme.bodySize.large};
  line-height: 23px;
`;

export const JostRegularMedium = styled.p`
  font-size: ${({ theme }) => theme.bodySize.medium};
  line-height: 22px;
`;

export const JostRegularSmall = styled.p`
  font-size: ${({ theme }) => theme.bodySize.small};
  line-height: 19px;
`;
