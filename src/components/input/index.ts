import { Input as InternalInput, InputProps } from './input';
import Search from './search';

export type { InputProps } from './input';

type CompoundedComponent = React.ForwardRefExoticComponent<InputProps> & {
  Search: typeof Search;
};

const Input = InternalInput as CompoundedComponent;

Input.Search = Search;

export default Input;
