import { Contact } from 'components/Contact/Contact';
import { Li, Ul } from './ContactList.slyled';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectFilteeredContacts,
  selectIsLoading,
} from 'redux/contactsSlice';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';
import { Loader } from 'components/Loader/Loader';

export const ContactList = () => {
  const filtredContacts = useSelector(selectFilteeredContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {error && <div>{error}</div>}
      {isLoading && <Loader />}
      <Ul>
        {filtredContacts.map(contact => (
          <Li key={contact.id}>
            <Contact
              id={contact.id}
              name={contact.name}
              number={contact.number}
            />
          </Li>
        ))}
      </Ul>
    </>
  );
};
