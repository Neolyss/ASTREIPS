import {useContext} from 'react';
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import SliderComponent from "./sliderComponent";
import {Typography} from "@mui/material";
import { Timestamp } from "firebase/firestore";


import { collection, addDoc } from "firebase/firestore";
import {db} from '../firebase/firebase';
import {CoeffContext} from "../context/coeffContexts";

export default function Sliders() {
    const { coefficients, setCoefficients, reset } = useContext(CoeffContext);

    const handleSubmit = async () => {
        // convertir coefficients to json
        console.log(coefficients)

        try {
            const docRef = await addDoc(collection(db, "histories"), {
                date: Timestamp.fromDate(new Date()),
                coeffs: coefficients,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    };

    return <div style={{width: '80vw', marginTop: "5vh", marginBottom: "5vh"}}>
        <Button variant='outlined' onClick={reset}>
            REFRESH
        </Button>
        <Typography>Change Coefficients</Typography>
            {
                coefficients?.map((question) => <SliderComponent key={question.id} coefficients={coefficients} setCoefficients={setCoefficients}  question={question}/>)
            }
            <Button onClick={handleSubmit} variant="contained" endIcon={<SendIcon />} style={{marginTop: '3vh'}}>
                Send
            </Button>
    </div>
}