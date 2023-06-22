import { P, ButtonDelete, Div } from './Contact.styled';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';
import PropTypes from 'prop-types';

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


Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};