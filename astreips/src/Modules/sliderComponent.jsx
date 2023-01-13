import {Accordion, AccordionDetails, AccordionSummary, Slider, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Fragment, useState, useEffect} from "react";

export default function SliderComponent({question, coefficients, setCoefficients}) {
    const [expanded, setExpanded] = useState(false);
    const [, setRefresh] = useState(false);

    const toggleAcordion = (event) => {
        if(event.target.id === `expandIcon-${question.id}` ) {
            setExpanded((prev) => !prev);
        }
    };
    const handleChangeQuest = (value) => {
        question.coeff = value
        setCoefficients(coefficients)
        setRefresh(prev => !prev)
    }

    const handlerChangeRes = (resId, value) => {
        question.reponses[resId].coeff = value
        setCoefficients(coefficients)
        setRefresh(prev => !prev)
    }

    return (
        <Accordion expanded={expanded} onChange={toggleAcordion}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon
                id={`expandIcon-${question.id}`}
            />}
        >
            <Typography sx={{ width: '15%', flexShrink: 0 }}>
                {String(question.id)}
            </Typography>
                    <Slider
                        defaultValue={question.coeff}
                        onChange={(_e, value) => handleChangeQuest(value)}
                        sx = {{ width: '80%'}}
                        value={question.coeff}
                        label={String(question.id)}
                        step={0.1}
                        marks
                        min={0}
                        max={1}
                        valueLabelDisplay="auto"
                    />
        </AccordionSummary>
        <AccordionDetails>
            {
                question.reponses.map((reponse, id) => (
                    <Fragment key={id}>
                        <Typography>{reponse.texte}</Typography>
                            <Slider
                                defaultValue={reponse.coeff}
                                onChange={(_e, value) => handlerChangeRes(id, value)}
                                sx = {{ width: '80%'}}
                                aria-label={reponse.texte}
                                value={reponse.coeff}
                                label={reponse.texte}
                                step={1}
                                marks
                                min={-4}
                                max={4}
                                valueLabelDisplay="auto"
                            />
                    </Fragment>
                ))
            }
        </AccordionDetails>
    </Accordion>
    )
}