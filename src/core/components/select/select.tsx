import ReactDropdownSelect, { SelectProps as ReactDropdownSelectProps } from 'react-dropdown-select';
import 'react-dropdown-select';

type SelectProps = ReactDropdownSelectProps<{ id: number; label: string; value: string }>;

export const Select = (props: SelectProps) => {
  return <ReactDropdownSelect options={props.options} values={props.values} onChange={(value) => value} />;
};
