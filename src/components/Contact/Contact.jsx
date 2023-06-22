import { P, ButtonDelete, Div } from './Contact.styled';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';

export const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(id));

  return (
    <Div>
      <P>
        {name}: {number}
      </P>
      <ButtonDelete aria-label="Delete" onClick={handleDelete}>
        Delete
      </ButtonDelete>
    </Div>
  );
};
