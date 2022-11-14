import styled from "styled-components"

export const StyledFavoritos = styled.div`
  width: 100%;
  padding: 16px;
  h2 {
    font-size: 16px;
    margin-bottom: 16px;
    text-transform: capitalize;
  }
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    max-width: 210px;
  }
  div {
    display: flex;
    gap: 10px;
    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        text-align: center;
        padding-top: 8px;
        color: ${({ theme }) => theme.textColorBase || "#222222"};
        text-transform: capitalize;
      }
    }
  }
`
