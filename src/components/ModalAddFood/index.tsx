import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { useRef } from 'react';
import { IFood } from '../../types/Food';

interface ModalAddFoodProps {

  handleAddFood: ({ available, description, image, name, price }: CreateFood) => void;
  setIsOpen: () => void;
  isOpen: boolean;
}
type CreateFood = Omit<IFood, "id">;

export function ModalAddFood({ handleAddFood, isOpen, setIsOpen }: ModalAddFoodProps) {
  const formRef = useRef(null)

  const handleSubmit = async ({ available, description, image, name, price }: CreateFood) => {
    handleAddFood({ available, description, image, name, price });
    setIsOpen();
  };
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );


}


