import AppMenu from "../Modules/menu";
import {useEffect, useState, Fragment, useContext} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase/firebase";
import {CoeffContext} from "../context/coeffContexts";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

export default function HistoriesPage() {
    const [histories, setHistories] = useState([])
    const { _coefficients, setCoefficients } = useContext(CoeffContext);
    const navigate = useNavigate()

    const fetchPost = async () => {
        const querySnapshot = await getDocs(collection(db, "histories"))
        const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }))
        setHistories(newData);
    }

    const loadHistoryCoeffs = (history) => {
        setCoefficients(history.coeffs)
        navigate("/")
    }

    useEffect(() => {
        // fetch
        fetchPost()
    }, [])

    return (
        <div>
            {histories?.map((history) => (
                <Button key={history.id} onClick={() => loadHistoryCoeffs(history)}  variant="outlined" >
                    <h2>{history.date.toDate().toLocaleDateString("fr-FR")} : {history.date.toDate().toLocaleTimeString("fr-FR")}</h2>
                </Button>
            ))}
        </div>
    )
}