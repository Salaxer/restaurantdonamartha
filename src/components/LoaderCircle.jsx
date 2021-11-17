import React, {useEffect} from "react";
import '../assets/styles/LoaderCircle.css'

const LoaderCircle = ({color, position, size, background}) =>{
    
    useEffect(()=>{
        color ? document.getElementById('circle').style.stroke = `${color}` : null ;
        position ? document.getElementById('preloader').style.position = `${position}` : null ;
        size ? document.getElementById('containCircle').style.width = `${size}px` : null ;
        size ? document.getElementById('matSpinner').style.width = `${size}px` : null ;
        size ? document.getElementById('containCircle').style.height = `${size}px` : null ;
        size ? document.getElementById('matSpinner').style.height = `${size}px` : null ;
        background ? document.getElementById('preloader').style.background = `${background}` : null ;
    });

    return (
        <div className="containerLoad" id="preloader">
            <mat-spinner id="matSpinner" role="progressbar" mode="indeterminate" tabindex="-1" className="mat-spinner mat-progress-spinner div mat-primary mat-progress-spinner-indeterminate-animation" style={{width: '56px', height: '56px'}}>
                <svg id="containCircle" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true" viewBox="0 0 51.6 51.6" style={{width: '56px', height: '56px', animation: 'girar 2000ms linear infinite'}}>
                    <circle id="circle" cx="50%" cy="50%" r="23" className="ng-star-inserted circle-rotate"></circle>
                </svg>
            </mat-spinner>
        </div>
    )
}

export default LoaderCircle;