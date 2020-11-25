import { useState, useEffect } from "react";
import UserView from "../../index";
import styles from "../../../../styles/UserPets.module.css";
import { getPetBySpecies,deletePet } from "../../../../utils/api/petApi";
import { getUserFromCookie } from "../../../../utils/auth/userCookies";
import Loader from "../../../../components/loader";
import YesOrNoDialog from '../../../../components/yesornodialoguser';
import EditPetModal from '../../../../components/EditPetModal';
export default function AllPets(props) {
  const [petType, selectPetType] = useState("Dog");
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState("false");
  const [reload,setReload] = useState(false);
  const [petToDelete,setPetDoDelete] = useState({});
  const [deleteDialogOpen,setDeleteDialogOpen] = useState(false);
  
  const [petToEdit,setPetToEdit] = useState({});
  const [petEditDialogOpen,setEditDialogOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      let obj = { species: petType };
      try {
        const token = getUserFromCookie()["token"];
        setLoading("yes");
        let data = await getPetBySpecies(obj, token).then((response) => {
          if (response.status === 200) return response.json();
          return false;
        });
        if (data === false) throw new Error("error");
        setPets(data);
        setLoading("end");
      } catch (e) {
        setLoading("error");
      }
    };
    if (petType !== "") fetchData();
  }, [petType,reload]);
  const beforePetDelete = (pet)=>{
    setPetDoDelete(pet);
    setDeleteDialogOpen(!deleteDialogOpen);
  }
  const closeDeleteDialog = ()=>{
    setDeleteDialogOpen(!deleteDialogOpen);
  }
  const deletePetHandle = async ({_id})=>{
    let obj = {
      petID: _id
    }
    console.log(obj);
    const token = getUserFromCookie()["token"]
    let data = await deletePet(obj,token).then(response=>{
      if(response.status === 200)
        return true;
      return false;
    })
    if(data){
      setReload(!reload);
    }
  }
  const editPetHandle = (pet)=>{
    setPetToEdit(pet);
    setEditDialogOpen(!petEditDialogOpen);
  }
  const closeEditDialogHandle = ()=>{
    setEditDialogOpen(!petEditDialogOpen);
  }
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
            closehandle={closeEditDialogHandle}
          />
        <label className={styles.label}>
          <div>Select pet:</div>
          <select
            className={styles.petselect}
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
          <div className={styles.maincomponent}>
            {pets.map((pet) => (
              <div key={pet._id} className={styles.petcomponent}>
                
                  <div className={styles.petinfo}>
                    <div>Name: {pet.name}</div>
                    <div>Age:  {pet.age}</div>
                  </div>
                  <div className={styles.petbuttons}>
                    <button className={styles.deletebutton} onClick={()=>beforePetDelete(pet)}>Delete</button>
                    <button className={styles.editbutton} onClick={()=>editPetHandle(pet)}>Edit</button>
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
