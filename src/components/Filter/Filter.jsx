import { DivWrapper, InputFilter } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setFilter } from 'redux/contactsSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <DivWrapper>
      <label>
        Fined contacts by name
        <InputFilter type="text" value={filter} onChange={handleChange} />
      </label>
    </DivWrapper>
  );
};
