import './RevealHalfs.css'

function RevealHalfs({imageLeft, innerLeft, imageRight, innerRight}) {
    function reset() {
        document.getElementById('RevealImageLeft').style.display = 'block';
        document.getElementById('RevealImageRight').style.display = 'block';
        document.getElementById('RevealDivLeft').style.display = 'none';
        document.getElementById('RevealDivRight').style.display = 'none';
    }

    function revealLeft() {
        reset()
        document.getElementById('RevealImageLeft').style.display = 'none';
        document.getElementById('RevealDivLeft').style.display = 'block';
    }

    function revealRight() {
        reset()
        document.getElementById('RevealImageRight').style.display = 'none';
        document.getElementById('RevealDivRight').style.display = 'block';
    }

    return (
        <div>
            <div className='Half'>
                <img
                    id='RevealImageLeft'
                    className='RevealImage'
                    src={imageLeft} alt='Reveal Half Cover'
                    onClick={revealLeft}/>
                <div id='RevealDivLeft' className='Inner'>
                    {innerLeft}
                </div>
            </div>
            <div className='Half RightHalf'>
                <img id='RevealImageRight'
                     className='RevealImage'
                     src={imageRight}
                     alt='Reveal Half Cover'
                     onClick={revealRight}/>
                <div id='RevealDivRight' className='Inner'>
                    {innerRight}
                </div>
            </div>
        </div>
    )
}

export default RevealHalfs