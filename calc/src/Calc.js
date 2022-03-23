import React, { useEffect } from 'react';
import { useState } from 'react';


export default function Calc() {
    const [height, setHeight] = useState(500)
    const [width, setWidth] = useState(500)
    const [tempH, setTempH] = useState(0)
    const [tempW, setTempW] = useState(0)
    const [mash, setMash] = useState(1)
    const [tempX, setTempX] = useState(0)
    const [tempY, setTempY] = useState(0)
    const [per, setPer] = useState(0)
    const [kper, setKPer] = useState(0)
    const [count, setCount] = useState(0)
    const [wrW, setWrW] = useState(0)
    const [wrH, setWrH] = useState(0)

    useEffect(function calculate() {
        setKPer(wrW * wrH * mash * mash)
        setPer(height * width - kper)
        setCount(per / (667 * 500))


    })


    function Answer() {
        if (width) {

            return (
                <p id='answer' className='answer'>Для стены площадью {width * height} и окном {kper ? kper : 0} необходимо {Math.ceil(count)} плит весом {Math.ceil(count) * 36} кг</p>
            )
        }
        else return 0

    }


    function insides(_x, _y) {

        if ((tempX == 0) && (tempY == 0)) {
            setTempX(_x)
            setTempY(_y)
        }
        else {
            let _w = Math.abs(_x - tempX)
            let _h = Math.abs(_y - tempY)
            setWrW(_w)
            setWrH(_h)
            document.getElementById('_ins').style.width = _w
            document.getElementById('_ins').style.height = _h
            if (_x > tempX) {
                document.getElementById('_ins').style.x = tempX - 20
            }
            else {
                document.getElementById('_ins').style.x = _x - 20
            }

            if (_y > tempY) {
                document.getElementById('_ins').style.y = tempY - 265
            }
            else {
                document.getElementById('_ins').style.y = _y - 265
            }
            setTempX(0)
            setTempY(0)
        }
    }



    useEffect(() => {
        console.log(width, height)
        let otn = width / height
        if (otn < 1) {
            otn = 1 / otn
            console.log('H > W')
            console.log(width, height, otn)
            if (width > 200) {
                setMash(width / 200)
                setTempW(200)
                let wr = 200 * otn
                setTempH(wr)
            }
            else {
                setTempH(height)
                setTempW(width)
            }
        }
        else if (otn > 1) {
            console.log('W > H')
            console.log(width, height, otn)
            if (height > 500) {
                setMash(height / 200)
                setTempH(200)
                let wr = 200 * otn
                setTempW(wr)
            }
            else {
                setTempH(height)
                setTempW(width)
            }
        }
        else {
            if (width > 500) {
                setMash(width / 500)
                setTempW(500)
                setTempH(500)
            }

            else {
                setTempH(height)
                setTempW(width)
            }
        }

        document.getElementById('_ris').style.width = tempW
        document.getElementById('_ris').style.height = tempH
        document.getElementById('_svgris').style.width = tempW
        document.getElementById('_svgris').style.height = tempH


    })



    return (
        <>
            <div className='inputFields'>
                <h3 className='big'>Введите ширину и высоту стены:</h3>
                <input type='number' id='_width' className='input' onChange={e => setWidth(e.target.value)} placeholder='width' required />
                <input type='number' id='_height' className='input' onChange={e => setHeight(e.target.value)} placeholder='height' required />

            </div>
            <div className='cont' id='cont'>
                <h3>Укажите расположение окна/проема на стене:</h3>
                <div className='mainRis'>
                    <svg id='_svgris' onMouseDown={e => insides(e.pageX, e.pageY)}>
                        <rect id='_ris' className='ris'></rect>
                        <text x={tempW / 2 - tempW / 4} y={tempH - 20}>width = {width}</text>
                        <text x={-tempH / 2 - tempH / 4} y={20} transform="rotate(270)" >height = {height}</text>
                        <rect id='_ins' className='iris'></rect>
                    </svg>
                </div>

                <Answer />

            </div>
        </>
    )

}