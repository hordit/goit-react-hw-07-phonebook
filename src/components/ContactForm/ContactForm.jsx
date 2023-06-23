import { Formik } from 'formik';
import {
  ButtonAdd,
  FormStyled,
  InputStyled,
  Label,
} from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { addContact, fetchContacts } from 'redux/operations';
import { capitalizedName } from 'Utils/capitalizedName';
import { useEffect } from 'react';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleSubmit = (values, { resetForm }) => {
    const contact = {
      name: values.name,
      number: values.number,
    };

    const isExistName = contacts.find(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isExistName) {
      alert(`${capitalizedName(contact.name)} is already in contacts`);
      return resetForm();
    } else {
      dispatch(
        addContact({
          name: capitalizedName(contact.name),
          number: contact.number,
        })
      );
      resetForm();
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      onSubmit={handleSubmit}
    >
      <FormStyled>
        <Label>
          Name
          <InputStyled
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>
        <Label>
          Number
          <InputStyled
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>
        <div>
          <ButtonAdd type="submit">Add contact</ButtonAdd>
        </div>
      </FormStyled>
    </Formik>
  );
};
