import { Contact } from 'components/Contact/Contact';
import { Li, Ul } from './ContactList.slyled';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectError, selectIsLoading} from 'redux/contactsSlice';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';
import { Loader } from 'components/Loader/Loader';

export const ContactList = () => {
  const visibleContacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
dispatch(fetchContacts);
  }, [dispatch])

  return (
   <>
   {isLoading && <Loader />}
   {/* {!visibleContacts?.length && !error && !isLoading && (
    <p>No contacts found</p>
   )} */}
  {error && <div>{error}</div>}
    <Ul>
      {visibleContacts.map(contact => (
        <Li key={contact.id}>
          <Contact contact={contact} />
        </Li>
      ))}
    </Ul>
   </>
  );
};
