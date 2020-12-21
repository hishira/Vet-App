import { useState, useEffect } from "react";
import UserView from "../../index";
import styles from "../../../../styles/UserPets.module.css";
import { getPetBySpecies, deletePet } from "../../../../utils/api/petApi";
import { getUserFromCookie } from "../../../../utils/auth/userCookies";
import Loader from "../../../../components/loader";
import YesOrNoDialog from "../../../../components/yesornodialoguser";
import EditPetModal from "../../../../components/EditPetModal";
export default function AllPets(props) {
  const [petType, selectPetType] = useState("Dog");
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState("false");
  const [reload, setReload] = useState(false);
  const [petToDelete, setPetDoDelete] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [petToEdit, setPetToEdit] = useState({});
  const [petEditDialogOpen, setEditDialogOpen] = useState(false);
  
  const getPetsBySpecies = async (objectToSend,userToken) =>{
    let pets = await getPetBySpecies(objectToSend, userToken).then((response) => {
      if (response.status === 200) return response.json();
      return false;
    });
    if (pets === false) throw new Error("error");
    return pets
  }
  useEffect(() => {
    const fetchPetData = async () => {
      let obj = { species: petType };
      try {
        const token = getUserFromCookie()["token"];
        let petsbyspecies = await getPetsBySpecies(obj,token);
        setLoading("yes");
        setPets(petsbyspecies);
        setLoading("end");
      } catch (e) {
        setLoading("error");
      }
    };
    if (petType !== "") fetchPetData();
  }, [petType, reload]);
  const beforePetDelete = (pet) => {
    setPetDoDelete(pet);
    setDeleteDialogOpen(!deleteDialogOpen);
  };
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(!deleteDialogOpen);
  };
  const reloadhandle = () => {
    setReload(!reload);
  };
  const deletepetbyid = async (petid, usertoken) => {
    let objecttosend = {
      petID: petid,
    };
    let deletedPet = await deletePet(objecttosend, usertoken).then((response) => {
      if (response.status === 200) return true;
      return false;
    });
    if (deletedPet === false) throw new Error("Error");
  };
  const deletePetHandle = async ({ _id }) => {
    
    const token = getUserFromCookie()["token"];
    let petdeleted = deletepetbyid(_id, token);
    if (petdeleted) {
      setReload(!reload);
    }
  };
  const editPetHandle = (pet) => {
    setPetToEdit(pet);
    setEditDialogOpen(!petEditDialogOpen);
  };
  const closeEditDialogHandle = () => {
    setEditDialogOpen(!petEditDialogOpen);
  };
  return (
    <UserView userdata={props.userdata}>
      <div className={styles.maincomponent}>
        <YesOrNoDialog
          handleChange={closeDeleteDialog}
          newuser={petToDelete}
          open={deleteDialogOpen}
          message="Are you sure to delete pet"
          yeshandle={deletePetHandle}
        />
        <EditPetModal
          open={petEditDialogOpen}
          pet={petToEdit}
          reloadhandle={reloadhandle}
          closehandle={closeEditDialogHandle}
        />
        <label className={styles.label}>
          <div>Select pet:</div>
          <select
            className={styles["label__petselect"]}
            value={petType}
            onChange={(e) => selectPetType(e.target.value)}
          >
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Parrot">Parrot</option>
            <option value="Hamster">Hamster</option>
            <option value="Guinea Pig">Guinea Pig</option>
          </select>
        </label>
        {loading === "yes" ? (
          <Loader />
        ) : loading === "error" ? (
          <div>Error</div>
        ) : loading === "end" ? (
          <div className={styles.pets}>
            {pets.map((pet) => (
              <div key={pet._id} className={styles.petcomponent}>
                <div className={styles["petcomponent__petinfo"]}>
                  <div>Name: {pet.name}</div>
                  <div>Age: {pet.age}</div>
                </div>
                <div className={styles.petbuttons}>
                  <button
                    className={styles["petbuttons__deletebutton"]}
                    onClick={() => beforePetDelete(pet)}
                  >
                    Delete
                  </button>
                  <button
                    className={styles["petbuttons__editbutton"]}
                    onClick={() => editPetHandle(pet)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div />
        )}
      </div>
    </UserView>
  );
}
