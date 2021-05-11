import { FaMinus, FaPlus } from "react-icons/fa";
import React, { FormEvent } from "react";
import { ButtonIcon, Input } from "@webshop/atoms";
import styled from "styled-components";

interface QuantityInputProps {
  quantity: number;
  onChange: (quantity: number) => void;
  disabled?: boolean;
}

const QuantityInputContainer = styled.div`
  display: flex;
`;

export const QuantityInput: React.FunctionComponent<QuantityInputProps> = ({
  quantity,
  onChange,
  disabled = false,
}) => {
  const onQuantityChange = (event: FormEvent) => {
    const value = (event.target as HTMLInputElement).value;
    if (value === "") {
      onChange(0);
    }
    if (!isNaN(parseInt(value)) && value !== "0") {
      onChange(parseInt(value));
    }
  };

  const incrementQuantity = () => {
    onChange(quantity + 1);
  };

  const decrementQuantity = () => {
    onChange(quantity - 1);
  };

  return (
    <QuantityInputContainer>
      <ButtonIcon
        icon={<FaMinus />}
        category={"tertiary"}
        onClick={decrementQuantity}
        disabled={disabled || quantity <= 1}
      />
      <StyledQuantityInput
        disabled={disabled}
        type="text"
        value={quantity === 0 ? "" : quantity}
        min={"1"}
        onInput={onQuantityChange}
      />
      <ButtonIcon
        icon={<FaPlus />}
        category={"tertiary"}
        onClick={incrementQuantity}
        disabled={disabled}
      />
    </QuantityInputContainer>
  );
};

const StyledQuantityInput = styled(Input)`
  height: 32px;
  width: 34px;
  text-align: center;
  margin: 0 8px 0 8px;
`;
