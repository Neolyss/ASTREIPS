import {Slider} from "@mui/material";

export default function Coefficients() {
    return (
        <div className="App">
            <div id="sidebar">
                <h1>Coefficients</h1>
                <nav>
                    <ul>
                        <li>
                            <a href={`/`}>Main</a>
                        </li>
                        <li>
                            <a href={`/coefficients`}>Change coefficients</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail"></div>
            <Slider
                aria-label="Small steps"
                defaultValue={0}
                step={1}
                marks
                min={-5}
                max={5}
                valueLabelDisplay="auto"
            />
        </div>
    )
}