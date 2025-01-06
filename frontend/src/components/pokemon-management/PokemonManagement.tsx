import './Pokemon_m.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { Pokemon } from '../../interfaces/pokemon';
import { authContext } from '../../App';

function Pokemon_m() {
  const auth = useContext(authContext)

  const [pokemonList, setPokemonList] = useState<Pokemon[] | null>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<Pokemon>({ pokemonId:0, name: '', type1: '', type2: '', cost: 0, imgUrl: '' });
  const [isEditing, setIsEditing] = useState<boolean>(false);

 

  // Fetch the Pokemon list
  const getPokemonList = () => {
    axios
      .get('http://localhost:8080/pokemons')
      .then((response) => {
        setPokemonList(response.data);
      })
      .catch((err) => {
        console.log('Cannot get Pokemon List due to ' + err.message);
      });
  };

  // Delete a Pokemon
  const handlePokemonDelete = (event: SyntheticEvent<HTMLButtonElement>) => {
    const pokemonId = event.currentTarget.getAttribute('data-id');
    axios
      .delete(`http://localhost:8080/pokemons/id/${pokemonId}`)
      .then((response) => {
        if (response.status === 200) {
          setPokemonList((prevList) => prevList?.filter((p) => p.pokemonId !== Number(pokemonId)) || null);
        } else if (response.status === 404) {
          alert('Cannot find the Pokemon in the database.');
        } else {
          alert('Unexpected error while deleting the Pokemon.');
        }
      })
      .catch((err) => {
        alert('Unexpected error while deleting the Pokemon: ' + err.message);
      });
  };

  // Open Add modal
  const handleAdd = () => {
    setFormData({ pokemonId:0, name: '', type1: '', type2: '', cost: 0, imgUrl: '' });
    setIsEditing(false);
    setShowModal(true);
  };

  // Open Edit modal
  const handleEdit = (event: SyntheticEvent<HTMLButtonElement>) => {
    const pokemonId = event.currentTarget.getAttribute('data-id');
    const pokemonToEdit = pokemonList?.find((p) => p.pokemonId === Number(pokemonId));

    if (pokemonToEdit) {
      setFormData(pokemonToEdit);
      setIsEditing(true);
      setShowModal(true);
    }
  };

  // Handle form input changes
  const handleInputChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormData({ ...formData, [name]: value });
  };

  // Submit the form (Add or Edit)
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (isEditing) {
      console.log(formData)
      axios
        .put(`http://localhost:8080/pokemons`, formData)
        .then(() => {
          getPokemonList();
          setShowModal(false);
        })
        .catch((err) => {
          alert('Error while updating Pokemon: ' + err.message);
        });
    } else {
      axios
        .post('http://localhost:8080/pokemons', formData)
        .then(() => {
          getPokemonList();
          setShowModal(false);
        })
        .catch((err) => {
          alert('Error while adding Pokemon: ' + err.message);
        });
    }
  };

  useEffect(() => {
    getPokemonList();
  }, []);

  return (
    <div className="listContainer">
      {auth?.role === "ADMIN" && <div id="pokemonList" className="list">
        <h3>Pokemon Management</h3>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Type1</th>
              <th scope="col">Type2</th>
              <th scope="col">Cost</th>
              <th scope="col">Image</th>
              <th scope="col">Add</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>

          <tbody>
            {pokemonList?.map((pokemon) => (
              <tr key={pokemon.pokemonId}>
                <th scope="row">{pokemon.pokemonId}</th>
                <td>{pokemon.name}</td>
                <td>{pokemon.type1}</td>
                <td>{pokemon.type2}</td>
                <td>{pokemon.cost}</td>
                <td>
                  <img src={pokemon.imgUrl} alt={pokemon.name} width="50" />
                </td>
                <td>
                  <button className="btn btn-success" onClick={handleAdd}>
                    Add
                  </button>
                </td>
                <td>
                  <button className="btn btn-warning" data-id={pokemon.pokemonId} onClick={handleEdit}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger" data-id={pokemon.pokemonId} onClick={handlePokemonDelete}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
      

      {/* Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditing ? 'Edit Pokemon' : 'Add Pokemon'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <label>pokemonId</label>
                  <input type="number" name="pokemonId" placeholder="pokemonId" value={formData.pokemonId || ''} onChange={handleInputChange} className="form-control mb-2" required />
                  <label>Name</label>
                  <input type="text" name="name" placeholder="Name" value={formData.name || ''} onChange={handleInputChange} className="form-control mb-2" required />
                  <label>Type1</label>
                  <input type="text" name="type1" placeholder="Type1" value={formData.type1 || ''} onChange={handleInputChange} className="form-control mb-2" required />
                  <label>Type2</label>
                  <input type="text" name="type2" placeholder="Type2" value={formData.type2 || ''} onChange={handleInputChange} className="form-control mb-2" />
                  <label>Cost</label>
                  <input type="number" name="cost" placeholder="Cost" value={formData.cost || ''} onChange={handleInputChange} className="form-control mb-2" required />
                  <label>Image URL</label>
                  <input type="text" name="imgUrl" placeholder="Image URL" value={formData.imgUrl || ''} onChange={handleInputChange} className="form-control mb-2" />
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    {isEditing ? 'Update' : 'Add'}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pokemon_m;

