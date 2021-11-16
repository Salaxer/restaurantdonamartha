import React, {useEffect} from "react";
import '../assets/styles/LoaderCircle.css'

const LoaderCircle = (props) =>{
    
    useEffect(()=>{
        document.getElementById('circle').style.stroke = `#${props.color}`;
    });

    return (
        <div className="containerLoad" id="preloader">
            <mat-spinner role="progressbar" mode="indeterminate" tabindex="-1" className="mat-spinner mat-progress-spinner div mat-primary mat-progress-spinner-indeterminate-animation" style={{width: '56px', height: '56px'}}>
                <svg preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true" viewBox="0 0 51.6 51.6" style={{width: '56px', height: '56px', animation: 'girar 2000ms linear infinite'}}>
                    <circle id="circle" cx="50%" cy="50%" r="23" className="ng-star-inserted circle-rotate"></circle>
                </svg>
            </mat-spinner>
        </div>
    )
}

export default LoaderCircle;