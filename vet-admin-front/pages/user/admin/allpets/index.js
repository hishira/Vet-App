import { useState, useEffect } from "react";
import UserView from "../../index";
import styles from "../../../../styles/UserPets.module.css";
import { getPetBySpecies } from "../../../../utils/api/petApi";
import { getUserFromCookie } from "../../../../utils/auth/userCookies";
import Loader from "../../../../components/loader";
export default function AllPets(props) {
  const [petType, selectPetType] = useState("Dog");
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState("false");
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
    if( petType!== "")
        fetchData();
  }, [petType]);
  return (
    <UserView userdata={props.userdata}>
      <div className={styles.maincomponent}>
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
        ) :loading==="end"?(
            <div className={styles.maincomponent}>
                {pets.map(pet=><div className={styles.petcomponent}>
                    <div>Name: {pet.name}</div>
                    <div>Age: {pet.age}</div>
                </div>)}
            </div>
        ): (
          <div />
        )}
      </div>
    </UserView>
  );
}
