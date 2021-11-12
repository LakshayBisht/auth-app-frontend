import React, {useState, useMemo} from 'react';
import {Box, FormField} from 'grommet';
import styled from 'styled-components';
import _ from 'lodash';

const StyledFormField = styled(FormField)`
	height: ${({displayName}) => (displayName === 'TextArea' ? `61px` : `100%`)};
	margin-bottom: ${({displayName}) =>
		displayName === 'Styled(GMapAutocomplete)' && `0px`};
	position: relative;
	width: 100%;
	height: 100%;
	> label {
		width: ${({displayName, isHovering}) =>
			!isHovering && (displayName === 'Select' || displayName === 'MultiSelect')
				? 'calc(100% - 37px)'
				: 'auto'};
	}
	& input {
		border: none !important;
		&:focus,
		&:hover {
			outline: none;
			box-shadow: none;
		}
	}
	input::placeholder {
		color: transparent;
	}
	& label {
		pointer-events: ${({isHovering}) => !isHovering && 'none'};
		color: #868686;
		position: relative;
		z-index: 3;
		top: ${({displayName}) => (displayName === 'CheckBox' ? `0` : `2.5rem`)};
		font-weight: ${({isHovering}) => (isHovering ? `bold` : `normal`)};
		transform: ${({isHovering}) =>
			isHovering ? `translateY(-30px)` : `translateY(0)`};
		left: 0px;
		transition: all 0.2s ease-in-out;
		margin-top: 0px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		height: ${({displayName}) =>
			displayName === 'TextArea' ? `22px` : `auto`};
	}
	&:focus-within {
		& label {
			font-weight: bold;
			transform: translateY(-30px);
			width: 100%;
		}
	}
`;

const TitleSpan = styled.span`
	display: flex;
	flex-direction: column;
	min-width: 0;
	max-width: 100%;
	min-height: 0;
	> button {
		border: none;
	}
`;

const Field = ({
	label,
	name,
	error,
	children,
	flex,
	isDisabled,
	noBorder,
	normal,
	...rest
}) => {
	const [labelref, setLabelref] = useState();

	const isHovering = useMemo(() => {
		const value = children?.props?.value;
		const defaultSelectedOptions = children?.props?.defaultSelectedOptions;
		const defaultSelected = children?.props?.defaultSelected;
		const initialDate = children?.props?.initialDate;

		if (typeof value === 'number') return true;
		if (typeof value === 'boolean') return true;
		if (typeof initialDate === 'string' && initialDate?.length > 0) return true;
		if (defaultSelectedOptions?.length || defaultSelected?.length) return true;
		if (_.isEmpty(value)) return false;
		if (!value) return false;

		return true;
	}, [children]);
	const ref = React.useRef();

	React.useEffect(() => {
		if (
			ref.current &&
			ref.current?.firstElementChild?.firstElementChild?.nodeName === 'LABEL'
		) {
			let labelRef = ref.current?.firstElementChild?.firstElementChild;
			labelRef.title = labelRef.textContent;
			setLabelref(labelRef);
		}
	}, [ref, name]);

	const childHasValue = () => {
		const value = children?.props?.value;
		const defaultSelectedOptions = children?.props?.defaultSelectedOptions;
		const defaultSelected = children?.props?.defaultSelected;
		const initialDate = children?.props?.initialDate;
		if (children?.type?.displayName?.includes?.('CurrencyInput') && value)
			return `$ ${(+value ?? '').toLocaleString(undefined, {
				minimumFractionDigits: 2,
			})}`;
		if (typeof value === 'number') return value;
		if (typeof value === 'boolean') return '';
		if (typeof initialDate === 'string' && initialDate?.length > 0)
			return initialDate;
		if (defaultSelectedOptions?.length || defaultSelected?.length) return '';
		if (value && children?.type?.displayName === 'Select') return '';
		if (_.isEmpty(value)) return undefined;
		if (!value) return undefined;
		return value;
	};

	return (
		<Box ref={ref} direction='row' {...rest}>
			<StyledFormField
				isHovering={isHovering}
				isDisabled={isDisabled}
				flex={flex}
				name={name}
				label={label === '""' ? null : label}
				error={error}
				displayName={children?.type?.displayName}
				noBorder={noBorder}
				{...rest}>
				<TitleSpan title={childHasValue() ?? labelref?.textContent}>
					{children}
				</TitleSpan>
			</StyledFormField>
		</Box>
	);
};

export default Field;
