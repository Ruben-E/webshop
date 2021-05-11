import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import React from "react";
import styled from "styled-components";

const StyledRating = styled.div``;

const ActiveStar = styled(FaStar)`
  color: ${({ theme }) => theme.colors.primary.base};
`;

const ActiveStarHalf = styled(FaStarHalfAlt)`
  color: ${({ theme }) => theme.colors.primary.base};
`;

interface RatingProps {
  value: number;
}

export const Rating: React.FunctionComponent<RatingProps> = ({ value }) => {
  const full = parseInt(value.toString());
  const stars: React.ReactElement[] = [];
  for (let i = 0; i < full; i++) {
    stars.push(<ActiveStar key={`star${i}`} />);
  }
  if (value % 1 !== 0) {
    stars.push(<ActiveStarHalf key={`half`} />);
  }
  for (let i = stars.length; i < 5; i++) {
    stars.push(<FaStar key={`star${i}`} />);
  }
  return <StyledRating>{stars}</StyledRating>;
};
