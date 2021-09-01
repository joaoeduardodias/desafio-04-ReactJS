
import { Header } from '../../components/Header';
import api from '../../services/api';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { useState } from 'react';
import { useEffect } from 'react';
import { IFood } from '../../types/Food';



export function Dashboard() {

  const [foods, setFoods] = useState<IFood[]>([])
  const [editingFood, setEditingFood] = useState<IFood>({} as IFood)
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)


  useEffect(() => {
    async function Foods() {
      const { data } = await api.get<IFood[]>('/foods');
      setFoods(data)
    }
    Foods()
  }, [])

type AddFood = Omit<IFood, 'id'>


 const handleAddFood = async (food: AddFood) => {

    try {
      const {data} = await api.post('/foods', {
        ...food,
        available: true,
      });
      setFoods([...foods, data])
      
    } catch (err) {
      console.log(err);
    }
  }

 const  handleUpdateFood = async (food: IFood) => {
  

    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );
      setFoods(foodsUpdated)

     
    } catch (err) {
      console.log(err);
    }
  }
 const handleDeleteFood = async(id: number) => {
 
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered)
  }

 const  toggleModal = () => {
    setModalOpen(!modalOpen)

  }

 const  toggleEditModal = () => {
    
  setEditModalOpen(!editModalOpen)

  }

 const  handleEditFood = (food: IFood) => {
   setEditingFood(food)
   setEditModalOpen(true)
    
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );

}

